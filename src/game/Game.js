import { alphaLayer } from "./alphaLayer";
import { destinyLayer } from "./destinyLayer";
import { formulaLayer } from "./formulaLayer";
import { newSave } from "./saveTemplates";
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
    const fl = formulaLayer.perform(this, actionName, parameters)
    const al = alphaLayer.perform(this, actionName, parameters)
    const wl= worldLayer.perform(this, actionName, parameters)
    const dl= destinyLayer.perform(this, actionName, parameters)
    if (!fl && !al && !wl && !dl)
      console.error("Action " + actionName + " not available.")
  }
}