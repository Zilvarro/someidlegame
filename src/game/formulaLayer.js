import formulaDictionary from "../content/FormulaDictionary"
import stageDictionary, { stageList } from "../content/StageDictionary"
import { evaluateFormula } from "./formulaBuilder"

export const formulaLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.formulas
    const basicRun = data.basicRun
    const stageRun = data.stageRun
    //debugger
    if (!data) return false

    switch (actionName) {
      case "applyFormula":
        const formula = formulaDictionary[parameters.id]
        const valueMap = {
          "x":basicRun.xValues[0],
          "x'":basicRun.xValues[1],
          "x''":basicRun.xValues[2],
          "x'''":basicRun.xValues[3],
          "#U":stageRun.formulaUnlockCount,
          "#B":stageRun.xResetCount,
          "#F":stageRun.formulaApplyCount,
          "#E":stageRun.myFormulas.length,
        }
        const result = evaluateFormula(formula.content, valueMap).toFloat()
        
        if (formula.isIncrementer)
          basicRun.xValues[formula.targetLevel] += result
        else
          basicRun.xValues[formula.targetLevel] = result

        if (formula.targetLevel > 0)
          basicRun.xValues[formula.targetLevel] -= formula.applyCost
        break;
      case "unlockFormula":
        // debugger
        const sformula = stageDictionary[stageList[stageRun.currentStage]].formulas.find((formula)=>(formula.id===parameters.id))
        basicRun.xValues[0] -= sformula.unlock
        stageRun.formulaUnlocked[sformula.id] = true
        stageRun.formulaUnlockCount++
        break;
      case "getFormula":
        const gformula = stageDictionary[stageList[stageRun.currentStage]].formulas.find((formula)=>(formula.id===parameters.id))
        stageRun.formulaBought[gformula.id] = true
        stageRun.myFormulas.push(gformula.id)
        break;

      default:
        return false
    }
    return true
  }
}