import { alphaLayer } from "./alphaLayer";
import { destinyLayer } from "./destinyLayer";
import { formulaLayer } from "./formulaLayer";
import { generalLayer } from "./generalLayer";
import { newSave } from "./saveTemplates";
import { voidLayer } from "./voidLayer";
import { worldLayer } from "./worldLayer";

export class Game {
  constructor(save) {
      this.save = save || newSave()
  }

  //validates if an action is allowed without performing it
  validate(actionName, parameters={}) {
    return {isValid: true}
  }

  //Main entry point to perform all sorts of actions
  perform(actionName, parameters={}) {
    //Delegate work to respective layers
    const gl = generalLayer.perform(this, actionName, parameters)
    const fl = formulaLayer.perform(this, actionName, parameters)
    const al = alphaLayer.perform(this, actionName, parameters)
    const wl = worldLayer.perform(this, actionName, parameters)
    const vl = voidLayer.perform(this, actionName, parameters)
    const dl = destinyLayer.perform(this, actionName, parameters)
    const wasPerformed = gl || fl || al || wl || vl || dl
    //if (!fl && !al && !wl && !dl)
    //  console.error("Action " + actionName + " not available.")
    console.log("Performed: " + wasPerformed)
  }
}