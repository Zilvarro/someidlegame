import formulaDictionary from "../content/FormulaDictionary"
import stageDictionary, { stageList } from "../content/StageDictionary"
import { calc } from "./FormulaNumber"
import { evaluateFormula } from "./formulaBuilder"
import { newBasicRun, newFormulaSave, newStageRun } from "./saveTemplates"

const isLockedByChallenge = (game, formula)=>((game.derived.activeChallenges.SIMPLEONLY && formula.complex) || 
    (game.derived.activeChallenges.COMPLEX && !formula.complex && !formula.isBasic) ||
    (game.derived.activeChallenges.NEWONLY && formula.effectLevel !== game.save.maingame.formulas.stageRun.currentStage))

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
          "#B":stageRun.basicResetCount,
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

        //Mark as used
        basicRun.anyFormulaUsed = true
        basicRun.formulaUsed[formula.id] = true
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
        stageRun.formulaBought[discarded[0]] = false
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
        data.stageRun.basicResetCount++
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
      case "memorize": { //loadout
        break;
      }
      case "remember": { //loadout
        break;
      }
      case "toggleAuto": { //slot
        break;
      }
      case "toggleAutoAll": {
        break;
      }
      case "changeLoadout": {
        break;
      }
      case "singleTick": {
        applyProductionComplex(parameters.deltaMilliSeconds / 1000, basicRun.xValues)
        break;
      }
      case "offlineProgress": {
        applyProductionComplex(parameters.deltaMilliSeconds / 1000, basicRun.xValues)
        break;
      }
      default:
        return false
    }
    return true
  },
  validate: (game, actionName, parameters={})=>{
    const data = game.save.maingame.formulas
    const basicRun = data.basicRun
    const stageRun = data.stageRun
    const invisible = {valid: false, visible: false, enabled: false}
    const disabled = {valid: false, visible: true, enabled: false}
    const valid = {valid: true, visible: true, enabled: true}
    const noop = {valid: false, visible: true, enabled: true}
    //debugger
    if (!data) return false

    switch (actionName) {
      case "applyFormula": //slot
        if (parameters.slot >= stageRun.myFormulas.length) return invisible
        return {valid: true, visible: true, enabled: true}
      case "unlockFormula": { //index
        const formula = stageDictionary[stageList[stageRun.currentStage]].formulas[parameters.index]
        if (stageRun.formulaUnlocked[formula.id]) return invisible
        if (stageRun.formulaBought[formula.id]) return invisible //shown only in inventory
        if (isLockedByChallenge(game, formulaDictionary[formula.id])) return invisible //shown only in inventory, but disabled with text

        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        if (calc("lt", basicRun.xValues[0], formula.unlock)) return disabled
        return valid
      }
      case "getFormula": { //index
        const formula = stageDictionary[stageList[stageRun.currentStage]].formulas[parameters.index]
        if (!stageRun.formulaUnlocked[formula.id]) return invisible
        if (stageRun.formulaBought[formula.id]) return invisible
        if (isLockedByChallenge(game, formulaDictionary[formula.id])) return invisible

        if (stageRun.myFormulas.length >= game.derived.inventorySize) return disabled
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "unequipFormula": { //slot
        if (basicRun.formulaUsed[stageRun.myFormulas[parameters.slot]]) return invisible

        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "moveFormulaUp": { //slot
        if (basicRun.formulaUsed[stageRun.myFormulas[parameters.slot]]) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        if (parameters.slot <= 0) return noop
        return valid
      }
      case "moveFormulaDown": { //slot
        if (basicRun.formulaUsed[stageRun.myFormulas[parameters.slot]]) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        if (parameters.slot >= game.derived.inventorySize - 1) return noop
        return valid
      }
      case "basicReset": {
        if (game.save.maingame.progressionLayer === 0 && stageRun.currentStage === 0 && stageRun.formulaUnlockCount < 4) return invisible

        if (!basicRun.anyFormulaUsed) return disabled
        if (game.derived.activeChallenges.ONESHOT) return disabled
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "xReset": {
        const xGoal = stageDictionary[stageList[stageRun.currentStage]].xGoal
        if (!xGoal) return invisible
        const enoughX = calc("geq", basicRun.xValues[0], xGoal)
        if (game.save.maingame.progressionLayer === 0 && !enoughX) return invisible
        
        if (basicRun.inNegativeSpace) return disabled
        if (!enoughX) return disabled
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "alphaReset": {
        if (game.save.maingame.progressionLayer === 0) return invisible
        const aGoal = stageDictionary[stageList[stageRun.currentStage]].aGoal
        if (!aGoal) return invisible
        const enoughX = calc("geq", basicRun.xValues[0], aGoal)
        if (game.save.maingame.progressionLayer === 0 && !enoughX) return invisible
        
        if (basicRun.inNegativeSpace) return disabled
        if (!enoughX) return disabled
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "abortAlphaRun": {
        if (game.save.maingame.progressionLayer === 0) return invisible
        if (data.currentChallenge) return invisible
        
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "abortChallenge": {
        if (!data.currentChallenge) return invisible
        const aGoal = stageDictionary[stageList[stageRun.currentStage]].aGoal
        if (aGoal && calc("geq", basicRun.xValues[0], aGoal)) return invisible

        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "completeSegment": {
        if (!data.currentChallenge) return invisible
        const xGoal = stageDictionary[stageList[stageRun.currentStage]].xGoal
        if (!xGoal) return invisible

        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        if (calc("lt", basicRun.xValues[0], xGoal)) return disabled
        return valid
      }
      case "completeChallenge": {
        if (!data.currentChallenge) return invisible
        const aGoal = stageDictionary[stageList[stageRun.currentStage]].aGoal
        if (!aGoal) return invisible
        const enoughX = calc("geq", basicRun.xValues[0], aGoal)
        if (!enoughX) return invisible
        
        if (basicRun.inNegativeSpace) return disabled
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "exitChallenge": {
        if (!data.currentChallenge) return invisible
        return valid
      }
      case "getWorldFormula": {
        if (data.currentChallenge) return invisible
        if (calc("lt", basicRun.xValues[0], Infinity)) return invisible
        return valid
      }
      case "unequipAll": {
        if (!game.save.maingame.alpha.alphaUpgrades.MEEQ) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      }
      case "memorize": //loadout
        if (!game.save.maingame.alpha.alphaUpgrades.MEEQ) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      case "remember": //loadout
        if (!game.save.maingame.alpha.alphaUpgrades.MEEQ) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      case "toggleAuto": //slot
        if (!game.save.maingame.alpha.alphaUpgrades.AAPP) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      case "toggleAutoAll":
        if (!game.save.maingame.alpha.alphaUpgrades.SAPP) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      case "changeLoadout": //loadout
        if (!game.save.maingame.alpha.alphaUpgrades.MEMS) return invisible
        if (game.derived.activeChallenges.FULLYIDLE) return disabled
        return valid
      default:
        return undefined
    }
  }
}

const applyProductionComplex = (t, xValues) => {
  // const t = 5
  // const xValues = [1,2,3,4,5,6]
  const productionBonus = [1,1,1,1,1,1]
  const challengeMultiplier = 1
  const globalMultiplier = 1
  // const formulaEfficiency = 1
  // const autoApplyRate = 10

  const boostMap = {
    "x":{
      value: xValues[0],
      generates: [],
    },
    "x'":{
      value: xValues[1],
      generates: [{target: "x", boost: challengeMultiplier * productionBonus[0] * globalMultiplier}],
    },
    "x''":{
      value: xValues[2],
      generates: [{target: "x'", boost: challengeMultiplier * productionBonus[1] * globalMultiplier}],
    },
    "x'''":{
      value: xValues[3],
      generates: [{target: "x''", boost: challengeMultiplier * productionBonus[2] * globalMultiplier}],
    },
    // "a1":{
    //   generates: [{target: "x'", boost: autoApplyRate * formulaEfficiency}]
    // }
  }

  let resultMap = {}

  for (const [key, entry] of Object.entries(boostMap)) {
    resultMap = recurseProduction(boostMap, resultMap, t, key, entry.value)
  }
  
  xValues[0] += resultMap["x"].produced
  xValues[1] += resultMap["x'"].produced
  xValues[2] += resultMap["x''"].produced
  xValues[3] += resultMap["x'''"].produced
}

const recurseProduction = (boostMap, resultMap, t, currentNode, currentValue = 0, depth = 1)=>{
  resultMap[currentNode] ||= {produced: 0, perSecond: 0}
  if (depth > 1) {
    resultMap[currentNode].produced += currentValue
  }
  
  for (const gen of boostMap[currentNode].generates) {
    const produced = t * gen.boost * currentValue / depth
    resultMap = recurseProduction(boostMap, resultMap, t, gen.target, produced, depth+1)

    if (depth === 1)
      resultMap[gen.target].perSecond += gen.boost * currentValue
  }
  return resultMap
}

