import {milestoneList} from './AchievementScreen' 
import {notify,secondsToHms} from './utilities'
import formulaList from './formulas/FormulaDictionary'
import {shopFormulas} from './formulas/FormulaScreen'
import {isLockedByChallenge} from './formulas/FormulaButton'
import {calcStoneResultForX} from './alpha/AlphaStonesTab'
import {startingStones, stoneTable, stoneList} from './alpha/AlphaStoneDictionary'
import * as progresscalculation from './progresscalculation'
// import { Buffer } from "buffer";

export const version = "0.25"
export const newSave = {
    version: version,
    progressionLayer: 0,
    selectedTabKey: "FormulaScreen",
    selectedAlphaTabKey: "AlphaUpgradeTab",
    xValue: [0,0,0,0],
    xHighScores: [30e3,30e9,30e21,30e33],
    formulaGodScores: [1,1,1,1],
    productionBonus: [1,1,1,1],
    formulaEfficiency: [1,1,1,1],
    xRecord: 0,
    highestXTier: 0,
    formulaUnlocked: {},
    formulaBought: {},
    formulaUsed: {},
    inNegativeSpace: false,
    decreaseCooldown: false,
    myFormulas: [],
    autoApply: [false,false,false,false,false],
    autoApplyLevel: 0,
    autoApplyRate: 2,
    equipLayouts: [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]],
    selectedLayout: 0,
    anyFormulaUsed: true,
    xResetCount: 0,
    formulaUnlockCount: 0,
    formulaApplyCount: 0,
    alpha: 0,
    destinyStars: 0,
    tickFormula: false,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    alphaUpgrades: {},
    autoUnlockIndex: 0,
    saveTimeStamp: 0,
    calcTimeStamp: 0,
    millisSinceAutoApply: 0,
    millisSinceCountdown: 0,
    mileStoneCount: 0,
    holdAction: null,
    isHolding: false,
    justLaunched: true,
    lastPlayTime: 0,
    currentAlphaTime: 0,
    bestAlphaTime: 1e100,
    bestIdleTime: 1800e3,
    bestIdleTimeAlpha: 1,
    passiveAlphaTime: 0,
    passiveMasterTime: 0,
    insideChallenge: false,
    currentChallenge: null,
    currentChallengeName: null,
    currentChallengeTime: 0,
    activeChallenges: {},
    clearedChallenges: {},
    challengeProgress: {},
    researchStartTime: {},
    researchLevel: {},
    startingStoneTurned:{},
    startingStoneLevel:{},
    startingStoneMode:1, //1 Increment, 0 Description, -1 Decrement
    startingStoneX: 0,
    baseAlphaLevel: 0,
    currentEnding: "",
    completedEndings: {},
    badEndingCount: 0,
    settings: {
        valueReduction: "CONFIRM",
        offlineProgress: "ON",
        offlineProgressPopup: "ON",
        xResetPopup: "ON",
        autoSave: "ON",
        autoLoad: "ON",
        numberFormat: "LETTER",
        shopPrices: "OFF",
        showHints: "ON",
        hotKeys: "ON",
        shopScroll: "OFF",
        autoResetterS: "OFF",
        autoResetterA: "OFF",
        alphaThreshold: "MINIMUM",
        autoRemembererActive: "ON",
    }
}

export const differentialTargets = [30e3,30e9,30e21,Infinity]
export const alphaTarget = 30e33
const alphaThresholds = {
    "MINIMUM": alphaTarget,
    "1e40": 1e40,
    "1e50": 1e50,
    "1e60": 1e60,
    "1e70": 1e70,
    "1e80": 1e80,
    "1e90": 1e90,
    "1e100": 1e100,
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
            //*TEMPORARY*
            //const encodedState = Buffer.from(JSON.stringify(state)).toString("base64");
            // navigator.clipboard.writeText(savedgame);
            // notify.success("Copied Old State")
            // return ({...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now()})

            return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), currentEnding: newSave.currentEnding, justLaunched: true}
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

        //*TEMPORARY*
        // const encodedState = Buffer.from(JSON.stringify(savedgamejson)).toString("base64");
        // navigator.clipboard.writeText(encodedState);
        //     notify.success("Copied Old State")
        // return ({...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now()})

        return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), currentEnding: newSave.currentEnding, justLaunched: true}

    }
}

