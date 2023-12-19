export const alphaLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.alpha
    if (!data) return false

    switch (actionName) {
      case "getAlphaToken":
        data.tokens++
        break;
      case "changeAlphaSetting":
        data[parameters.settingName] = parameters.newStatus
        break
      default:
        return false
    }
    return true
  },

  validate: (game, actionName, parameters={})=>{
    const invisible = {valid: false, visible: false, enabled: false}
    const disabled = {valid: false, visible: true, enabled: false}
    const valid = {valid: true, visible: true, enabled: true}
    
    switch (actionName) {
      case "getAlphaToken":
        return valid
      case "changeAlphaSetting":
        const upgrades = game.save.maingame.alpha.alphaUpgrades
        if (parameters.settingName === "autoResetterX" && !upgrades.XRES) return invisible
        if (parameters.settingName === "autoRemembererActive" && !upgrades.AREM) return invisible
        if (parameters.settingName === "autoResetterA" && !upgrades.ARES) return invisible
        if (parameters.settingName === "alphaThreshold" && !upgrades.ARES) return invisible

        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      default:
        return undefined
    }  
  }
}