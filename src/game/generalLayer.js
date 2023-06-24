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
      default:
        return false
    }
    return true
  }
}