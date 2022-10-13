import {milestoneList} from './AchievementScreen'
import { notify } from './utilities'

export const newSave = {
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
    maxAlpha: 0,
    alpha: 0,
    tickFormula: false,
    inventorySize: 3,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    saveTimeStamp: 0,
    mileStoneCount: 0,
}

export const getSaveGame = ()=>{
    const savedgame = window.localStorage.getItem('idleformulas')
    if (true||!savedgame) {
        console.log("New Game")
        return ({...structuredClone(newSave), saveTimeStamp: Date.now()})
    }
    else {
        console.log("Game Loaded")
        return JSON.parse(savedgame)
    }
}

export const loadGame = ()=>{
    const savedgame = window.localStorage.getItem('idleformulas')
    if (!savedgame) {
        window.alert("No savegame found!")
        return undefined
    }
    else {
        return JSON.parse(savedgame)
    }
}

export const getStartingX = (state)=>{
    return 12*Math.pow(state.maxAlpha,2);
}

export const save = (state)=>{
    const currentgame = JSON.stringify(state)
    window.localStorage.setItem('idleformulas', currentgame)
    window.alert("Game saved!")
}

export const saveReducer = (state, action)=>{
    switch(action.name){
    case "idle":
        const timeStamp = Date.now()
        const deltaMilliSeconds = (timeStamp - state.saveTimeStamp)
        if (deltaMilliSeconds < 60000) { //Quick Computation
            for(let i=1; i<state.xValue.length; i++) {
                state.xValue[i-1]+= deltaMilliSeconds * state.idleMultiplier * state.xValue[i] / 1000
            }
        } else { //Offline Progress
            const integrationFactor = [1,1,1/2,1/6,1/24] //one over factorial
            const xBefore = state.xValue[0]
            for(let j=0; j<state.xValue.length; j++) { //tier to be calculated
                for(let k=j+1; k<state.xValue.length; k++) { //higher tiers that affect it
                    //~2% time penalty on offline progress to hopefully ensure offline is not better than online idling
                    state.xValue[j]+= Math.pow(deltaMilliSeconds / 1020, k-j) * state.idleMultiplier * state.xValue[k] * integrationFactor[k-j]
                }
            }
            window.alert("You were away for " + Math.floor(deltaMilliSeconds / 60000) + " minutes.\nYour x increased by a factor of " + (state.xValue[0] / xBefore).toFixed(2))
        }

        //Check if next milestone is reached
        if (milestoneList[state.mileStoneCount]?.check(state)){
            notify.success("New Milestone", milestoneList[state.mileStoneCount].name)
            state.mileStoneCount++
        }
        state.saveTimeStamp = timeStamp
        state.tickFormula=false
        break;
    case "selectTab":
        state.selectedTabKey = action.tabKey
        break;
    case "reset":
        state = {...structuredClone(newSave), saveTimeStamp: Date.now()};
        break;
    case "load":
        state = action.state || loadGame() || state;
        break;
    case "applyFormula":
        if (!state.tickFormula && (action.forceApply || state.xValue[action.formula.targetLevel] <= action.formula.applyFormula(state.xValue) || window.confirm("This will lower your X value. Are you sure?\n(You can skip this pop-up by using Shift+Click)"))) {
            state.xValue[action.formula.targetLevel] = action.formula.applyFormula(state.xValue)
            state.xValue[0] -= action.formula.applyCost
            state.formulaUsed[action.formula.formulaName] = true
            state.anyFormulaUsed = true
            state.tickFormula = true
        }
        break;
    case "unlockFormula":
        state.xValue[0] -= action.formula.unlockCost
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
        state.xValue[0] = 1e23
        //state.idleMultiplier = 10
        //state.maxAlpha++
        //state.alpha++
        break;
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}