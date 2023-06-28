import formulaDictionary from "../content/FormulaDictionary"
import stageDictionary, { stageList } from "../content/StageDictionary"
import { calc } from "./FormulaNumber"
import { evaluateFormula } from "./formulaBuilder"
import { newBasicRun, newFormulaSave, newStageRun } from "./saveTemplates"

export const formulaLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.formulas
    const basicRun = data.basicRun
    const stageRun = data.stageRun
    //debugger
    if (!data) return false

    switch (actionName) {
      case "applyFormula": //slot
        const formula = formulaDictionary[stageRun.myFormulas[parameters.slot]]
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
        const result = evaluateFormula(formula.content, valueMap)
        
        //Update Target Value
        if (formula.isIncrementer) {
          basicRun.xValues[formula.targetLevel] = calc("add", basicRun.xValues[formula.targetLevel], result)
        }
        else {
          basicRun.xValues[formula.targetLevel] = result.simplify()
        }

        //Pay Cost
        if (formula.targetLevel > 0) {
          basicRun.xValues[0] = calc("sub", basicRun.xValues[0], formula.applyCost)
        }
        break;
      case "unlockFormula": { //index
        const formula = stageDictionary[stageList[stageRun.currentStage]].formulas[parameters.index]
        basicRun.xValues[0] = calc("sub", basicRun.xValues[0], formula.unlock)
        stageRun.formulaUnlocked[formula.id] = true
        stageRun.formulaUnlockCount++
        break;
      }
      case "getFormula": { //index
        const formula = stageDictionary[stageList[stageRun.currentStage]].formulas[parameters.index]
        stageRun.formulaBought[formula.id] = true
        stageRun.myFormulas.push(formula.id)
        break;
      }
      case "unequipFormula": { //slot
        const discarded = stageRun.myFormulas.splice(parameters.slot, 1)
        stageRun.formulaBought[discarded.id] = false
        break;
      }
      case "moveFormulaUp": { //slot
        const partner = stageRun.myFormulas[parameters.slot - 1]
        stageRun.myFormulas[parameters.slot - 1] = stageRun.myFormulas[parameters.slot]
        stageRun.myFormulas[parameters.slot] = partner
        break;
      }
      case "moveFormulaDown": { //slot
        const partner = stageRun.myFormulas[parameters.slot + 1]
        stageRun.myFormulas[parameters.slot + 1] = stageRun.myFormulas[parameters.slot]
        stageRun.myFormulas[parameters.slot] = partner
        break;
      }
      case "unequipAll": {
        stageRun.myFormulas = []
        stageRun.formulaBought = {}
        break;
      }
      case "basicReset": {
        data.basicRun = newBasicRun()
        data.stageRun.xResetCount++
        break;
      }
      case "xReset": {
        const nextStage = data.stageRun.currentStage + 1
        data.basicRun = newBasicRun()
        data.stageRun = newStageRun()
        data.stageRun.currentStage = nextStage
        break;
      }
      case "alphaReset": {
        game.save.maingame.formulas = newFormulaSave()
        game.save.maingame.alpha.tokens++
        break;
      }
      case "abortAlphaRun": {
        game.save.maingame.formulas = newFormulaSave()
        break;
      }
      case "completeSegment": {
        const nextStage = data.stageRun.currentStage + 1
        data.basicRun = newBasicRun()
        data.stageRun = newStageRun()
        data.stageRun.currentStage = nextStage
        break;
      }
      case "completeChallenge": {
        game.save.maingame.formulas = newFormulaSave()
        break;
      }
      case "exitChallenge": {
        game.save.maingame.formulas = newFormulaSave()
        break;
      }
      case "singleTick": {
        basicRun.xValues[1] += parameters.deltaMilliSeconds / 1000
        if (game.session.holdAction)
          game.perform(game.session.holdAction.actionName, game.session.holdAction.parameters)
        break;
      }
      case "offlineProgress": {
        basicRun.xValues[1] += parameters.deltaMilliSeconds / 1000
        break;
      }
      default:
        return false
    }
    return true
  }
}
