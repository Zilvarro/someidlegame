import {milestoneList} from './AchievementScreen'
import { notify } from './utilities'
import formulaList from './formulas/FormulaDictionary'
import {shopFormulas} from './formulas/FormulaScreen'

export const version = "0.08"
//TODO disable Alpha screen without corresponding milestone
export const newSave = {
    version: version,
    progressionLayer: 0,
    selectedTabKey: "FormulaScreen",
    xValue: [0,0,0,0],
    xRecord: 0,
    highestXTier: 0,
    formulaUnlocked: {},
    formulaBought: {},
    formulaUsed: {},
    myFormulas: [],
    autoApply: [false,false,false,false,false],
    equipLayouts: [[],[],[],[]],
    anyFormulaUsed: true,
    xResetCount: 0,
    formulaUnlockCount: 0,
    formulaApplyCount: 0,
    maxAlpha: 0,
    alpha: 0,
    tickFormula: false,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    alphaUpgrades: {},
    autoUnlockIndex: 0,
    saveTimeStamp: 0,
    calcTimeStamp: 0,
    mileStoneCount: 0,
    holdAction: null,
    justLaunched: true,
    lastPlayTime: 0,
    currentAlphaTime: 0,
    bestAlphaTime: Infinity,
    passiveAlphaTime: 0,
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
    return 10*Math.pow(state.maxAlpha,2);
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
    state.alpha++
    state.maxAlpha++
    state.progressionLayer = Math.max(state.progressionLayer, 1)
    state.bestAlphaTime = Math.min(state.currentAlphaTime, state.bestAlphaTime)
    state.currentAlphaTime = 0
    state.highestXTier = 0
    state.xResetCount = 0
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    if (state.alphaUpgrades.AREM) {
        state.myFormulas = structuredClone(state.equipLayouts[state.highestXTier])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
    }
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

const applyFormulaToState = (state, formula, forceApply)=>{
    //Can't afford
    if (state.xValue[0] < formula.applyCost || state.xValue[0] < formula.applyNeed)
        return false

    const actuallyApply = () => {
        if (!state.alphaUpgrades.FREF && state.xValue[formula.targetLevel] !== newValue) { //Cost only deducted if value changes
            state.xValue[0] -= formula.applyCost
        }
        state.xValue[formula.targetLevel] = formula.applyFormula(state.xValue, state)
        state.formulaUsed[formula.formulaName] = true
        state.anyFormulaUsed = true
        state.formulaApplyCount++
    }

    //Would lower the value
    const newValue = formula.applyFormula(state.xValue, state)
    if (0.9999 * state.xValue[formula.targetLevel] > newValue) {
        switch (state.settings.valueReduction) {
            case "CONFIRM":
                if (!forceApply) {
                    // popup.confirm("This will lower your X value. Are you sure?\n(You can skip this pop-up by using Shift+Click)",actuallyApply)
                    // return false

                    // if (!window.confirm("This will lower your X value. Are you sure?\n(You can skip this pop-up by using Shift+Click)")) {
                        return false
                    // }
                }
                break;
            case "WARNING":
                if (!forceApply) {
                    notify.warning("Value would be reduced", "Shift+Click if this is intentional")
                    return false
                }
                break;
            case "PREVENT":
                if (!forceApply)
                    return false
                break;
            case "NEVER":
                return false
            case "APPLY":
                break;
            default:
                return false
        }
    }
    actuallyApply()
    return true
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
            const integrationFactor = [1,1,1/2,1/6,1/24] //one over factorial
            const xBefore = state.xValue[0]
            for(let j=0; j<state.xValue.length; j++) { //tier to be calculated
                for(let k=j+1; k<state.xValue.length; k++) { //higher tiers that affect it
                    //~2% time penalty on offline progress to hopefully ensure offline is not better than online idling
                    state.xValue[j]+= Math.pow(deltaMilliSeconds / 1020, k-j) * state.idleMultiplier * state.xValue[k] * integrationFactor[k-j]
                }
            }
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
                const isApplied = applyFormulaToState(state, formula, false)
                if (!isApplied) {
                    state.holdAction = null
                }
            }
        }

        for (let i = 0; i<5; i++) {
            if (state.autoApply[i] && state.myFormulas.length > i) {
                applyFormulaToState(state,formulaList[state.myFormulas[i]],false)
            }
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
            performAlphaReset(state)
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
        if (!state.tickFormula) {
            applyFormulaToState(state, action.formula, action.forceApply)
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
        performAlphaReset(state)
        break;
    case "alphaUpgrade":
        if (state.alpha >= action.upgrade.cost) {
            state.alpha-=action.upgrade.cost
            state.alphaUpgrades[action.upgrade.id] = true
        }
        break;
    case "cheat":
        if (action.idleMultiplier) {
            state.idleMultiplier = action.idleMultiplier
        } else {
            state.xValue[0] = 1e30
        }
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
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}