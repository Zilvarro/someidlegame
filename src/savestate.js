import {milestoneList} from './AchievementScreen'
import { notify } from './utilities'
import formulaList from './formulas/FormulaDictionary'
import {shopFormulas} from './formulas/FormulaScreen'
import * as progresscalculation from './progresscalculation'

export const version = "0.11"
export const newSave = {
    version: version,
    progressionLayer: 0,
    selectedTabKey: "FormulaScreen",
    xValue: [0,0,0,0],
    productionBonus: [1,1,1,1],
    formulaEfficiency: [1,1,1,1],
    xRecord: 0,
    highestXTier: 0,
    formulaUnlocked: {},
    formulaBought: {},
    formulaUsed: {},
    myFormulas: [],
    autoApply: [false,false,false,false,false],
    autoApplyRate: 1,
    equipLayouts: [[],[],[],[]],
    anyFormulaUsed: true,
    xResetCount: 0,
    formulaUnlockCount: 0,
    formulaApplyCount: 0,
    alpha: 0,
    tickFormula: false,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    alphaUpgrades: {},
    autoUnlockIndex: 0,
    saveTimeStamp: 0,
    calcTimeStamp: 0,
    millisSinceAutoApply: 0,
    mileStoneCount: 0,
    holdAction: null,
    isHolding: false,
    justLaunched: true,
    lastPlayTime: 0,
    currentAlphaTime: 0,
    bestAlphaTime: Infinity,
    passiveAlphaTime: 0,
    insideChallenge: false,
    activeChallenges: {},
    clearedChallenges: {},
    researchStartTime: {},
    settings: {
        valueReduction: "CONFIRM",
        offlineProgress: "ON",
        offlineProgressPopup: "ON",
        autoSave: "ON",
        autoLoad: "ON",
        numberFormat: "LETTER",
        shopPrices: "OFF",
        showHints: "ON",
        hotKeys: "ON",
        colorizedFormulas: "NEW",
        shopScroll: "ON",
    }
}

export const differentialTargets = [30e3,30e9,30e21,Infinity]
export const alphaTarget = 30e33

export const getSaveGame = ()=>{
    const savedgame = window.localStorage.getItem('idleformulas')
    if (!savedgame) {
        return ({...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now()})
    }
    else{
        const savedgamejson = JSON.parse(savedgame)
        if (savedgamejson.settings.autoLoad === "OFF") {
            notify.warning("Auto Load disabled")
            let newgame = {...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now()}
            newgame.settings.autoSave = "OFF"
            newgame.settings.autoLoad = "OFF"
            return newgame
        } else {
            return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), justLaunched: true}
        }
    }
}

export const loadGame = ()=>{
    const savedgame = window.localStorage.getItem('idleformulas')
    if (!savedgame) {
        notify.error("No savegame found!")
        return undefined
    }
    else {
        notify.success("Game Loaded")
        const savedgamejson = JSON.parse(savedgame)
        return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), justLaunched: true}

    }
}

export const getStartingX = (state)=>{
    return 10*Math.pow(state.alpha,2);
}

export const getInventorySize = (state)=>{
    return state.alphaUpgrades.SLOT ? 4 : 3
}

export const save = (state)=>{
    state.version = version
    state.saveTimeStamp = Date.now()
    const currentgame = JSON.stringify({...state, holdAction:null})
    window.localStorage.setItem('idleformulas', currentgame)
}

const performAlphaReset = (state)=>{
    state.currentAlphaTime = 0
    state.highestXTier = 0
    state.xResetCount = 0
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    if (state.alphaUpgrades.AREM) {
        state.myFormulas = structuredClone(state.equipLayouts[state.highestXTier])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
    }
    state.autoApply = [false,false,false,false,false]
    return state
}

const giveAlphaRewards = (state)=>{
    state.alpha++
    state.progressionLayer = Math.max(state.progressionLayer, 1)
    state.bestAlphaTime = Math.min(state.currentAlphaTime, state.bestAlphaTime)
    return state
}

const performShopReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.formulaUsed = {}
    state.anyFormulaUsed = false
    state.formulaBought = {}
    state.formulaUnlocked = {}
    state.myFormulas = []
    state.formulaUnlockCount = 0
    state.xResetCount = 0
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    return state
}