export const getStartingX = (state)=>{
    const fromStartingStones = state.startingStoneX
    const fromResearch = state.researchLevel["x"] >= 2500 ? 10e12 : Math.floor(100*Math.pow(1.01, state.researchLevel["x"] || 0)-100);
    return Math.max(fromStartingStones + fromResearch, fromStartingStones * fromResearch)
}

export const getInventorySize = (state)=>{
    if (state.activeChallenges.SMALLINV)
        return 1
    else
        return state.alphaUpgrades.SLOT ? 4 : 3
}

export const save = (state)=>{
    state.version = version
    state.saveTimeStamp = Date.now()
    let currentgame = JSON.stringify({...state, holdAction:null})
    window.localStorage.setItem('idleformulas', currentgame)
}

export const getAlphaRewardTier = (value)=>{
    if (value >= 1e100)
        return {
            alpha: 1000,
            next: undefined,
            nextAlpha: undefined,
        }
    else if (value >= 1e90)
        return {
            alpha: 100,
            next: 1e100,
            nextAlpha: 1000,
        }
    else if (value >= 1e80)
        return {
            alpha: 10,
            next: 1e90,
            nextAlpha: 100,
        }
    else if (value >= 1e70)
        return {
            alpha: 7,
            next: 1e80,
            nextAlpha: 10,
        }
    else if (value >= 1e60)
        return {
            alpha: 5,
            next: 1e70,
            nextAlpha: 7,
        }
    else if (value >= 1e50)
        return {
            alpha: 3,
            next: 1e60,
            nextAlpha: 5,
        }
    else if (value >= 1e40)
        return {
            alpha: 2,
            next: 1e50,
            nextAlpha: 3,
        }
    else //if (value >= alphaTarget)
        return {
            alpha: 1,
            next: 1e40,
            nextAlpha: 2,
        }
}

const performAlphaReset = (state)=>{
    state.currentAlphaTime = 0
    state.millisSinceCountdown = 0
    state.highestXTier = 0
    state.xResetCount = 0
    state.inNegativeSpace = false
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    state.insideChallenge = false
    state.decreaseCooldown = false
    state.currentChallenge = null
    state.currentChallengeName = null
    state.currentChallengeTime = 0
    state.activeChallenges = {}
    return state
}

const giveAlphaRewards = (state)=>{
    if (state.xValue[0] < alphaTarget) {return} //No rewards without the necessary points

    //Initial Unlock of the Layer
    if (state.progressionLayer <= 0) {
        state.alpha = 1
        state.progressionLayer = 1
        notify.success("ALPHA", "New Layer Unlocked!")
        return state
    }
    
    const alphaReward = getAlphaRewardTier(state.xValue[0]).alpha * Math.pow(2,state.baseAlphaLevel)
    if (state.currentChallenge) {
        //Passive Alpha from Master of Idle
        if (state.currentChallenge === "FULLYIDLE" && state.clearedChallenges[state.currentChallenge]) {
            if (state.currentAlphaTime / alphaReward < state.bestIdleTime / state.bestIdleTimeAlpha) {
                state.bestIdleTimeAlpha = alphaReward
                state.bestIdleTime = Math.max(1000, state.currentAlphaTime)
                state.passiveMasterTime = Math.min(state.passiveMasterTime, state.bestIdleTime / state.bestIdleTimeAlpha)
            }
        }

        //General Challenge Stuff
        if (!state.clearedChallenges[state.currentChallenge])
            notify.success("Challenge Complete", state.currentChallengeName)
        state.challengeProgress[state.currentChallenge] = 4
        state.clearedChallenges[state.currentChallenge] = true
        state.activeChallenges = {}
        state.insideChallenge = false
        state.currentChallenge = null
        state.currentChallengeName = null
        state.selectedTabKey = "AlphaScreen"
        state.selectedAlphaTabKey = "AlphaChallengeTab"
        state = updateFormulaEfficiency(state)
    } else {
        state.alpha += alphaReward
        state.bestAlphaTime = Math.max(1000,Math.min(state.currentAlphaTime, state.bestAlphaTime))
        state.passiveAlphaTime = Math.min(state.passiveAlphaTime, state.bestAlphaTime)
        state.xHighScores[state.highestXTier] = Math.max(state.xHighScores[state.highestXTier], state.xValue[0])
    }
    return state
}

const performXReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.formulaUsed = {}
    state.autoApply = [false,false,false,false,false]
    state.anyFormulaUsed = false
    state.inNegativeSpace = false
    state.decreaseCooldown = false
    state.xResetCount++
}

const performShopReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.millisSinceCountdown = 0
    state.currentChallengeTime = 0
    state.formulaUsed = {}
    state.anyFormulaUsed = false
    state.formulaBought = {}
    state.formulaUnlocked = {}
    state.myFormulas = []
    state.formulaUnlockCount = 0
    state.xResetCount = 0
    state.inNegativeSpace = false
    state.decreaseCooldown = false
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    return state
}

const rememberLoadout = (state, isManual)=>{
    if ((state.alphaUpgrades.AREM && state.settings.autoRemembererActive === "ON") || isManual) {
        state.myFormulas = state.equipLayouts[state.selectedLayout][state.highestXTier].slice(0,getInventorySize(state))
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
    } else {
        state.myFormulas = []
        state.formulaBought = {}
    }
}

const upgradeXTier = (state)=>{
    if (state.progressionLayer !== 0)
        state.xHighScores[state.highestXTier] = Math.max(state.xHighScores[state.highestXTier], state.xValue[0])
    state.highestXTier++
    if (state.currentChallenge) {
        if (!state.clearedChallenges[state.currentChallenge])
            notify.success("Segment Complete", state.currentChallengeName)
        state.challengeProgress[state.currentChallenge] = Math.max(state.challengeProgress[state.currentChallenge] || 0,state.highestXTier)
        state = updateFormulaEfficiency(state)
    }
    return state
}

const updateProductionBonus = (state)=>{
    state.productionBonus[0] = Math.pow(1.01, state.researchLevel["x'"] || 0 )
    state.productionBonus[1] = Math.pow(1.01, state.researchLevel["x''"] || 0)
    state.productionBonus[2] = Math.pow(1.01, state.researchLevel["x'''"] || 0)
    return state
}

export const getChallengeBonus = (state)=>{
    let clearedFull = 0
    for (let c in state.clearedChallenges) {
        if (state.clearedChallenges[c])
            clearedFull++
    }

    let clearedSegments = 0
    for (let c in state.challengeProgress) {
        if (state.challengeProgress[c])
            clearedSegments += state.challengeProgress[c]
    }

    return {
        bonus:(1 + 0.1 * clearedSegments) * Math.pow(2, clearedFull),
        full: clearedFull,
        segment: clearedSegments,
    }
}

export const getMaxxedResearchBonus = (state)=>{
    let maxxed = 0
    for (let c in state.researchLevel) {
        if (state.researchLevel[c] >= 2500)
            maxxed++
    }

    return {
        bonus: Math.pow(2, maxxed),
        count: maxxed,
    }
}

const updateFormulaEfficiency = (state)=>{
    const challengeBonus = getChallengeBonus(state).bonus
    const researchBonus = getMaxxedResearchBonus(state).bonus
    state.formulaEfficiency = [challengeBonus * researchBonus,challengeBonus * researchBonus,challengeBonus * researchBonus,challengeBonus * researchBonus]
    return state
}

