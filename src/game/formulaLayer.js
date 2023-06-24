export const formulaLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.formulas
    if (!data) return false

    switch (actionName) {
      case "applyFormula":
        data.basicRun.xValue[0] = data.basicRun.xValue[0] + parameters.amount || 1
        break;
      default:
        return false
    }
    return true
  }
}