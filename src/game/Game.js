import { notify } from "../utilities/notifier";
import { alphaLayer } from "./alphaLayer";
import { destinyLayer } from "./destinyLayer";
import { formulaLayer } from "./formulaLayer";
import { generalLayer } from "./generalLayer";
import { newDerivedContext, newSave, newSessionContext } from "./saveTemplates";
import { voidLayer } from "./voidLayer";
import { worldLayer } from "./worldLayer";

export class Game {
  constructor(save) {
      this.save = save || newSave()
      this.session = newSessionContext()
      this.derived = newDerivedContext()
  }

  //PUBLIC
  //validates if an action is allowed without performing it
  validate(actionName, parameters={}) {
    return {visible: true, enabled: true, valid: true}
  }

  //REALTIME-PLAY
  //Automatically choses Idle / Offline Progress based on wait time and banked time
  managedWait() {
    const deltaMilliSeconds = Math.max(Date.now() - this.session.lastTick, 0)
    if (deltaMilliSeconds + this.session.timebank < 100) {
      return null
    }

    this.session.lastTick = Date.now()
    this.session.timebank += deltaMilliSeconds

    if (this.session.prepareHold && Date.now() - this.session.prepareHold.prepareTime > 500) {
      console.log("Hold activate")
      this.setHoldInTick(this.session.prepareHold.actionName, this.session.prepareHold.parameters)//Activate Hold Action
      this.session.prepareHold = null
      this.session.timebank -= 100
      return this
    }

    if (this.session.timebank < 150) { //No lag
      this.singleTick(100)
      this.session.timebank -= 100
    } else if (this.session.timebank < 60000) { //Some lag
      this.singleTick(this.session.timebank)
      this.session.timebank = 0
    } else { //Inactive/Offline
      for (let i = 0; i < 12; i++) { //Processed in multiple chunks
        this.offlineProgress(Math.floor(this.session.timebank/12))
      }
      this.session.timebank = 0
    }
    return this
  }

  //REALTIME-PLAY
  //Start of Hold Action
  managedHold(actionName, parameters) {
    console.log("preparing")
    notify.warning("Prepare")
    this.session.prepareHold = {
      actionName,
      parameters,
      prepareTime: Date.now(),
    }
    return this
  }

  //REALTIME-PLAY
  //Release of Hold Action
  managedRelease() {
    if (this.session.holdAction) { //We always want to release an action that has been set
      this.releaseHoldInTick()
      this.session.prepareHold = null
      this.session.timebank -= 100
      return this
    } else if (this.session.prepareHold) { //cancelling preparation is free
      this.session.prepareHold = null
      return this
    }
    else {
      return null
    }
  }

  //REALTIME-PLAY
  //ManualActions cost 100 milliseconds
  managedPerform(actionName, parameters) {
    const deltaMilliSeconds = Math.max(Date.now() - this.session.lastTick, 0)
    if (deltaMilliSeconds + this.session.timebank < -1000) {
      console.error("Time debt of " + this.session.timebank)
      return null
    }
    if (deltaMilliSeconds + this.session.timebank < 0) {
      console.log("Too fast.")
      return null
    }

    this.session.timebank += deltaMilliSeconds

    //Manual-Action auto-cancels holding
    this.session.prepareHold = null
    if (this.session.holdAction) {
      this.releaseHoldInTick()
      this.session.timebank -= 100
    }

    this.performInTick(actionName, parameters)
    this.session.timebank -= 100
    return this
  }

  //AUTOMATED PLAY
  //Performs action within a single tick
  performInTick(actionName, parameters) {
    this.perform(actionName, parameters)
    this.singleTick(100)
  }

  //AUTOMATED PLAY
  //Registers an action as hold action, which will be performed every tick
  setHoldInTick(actionName, parameters) {
    this.session.holdAction = {actionName, parameters}
    this.singleTick(100)
  }

  //AUTOMATED PLAY
  //Cancels a registered hold action
  releaseHoldInTick() {
    this.session.holdAction = null
    this.singleTick(100)
  }

  //AUTOMATED PLAY
  //Performs a single tick of the game loop
  singleTick(deltaMilliSeconds=100) {
    if (deltaMilliSeconds >= 100)
      this.perform("singleTick", {deltaMilliSeconds})
  }

  //AUTOMATED PLAY
  //Performs offline calculations for longer idle times
  offlineProgress(deltaMilliSeconds) {
    if (deltaMilliSeconds >= 3000)
      this.perform("offlineProgress", {deltaMilliSeconds})
  }

  //PRIVATE
  //Performs all sorts of actions
  perform(actionName, parameters={}) {
    //Delegate work to respective layers
    const gl = generalLayer.perform(this, actionName, parameters)
    const fl = formulaLayer.perform(this, actionName, parameters)
    const al = alphaLayer.perform(this, actionName, parameters)
    const wl = worldLayer.perform(this, actionName, parameters)
    const vl = voidLayer.perform(this, actionName, parameters)
    const dl = destinyLayer.perform(this, actionName, parameters)
    const wasPerformed = gl || fl || al || wl || vl || dl
    if (!wasPerformed)
      console.error("Action " + actionName + " not available.")
    return wasPerformed
  }
}