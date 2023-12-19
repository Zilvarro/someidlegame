import { save } from "../utilities/saveload"
import { FILENAME } from "./constants"

const validateSetting = (game, settingName, newStatus)=>{
  const valid = {valid: true, visible: true, enabled: true}
  const invisible = {valid: false, visible: false, enabled: false}
  //const disabled = {valid: false, visible: true, enabled: false}
  switch (settingName) {
    case "blabla": {
      return invisible
    }
  
    default:
      return valid
  }
}

export const generalLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.general
    const settings = game.save.settings
    if (!data) return false

    switch (actionName) {
      case "selectTab":
        data.selectedTabKey = parameters.tabKey
        break;
      case "changeSetting":
        settings[parameters.settingName] = parameters.newStatus
        break;
      case "hardReset":
        game.hardReset()
        break;
      case "singleTick":
        if (game.session.holdAction)
          game.perform(game.session.holdAction.actionName, game.session.holdAction.parameters)
        if (data.mileStoneCount > 0 && Date.now() >= game.session.saveTimeStamp + 10000) {
          game.session.saveTimeStamp = Date.now()
          save(FILENAME, game.save)
        }
        break;
      case "offlineProgress":
        break;
      default:
        return false
    }
    return true
  },

  validate: (game, actionName, parameters={})=>{
    const data = game.save.general
    //const settings = game.save.settings
    //const invisible = {valid: false, visible: false, enabled: false}
    //const disabled = {valid: false, visible: true, enabled: false}
    const valid = {valid: true, visible: true, enabled: true}
    //const noop = {valid: false, visible: true, enabled: true}
    if (!data) return false

    switch (actionName) {
      case "selectTab":
        return valid
      case "changeSetting":
        return validateSetting(game, parameters.settingName, parameters.newStatus)
      case "hardReset":
        return valid
      case "singleTick": {
        return valid
      }
      case "offlineProgress": {
        return valid
      }
      default:
        return undefined
    }
  }
}