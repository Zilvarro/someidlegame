export const alphaLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.alpha
    if (!data) return false

    switch (actionName) {
      case "getAlphaToken":
        data.tokens++
        break;
      default:
        return false
    }
    return true
  }
}