const upgradeXTier = (state)=>{
    state.highestXTier++
    if (state.alphaUpgrades.AREM) {
        state.myFormulas = structuredClone(state.equipLayouts[state.highestXTier])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
    }
    return state
}

export const saveReducer = (state, action)=>{
    const popup = action.popup
    switch(action.name){
    case "idle":
        if (action.playTime === state.lastPlayTime) break

        state.lastPlayTime = action.playTime
        const timeStamp = Date.now()
        let deltaMilliSeconds = (timeStamp - state.calcTimeStamp)
        
        if (deltaMilliSeconds < 120000) { //Quick Computation
            state.currentAlphaTime += deltaMilliSeconds
            for(let i=1; i<state.xValue.length; i++) {
                state.xValue[i-1]+= deltaMilliSeconds * state.idleMultiplier * state.xValue[i] / 1000
            }
        } else if (state.settings.offlineProgress === "ON" || (state.settings.offlineProgress === "ACTIVE" && !state.justLaunched)) { //Offline Progress
            state.currentAlphaTime += deltaMilliSeconds
            const xBefore = state.xValue[0]
            state = progresscalculation.applyIdleProgress(state, deltaMilliSeconds)
            const factor = state.xValue[0] / xBefore
            if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
                if (factor && factor !== Infinity && factor > 1.01 ){
                    popup.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.\nYour x increased by a factor of " + factor.toFixed(2))
                } else {
                    popup.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.")
                }
            }
        } else if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
            deltaMilliSeconds = 0 //prevents further progress
            popup.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.")
        }

        //Apply Mouse Hold / Touch Hold events
        if (state.holdAction?.type === "ApplyFormula"){
            if(state.holdAction.delay > 0) {
                state.holdAction.delay--
            } else {
            const formula = formulaList[state.holdAction.formulaName]
                const isApplied = progresscalculation.applyFormulaToState(state, formula, false)
                if (!isApplied) {
                    state.holdAction = null
                }
            }
        }

        //Auto Appliers
        state.millisSinceAutoApply += deltaMilliSeconds
        if (state.alphaUpgrades.AAPP && state.millisSinceAutoApply > 1000 / state.autoApplyRate){
            for (let i = 0; i<5; i++) {
                if (state.autoApply[i] && state.myFormulas.length > i) {
                    progresscalculation.applyFormulaToState(state,formulaList[state.myFormulas[i]],false, true)
                }
            }
            state.millisSinceAutoApply = 0
        }
        
        //Check if next milestone is reached
        if (milestoneList[state.mileStoneCount]?.check(state)){
            notify.success("New Milestone", milestoneList[state.mileStoneCount].name)
            state.mileStoneCount++
        }

        //Kick out formulas that do not exist anymore (due to update etc)
        if (state.justLaunched) {
            state.myFormulas = state.myFormulas.filter(formulaName => formulaList[formulaName]);
            state.holdAction = null
        }

        state.calcTimeStamp = timeStamp
        state.justLaunched = false
        state.tickFormula=false

        //Auto Unlocker
        if (state.alphaUpgrades.AUNL  && state.autoUnlockIndex < shopFormulas.length) {
            let formula = formulaList[shopFormulas[state.autoUnlockIndex]]
            if (formula.effectLevel <= state.highestXTier && (state.xValue[0] >= formula.unlockCost * formula.unlockMultiplier || formula.isFree)) {
                state.formulaUnlocked[formula.formulaName] = true
                state.formulaUnlockCount++
            }
            while (state.autoUnlockIndex < shopFormulas.length && (state.formulaUnlocked[formula.formulaName] || formula.effectLevel > state.highestXTier)) {
                state.autoUnlockIndex++
                formula = formulaList[shopFormulas[state.autoUnlockIndex]]
            }
        }

        //Passive Alpha
        if (state.alphaUpgrades.PALP) {
            state.passiveAlphaTime += deltaMilliSeconds
            if (state.passiveAlphaTime >= 10 * state.bestAlphaTime) {
                state.alpha += Math.floor(state.passiveAlphaTime / state.bestAlphaTime / 10)
                state.passiveAlphaTime %= 10 * state.bestAlphaTime
            }
        }

        //Auto Resetters
        if (state.alphaUpgrades.ARES && state.xValue[0] >= alphaTarget) {
            giveAlphaRewards(state)
            performAlphaReset(state)
            performShopReset(state)
        } else if (state.alphaUpgrades.SRES && state.xValue[0] >= differentialTargets[state.highestXTier]) {
            upgradeXTier(state)
            performShopReset(state)
        }

        //Autosave
        const lastSaveMilliseconds = (timeStamp - state.saveTimeStamp)
        if (state.mileStoneCount > 0 && state.settings.autoSave === "ON" && lastSaveMilliseconds >= 10000) { //TODO
            save(state)
        }
        break;
    case "selectTab":
        state.selectedTabKey = action.tabKey
        break;
    case "reset":
        state = {...structuredClone(newSave), calcTimeStamp: Date.now(), saveTimeStamp: Date.now()};
        break;
    case "load":
        state = action.state || loadGame() || state;
        break;
    case "changeSetting":
        state.settings[action.settingName] = action.nextStatus
        break;
    case "changeHold":
        state.holdAction = action.newValue
        state.isHolding = !!state.holdAction
        break;
    case "swapFormulas":
        const startIndex = state.myFormulas.indexOf(action.formulaName)
        let targetIndex
        if (action.partnerFormulaName){
            targetIndex = state.myFormulas.indexOf(action.partnerFormulaName)
        } else {
            targetIndex = action.isDownward ? startIndex + 1 : startIndex - 1
        }
        if (state.myFormulas[startIndex] && state.myFormulas[targetIndex]) {
            [state.myFormulas[startIndex], state.myFormulas[targetIndex]] = [state.myFormulas[targetIndex], state.myFormulas[startIndex]]
        }
        break;
    case "applyFormula":
        if (!state.tickFormula && !state.isHolding) {
            progresscalculation.applyFormulaToState(state, action.formula, action.forceApply)
            state.tickFormula = true
        }
        break;
    case "unlockFormula":
        if (!state.alphaUpgrades.UREF)
            state.xValue[0] -= action.formula.isFree ? 0 : action.formula.unlockCost * action.formula.unlockMultiplier
        state.formulaUnlocked[action.formula.formulaName] = true
        state.formulaUnlockCount++
        break;
    case "getFormula":
        state.formulaBought[action.formula.formulaName] = true
        state.myFormulas.push(action.formula.formulaName)
        break;
    case "discardFormula":
        state.formulaBought[action.formula.formulaName] = false
        state.myFormulas = state.myFormulas.filter(formulaName => formulaName !== action.formula.formulaName)
        break;
    case "resetXValues":
        state.xValue = [getStartingX(state),0,0,0]
        state.formulaUsed = {}
        state.anyFormulaUsed = false
        state.xResetCount++
        break;
    case "resetShop":
        performShopReset(state)
        break;
    case "upgradeXTier":
        upgradeXTier(state)
        break;
    case "alphaReset":
        giveAlphaRewards(state)
        performAlphaReset(state)
        performShopReset(state)
        break;
    case "alphaUpgrade":
        if (state.alpha >= action.upgrade.cost) {
            state.alpha-=action.upgrade.cost
            state.alphaUpgrades[action.upgrade.id] = true
        }
        break;
    case "cheat":
        state.idleMultiplier = 1
        state.mileStoneCount = 6
        state.progressionLayer = 1
        state.alpha++
        break;
    case "memorize":
        state.equipLayouts[state.highestXTier] = structuredClone(state.myFormulas)
        break;
    case "remember":
        state.myFormulas = structuredClone(state.equipLayouts[state.highestXTier])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
        break;
    case "toggleAutoApply":
        const checked = state.autoApply[action.index]
        if (!state.alphaUpgrades.SAPP) {
            state.autoApply = [false,false,false,false,false]
        }
        state.autoApply[action.index] = !checked
        break;
    case "enterChallenge":
        state.insideChallenge = true
        state.activeChallenges = {[action.challenge.id]: true}
        performAlphaReset(state)
        performShopReset(state)
        break;
    case "exitChallenge":
        state.insideChallenge = false
        state.activeChallenges = {}
        performAlphaReset(state)
        performShopReset(state)
        break;
    case "startResearch":
        state.researchStartTime[action.research] = Date.now()
        break;
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}