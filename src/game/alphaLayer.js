export const alphaLayer = (game, actionName, parameters={})=>{
  const data = game.save.maingame.alpha
  if (!data) return false

  switch (actionName) {
    case "applyFormula":
      this.data.xValue = this.data.xValue + parameters.amount || 1
      break;
    default:
      return false
  }
  return true
}