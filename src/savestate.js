import {milestoneList} from './AchievementScreen'
import { notify } from './utilities'
import formulaList from './FormulaDictionary'

export const newSave = {
    version: "0.02",
    selectedTabKey: "FormulaScreen",
    xValue: [0,0,0,0],
    xRecord: 0,
    highestXTier: 0,
    freeFormula: "x+1",
    formulaUnlocked: {},
    formulaBought: {},
    formulaUsed: {},
    myFormulas: [],
    anyFormulaUsed: true,
    xResetCount: 0,
    formulaUnlockCount: 0,
    formulaApplyCount: 0,
    maxAlpha: 0,
    alpha: 0,
    tickFormula: false,
    inventorySize: 3,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    saveTimeStamp: 0,
    calcTimeStamp: 0,
    mileStoneCount: 0,
    holdAction: null,
    justLaunched: true,
    settings: {
        valueReduction: "CONFIRM",
        offlineProgress: "ON",
        offlineProgressPopup: "ON",
        autoSave: "ON",
        autoLoad: "ON",
        showHints: "ON",
        hotKeys: "ON",
    }
}

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
    return 12*Math.pow(state.maxAlpha,2);
}

export const save = (state)=>{
    const currentgame = JSON.stringify(state)
    window.localStorage.setItem('idleformulas', currentgame)
}

const applyFormulaToState = (state, formula, forceApply)=>{
    //Can't afford
    if (!forceApply && (state.xValue[0] < formula.applyCost || state.xValue[0] < formula.applyNeed))
        return false

    //Would lower the value
    if (0.9999 * state.xValue[formula.targetLevel] > formula.applyFormula(state.xValue, state)) {
        switch (state.settings.valueReduction) {
            case "CONFIRM":
                if (!forceApply && !window.confirm("This will lower your X value. Are you sure?\n(You can skip this pop-up by using Shift+Click)"))
                    return false
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

    state.xValue[formula.targetLevel] = formula.applyFormula(state.xValue, state)
    state.xValue[0] -= formula.applyCost
    state.formulaUsed[formula.formulaName] = true
    state.anyFormulaUsed = true
    state.formulaApplyCount++
    return true
}

export const saveReducer = (state, action)=>{
    switch(action.name){
    case "idle":
        const timeStamp = Date.now()
        const deltaMilliSeconds = (timeStamp - state.calcTimeStamp)
        if (deltaMilliSeconds < 120000) { //Quick Computation
            for(let i=1; i<state.xValue.length; i++) {
                state.xValue[i-1]+= deltaMilliSeconds * state.idleMultiplier * state.xValue[i] / 1000
            }
        } else if (state.settings.offlineProgress === "ON" || (state.settings.offlineProgress === "ACTIVE" && !state.justLaunched)) { //Offline Progress
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
                    window.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.\nYour x increased by a factor of " + factor.toFixed(2))
                } else {
                    window.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.")
                }
            }
        } else if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
            window.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.")
        }

        //Apply Mouse Hold / Touch Hold events
        if (state.holdAction?.type === "ApplyFormula" && state.formulaUsed[state.holdAction.formulaName]){
            if(state.holdAction.delay > 0) {
                state.holdAction.delay--
            } else {
            const formula = formulaList[state.holdAction.formulaName]
                const isApplied = applyFormulaToState(state, formula, false)
                if (!isApplied)
                    state.holdAction = null
            }
        }

        //Check if next milestone is reached
        if (milestoneList[state.mileStoneCount]?.check(state)){
            notify.success("New Milestone", milestoneList[state.mileStoneCount].name)
            state.mileStoneCount++
        }

        //Kick out formulas that do not exist anymore (due to update etc)
        if (state.justLaunched)
            state.myFormulas = state.myFormulas.filter(formulaName => formulaList[formulaName]);

        state.calcTimeStamp = timeStamp
        state.justLaunched = false
        state.tickFormula=false

        //Autosave
        const lastSaveMilliseconds = (timeStamp - state.saveTimeStamp)
        if (state.mileStoneCount > 0 && state.settings.autoSave === "ON" && lastSaveMilliseconds >= 10000) { //TODO
            state.saveTimeStamp = Date.now()
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
        state.xValue[0] -= action.formula.isFree ? 0 : action.formula.unlockCost
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
        state.xValue = [getStartingX(state),0,0,0]
        state.formulaUsed = {}
        state.anyFormulaUsed = false
        state.formulaBought = {}
        state.formulaUnlocked = {}
        state.myFormulas = []
        state.formulaUnlockCount = 0
        state.xResetCount = 0
        state.formulaApplyCount = 0
        break;
    case "upgradeXTier":
        state.highestXTier++
        const freeFormulas = ["x+1","x'=1","x'=1","x'=1"]
        state.freeFormula = freeFormulas[state.highestXTier]
        break;
    case "alphaReset":
        state.alpha++
        state.maxAlpha++
        state.highestXTier = 0
        state.freeFormula = ""
        state.xResetCount = 0
        state.formulaApplyCount = 0
        break;
    case "alphaUpgrade":
        switch (action.id) {
        case 0:
            state.alpha -= 1
            state.inventorySize = 4
            break;
        case 1:
            state.alpha -= 2
            state.idleMultiplier = 2
            break;
        default:
            console.error("Alpha Upgrade " + action.id + " not found.")
        }
        state.boughtAlpha[action.id] = true
        break;
    case "cheat":
        if (action.idleMultiplier) {
            state.idleMultiplier = action.idleMultiplier
        } else {
            state.xValue[0] = 1e30
        }
        break;
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}