export const saveReducer = (state, action)=>{
    const popup = action.popup
    switch(action.name){
    case "idle":
        if (action.playTime === state.lastPlayTime) break

        state.lastPlayTime = action.playTime
        const timeStamp = Date.now()
        if (state.xValue[0]===-Infinity) {
            state.currentEnding = "negative"
            performXReset(state)
        } else if (state.xValue[0]<0||state.xValue[1]<0||state.xValue[2]<0||state.xValue[3]<0) {
            state.inNegativeSpace = true
        }
        
        let deltaMilliSeconds = (timeStamp - state.calcTimeStamp)

        if (deltaMilliSeconds < 120000) { //Quick Computation
            if (state.insideChallenge || state.anyFormulaUsed || state.xResetCount || state.highestXTier > 0)
                state.currentAlphaTime += deltaMilliSeconds
            state.currentChallengeTime += deltaMilliSeconds
            const challengeMultiplier = state.activeChallenges.SLOWPROD ? 0.01 : 1

            //Regular Production
            for(let i=1; i<state.xValue.length; i++) {
                //Close to 0 does not produce
                if (Math.abs(state.xValue[i]) >= 0.5) {
                    state.xValue[i-1]+= deltaMilliSeconds * state.productionBonus[i-1] *challengeMultiplier * state.idleMultiplier * state.xValue[i] / 1000
                }
            }

            //Challenge Decay
            if (state.activeChallenges.DECREASE ) {
                for(let i=0; i<state.xValue.length; i++) {
                    //10% per Second Decay
                    state.xValue[i] *= Math.pow(0.9, deltaMilliSeconds / 1000)

                    //One per Second decrease for good measure
                    if (state.xValue[i] > deltaMilliSeconds / 1000) {
                        state.xValue[i] -= deltaMilliSeconds / 1000
                    } else if (state.xValue[i] > 0) {
                        state.xValue[i] = 0
                    }

                    //Everything close to 0 becomes 0 instantly
                    if (Math.abs(state.xValue[i]) < 1) {
                        state.xValue[i] = 0
                    }
                }   
            }
        } else if (!state.currentChallenge && (state.settings.offlineProgress === "ON" || (state.settings.offlineProgress === "ACTIVE" && !state.justLaunched))) { //Offline Progress
            if (state.anyFormulaUsed || state.highestXTier > 0 || state.xResetCount)
                state.currentAlphaTime += deltaMilliSeconds
            state.currentChallengeTime += deltaMilliSeconds
            const xBefore = state.xValue[0]
            state = progresscalculation.applyIdleProgress(state, deltaMilliSeconds)
            const factor = state.xValue[0] / xBefore
            if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
                if (factor && factor !== Infinity && factor > 1.01 ){
                    popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 1000)) + ".\nYour x increased by a factor of " + factor.toFixed(2))
                } else {
                    popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 1000)) + ".")
                }
            }
        } else if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
            popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 1000)) + ".")
            deltaMilliSeconds = 0 //prevents further progress
        }

        //Apply Mouse Hold / Touch Hold events
        let recoverHold = false
        let recoverValue = 0
        let recoverTier = 0
        if (state.holdAction?.type === "ApplyFormula"){
            if(state.holdAction.delay > 0) {
                state.holdAction.delay--
            } else {
            const formula = formulaList[state.holdAction.formulaName]
                let xBeforeHold = state.xValue[formula.targetLevel]
                const isApplied = progresscalculation.applyFormulaToState(state, formula, false)
                if (!isApplied) {
                    state.holdAction = null
                }

                //Allows players to force an xValue down by holding the button
                //There are strategies where applying the hold first/last would be beneficial and I want both to work
                if (state.xValue[formula.targetLevel] <= xBeforeHold) {
                    recoverHold = true
                    recoverValue = state.xValue[formula.targetLevel]
                    recoverTier = formula.targetLevel
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
            state.millisSinceAutoApply = Math.min(100, state.millisSinceAutoApply - 1000 / state.autoApplyRate) //Buffer up to 100 ms
        }

        if (recoverHold)
            state.xValue[recoverTier] = recoverValue

        if (state.activeChallenges.FORMULAGOD) {
            for (let i = 0; i < 4; i++)
                state.formulaGodScores[i] = Math.max(state.formulaGodScores[i], state.xValue[i])
        }

        //X-Reset from Countdown Challenge
        state.millisSinceCountdown += deltaMilliSeconds
        if (state.activeChallenges.COUNTDOWN && state.millisSinceCountdown >= 30000) {
            state.millisSinceCountdown = 0
            state.xValue=[0,0,0,0]
        }

        //Check if next milestone is reached
        if (milestoneList[state.mileStoneCount]?.check(state)){
            notify.success("New Milestone", milestoneList[state.mileStoneCount].name)
            state.mileStoneCount++
        }

        //Check if new starting stones are turned
        stoneList.forEach(stoneName => {
            if (!state.startingStoneTurned[stoneName] && startingStones[stoneName]?.check(state)){
                notify.success("Starting Stone Turned", startingStones[stoneName].title)
                state.startingStoneTurned[stoneName] = true
            }
        });

        //Kick out formulas that do not exist anymore (due to update etc)
        if (state.justLaunched) {
            state.myFormulas = state.myFormulas.filter(formulaName => formulaList[formulaName]);
            state.holdAction = null
        }

        state.calcTimeStamp = timeStamp
        state.justLaunched = false
        state.tickFormula=false

        //Auto Unlocker
        let formula
        for (; state.autoUnlockIndex < shopFormulas.length; state.autoUnlockIndex++) {
            formula = formulaList[shopFormulas[state.autoUnlockIndex]]

            //Unlock not possible/necessary
            if (isLockedByChallenge(state,formula) || state.formulaUnlocked[formula.formulaName] || formula.effectLevel > state.highestXTier)
                continue

            //Not enough x for unlock (future formulas are even more expensive)
            if (state.xValue[0] < formula.unlockCost * formula.unlockMultiplier && !formula.isFree)
                break

            //No Auto-Unlock
            if (!state.alphaUpgrades.AUNL)
                break

            //perform Unlock
            state.formulaUnlocked[formula.formulaName] = true
            state.formulaUnlockCount++
        }

        //Passive Alpha from Upgrade
        if (state.alphaUpgrades.PALP) {
            state.passiveAlphaTime += deltaMilliSeconds
            if (state.passiveAlphaTime >= state.bestAlphaTime) {
                state.alpha += Math.floor(state.passiveAlphaTime / state.bestAlphaTime)
                state.passiveAlphaTime %= state.bestAlphaTime
            }
        }

        //Passive Alpha from Master of Idle
        if (state.clearedChallenges.FULLYIDLE) {
            state.passiveMasterTime += deltaMilliSeconds
            if (state.passiveMasterTime * state.bestIdleTimeAlpha >= state.bestIdleTime) {
                state.alpha += Math.floor(state.passiveMasterTime * state.bestIdleTimeAlpha / state.bestIdleTime)
                state.passiveMasterTime %= state.bestIdleTime / state.bestIdleTimeAlpha
            }
        }     

        //Auto Resetters
        const alphaThreshold = alphaThresholds[state.settings.alphaThreshold] || alphaTarget

        if (!state.inNegativeSpace && state.settings.autoResetterA !== "OFF" && state.alphaUpgrades.ARES && state.xValue[0] >= alphaThreshold) {
            giveAlphaRewards(state)
            performAlphaReset(state)
            performShopReset(state)
            rememberLoadout(state)
        } else if (!state.inNegativeSpace && state.settings.autoResetterS !== "OFF" && state.alphaUpgrades.SRES && state.xValue[0] >= differentialTargets[state.highestXTier]) {
            upgradeXTier(state)
            performShopReset(state)
            rememberLoadout(state)
        }

        //Failed Challenge
        if (state.insideChallenge && state.currentChallengeTime > 1800e3) {
            state.currentEnding = "timeout"
            performAlphaReset(state)
            performShopReset(state)
            rememberLoadout(state)
        }

        //Autosave
        const lastSaveMilliseconds = (timeStamp - state.saveTimeStamp)
        if (state.mileStoneCount > 0 && state.settings.autoSave === "ON" && lastSaveMilliseconds >= 10000) { //TODO
            save(state)
        }

        //Failsafe NaN
        if (!state.currentEnding && isNaN(state.xValue[0]))
        {
            performXReset(state)
            state.currentEnding = "infinite"
        }
        break;
    case "selectTab":
        state.selectedTabKey = action.tabKey
        break;
    case "selectAlphaTab":
        state.selectedAlphaTabKey = action.tabKey
        break;
    case "reset":
        state = {...structuredClone(newSave), calcTimeStamp: Date.now(), saveTimeStamp: Date.now()};
        break;
    case "load":
        state = action.state || loadGame() || state;
        break;
    case "changeSetting":
        state.settings[action.settingName] = action.nextStatus
        state.decreaseCooldown = false
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
        if (!state.alphaUpgrades.AUNL)
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
        performXReset(state)
        break;
    case "resetShop":
        performShopReset(state)
        rememberLoadout(state)
        break;
    case "upgradeXTier":
        upgradeXTier(state)
        break;
    case "alphaReset":
        giveAlphaRewards(state)
        performAlphaReset(state)
        performShopReset(state)
        rememberLoadout(state)
        break;
    case "alphaUpgrade":
        if (state.alpha >= action.upgrade.cost) {
            state.alpha-=action.upgrade.cost
            state.alphaUpgrades[action.upgrade.id] = true
        }
        break;
    case "cheat":
        state.alpha = 0
        state.bestIdleTime = 1800e3
        state.bestIdleTimeAlpha = 1
        state.passiveMasterTime = 0

        // if (state.mileStoneCount < 6) {
        //     state.mileStoneCount = 6
        //     state.progressionLayer = 1
        //     state.alpha++
        // } else {
        //     state.alpha = 1
        //     state.bestAlphaTime = Infinity
        //     state.bestIdleTime = Infinity
        //     state.bestIdleTimeAlpha = 1
        //     state.passiveAlphaTime = 0
        //     state.passiveMasterTime = 0
        // }
        break;
    case "chapterJump":
        switch (action.password) {
            case "F0RMUL45":
                notify.success("CHAPTER 1: FORMULAS")
                break;
            case "51N6L3PR1M3":
                state.mileStoneCount = 3
                state.highestXTier = 1
                notify.success("CHAPTER 2: FIRST DIFFERENTIAL")
                break;
            case "D0UBL3PR1M3":
                state.mileStoneCount = 4
                state.highestXTier = 2
                notify.success("CHAPTER 3: SECOND DIFFERENTIAL")
                break;
            case "7R1PL3PR1M3":
                state.mileStoneCount = 5
                state.highestXTier = 3
                notify.success("CHAPTER 4: THIRD DIFFERENTIAL")
                break;
            case "4LPH470K3N":
                state.alpha = 1
                state.mileStoneCount = 6
                state.progressionLayer = 1
                notify.success("CHAPTER 5: ALPHA")
                break;
            case "D3571NY574R":
                state.destinyStars = 1
                state.mileStoneCount = 12
                state.progressionLayer = 2
                notify.success("POSTGAME: DESTINY")
                break;
            default:
                notify.error("WRONG PASSWORD")
                break;
        }
        break;
    case "memorize":
        state.equipLayouts[state.selectedLayout][state.highestXTier] = structuredClone(state.myFormulas)
        notify.success("Equip Loadout Saved")
        break;
    case "remember":
        rememberLoadout(state,true)
        notify.success("Equip Loadout Loaded")
        break;
    case "selectLoadout":
        state.selectedLayout = action.index || 0
        break;
    case "clearLoadout":
        state.myFormulas = state.myFormulas.filter(formulaName => state.formulaUsed[formulaName])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
        break;
    case "toggleAutoApply":
        if (action.all) {
            //If at least one applier is active deactivate all, otherwise activate all
            if (state.autoApply.some((b,i)=>(b&&i<getInventorySize(state))))
                state.autoApply = [false,false,false,false,false]
            else
                state.autoApply = [true,true,true,true,true]
        } else {
            const checked = state.autoApply[action.index]
            if (!state.alphaUpgrades.SAPP) {
                state.autoApply = [false,false,false,false,false]
            }
            state.autoApply[action.index] = !checked
        }
        break;
    case "enterChallenge":
        performAlphaReset(state)
        state.insideChallenge = true
        state.currentChallenge = action.challenge.id
        state.currentChallengeName = action.challenge.title
        if (action.challenge.subChallenges) {
            state.activeChallenges = action.challenge.subChallenges.reduce((a,v)=>({...a, [v]:true}),{})
        } else {
            state.activeChallenges = {[action.challenge.id]: true}
        }
        performShopReset(state)
        if (!state.clearedChallenges[action.challenge.id])
            state.highestXTier = state.challengeProgress[action.challenge.id] || 0
        rememberLoadout(state)
        state.selectedTabKey = "FormulaScreen"
        break;
    case "exitChallenge":
        performAlphaReset(state)
        performShopReset(state)
        rememberLoadout(state)
        break;
    case "startResearch":
        debugger
        state.researchStartTime[action.research.id] = Date.now()
        state.researchLevel[action.research.id] = Math.min(2500, (state.researchLevel[action.research.id] || 0) + action.bulkAmount)
        state = updateProductionBonus(state)
        state = updateFormulaEfficiency(state)
        break;
    case "upgradeApplierRate":
        state.alpha -= action.cost
        state.autoApplyLevel = action.level
        state.autoApplyRate = action.rate
        break;
    case "upgradeBaseAlpha":
        state.alpha -= action.cost
        state.baseAlphaLevel = action.level
        break;
    case "incrementStone":
        state.startingStoneLevel[action.stone.id] ||= 0
        state.startingStoneLevel[action.stone.id]++
        state.startingStoneX = calcStoneResultForX(state,stoneTable)
        break;
    case "decrementStone":
        state.startingStoneLevel[action.stone.id] ||= 1
        state.startingStoneLevel[action.stone.id]--
        state.startingStoneX = calcStoneResultForX(state,stoneTable)
        break;
    case "changeStoneMode":
        state.startingStoneMode = action.mode
        break;
    case "resetStones":
        state.startingStoneLevel = {}
        state.startingStoneX = calcStoneResultForX(state,stoneTable)
        break;
    case "startEnding":
        state.currentEnding = action.endingName
        break;
    case "completeEnding":
        let isNew = !state.completedEndings[action.endingName]
        state.completedEndings[action.endingName] = true
        performXReset(state)
        state.currentEnding = ""
        if (action.endingName === "world" && state.progressionLayer <= 2) {
            state.progressionLayer = 2
            notify.success("DESTINY", "You finished the game!")
            performAlphaReset(state)
        } else if (action.endingName === "good" || action.endingName === "evil" || action.endingName === "true" || action.endingName === "skipped" || action.endingName === "world") {
            performAlphaReset(state)
        } else { //BadEndings
            if (isNew)
                state.badEndingCount++
            performXReset(state)
        }
        break;
    case "claimFirstStar":
        state.destinyStars = 1
        break;
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}