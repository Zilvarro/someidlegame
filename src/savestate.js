import {milestoneList} from './AchievementScreen' 
import {notify,secondsToHms} from './utilities'
import formulaList from './formulas/FormulaDictionary'
import {shopFormulas} from './formulas/FormulaScreen'
import {isLockedByChallenge} from './formulas/FormulaButton'
import {alphaChallengeDictionary} from './alpha/AlphaChallengeTab'
import {calcStoneResultForX} from './alpha/AlphaStonesTab'
import {startingStones, stoneTable, stoneList} from './alpha/AlphaStoneDictionary'
import * as progresscalculation from './progresscalculation'

export const version = "0.16"
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
    myFormulas: [],
    autoApply: [false,false,false,false,false],
    autoApplyLevel: 0,
    autoApplyRate: 2,
    equipLayouts: [[],[],[],[]],
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
    bestAlphaTime: Infinity,
    bestIdleTime: Infinity,
    bestIdleTimeAlpha: 1,
    passiveAlphaTime: 0,
    passiveMasterTime: 0,
    insideChallenge: false,
    currentChallenge: null,
    currentChallengeName: null,
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
        shopScroll: "ON",
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
        return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), currentEnding: newSave.currentEnding, justLaunched: true}

    }
}

export const getStartingX = (state)=>{
    const fromStartingStones = state.startingStoneX
    const fromResearch = state.researchLevel["x"] >= 2500 ? 30e12 : Math.floor(100*Math.pow(1.01, state.researchLevel["x"] || 0)-100);
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
    state.currentChallenge = null
    state.currentChallengeName = null
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
            }
        }

        if (!state.clearedChallenges[state.currentChallenge])
            notify.success("Challenge Complete", alphaChallengeDictionary[state.currentChallenge].title)

        //General Challenge Stuff
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
    state.xResetCount++
}

const performShopReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.millisSinceCountdown = 0
    state.formulaUsed = {}
    state.anyFormulaUsed = false
    state.formulaBought = {}
    state.formulaUnlocked = {}
    state.myFormulas = []
    state.formulaUnlockCount = 0
    state.xResetCount = 0
    state.inNegativeSpace = false
    state.formulaApplyCount = 0
    state.autoUnlockIndex = 0
    return state
}

const rememberLoadout = (state)=>{
    if (state.alphaUpgrades.AREM && state.settings.autoRemembererActive === "ON") {
        state.myFormulas = state.equipLayouts[state.highestXTier].slice(0,getInventorySize(state))
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
    } else {
        state.myFormulas = []
        state.formulaBought = {}
    }
}

const upgradeXTier = (state)=>{
    state.xHighScores[state.highestXTier] = Math.max(state.xHighScores[state.highestXTier], state.xValue[0])
    state.highestXTier++
    if (state.currentChallenge) {
        state.challengeProgress[state.currentChallenge] = Math.max(state.challengeProgress[state.currentChallenge] || 0,state.highestXTier)
        state = updateFormulaEfficiency(state)
    }
    return state
}

const updateProductionBonus = (state)=>{
    const researchBonus = 1 //getMaxxedResearchBonus(state).bonus (This turned out to be too OP)
    state.productionBonus[0] = researchBonus*(state.researchLevel["x'"] >= 2500 ? 300e9 : Math.pow(1.01, state.researchLevel["x'"] || 0 ))
    state.productionBonus[1] = researchBonus*(state.researchLevel["x''"] >= 2500 ? 300e9 : Math.pow(1.01, state.researchLevel["x''"] || 0))
    state.productionBonus[2] = researchBonus*(state.researchLevel["x'''"] >= 2500 ? 300e9 : Math.pow(1.01, state.researchLevel["x'''"] || 0))
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

    if (clearedFull >= 13) {
        return {
            bonus: 100000,
            full: 13,
            segment: 52,
        }
    } else {
        return {
            bonus:(1 + 0.1 * clearedSegments) * Math.pow(2, clearedFull),
            full: clearedFull,
            segment: clearedSegments,
        }
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
            state.currentAlphaTime += deltaMilliSeconds
            const challengeMultiplier = state.activeChallenges.SLOWPROD ? 0.01 : 1

            //Regular Production
            for(let i=1; i<state.xValue.length; i++) {
                state.xValue[i-1]+= deltaMilliSeconds * state.productionBonus[i-1] *challengeMultiplier * state.idleMultiplier * state.xValue[i] / 1000
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
            state.currentAlphaTime += deltaMilliSeconds
            const xBefore = state.xValue[0]
            state = progresscalculation.applyIdleProgress(state, deltaMilliSeconds)
            const factor = state.xValue[0] / xBefore
            if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
                if (factor && factor !== Infinity && factor > 1.01 ){
                    popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 60000)) + ".\nYour x increased by a factor of " + factor.toFixed(2))
                } else {
                    popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 60000)) + ".")
                }
            }
        } else if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
            popup.alert("You were away for " + secondsToHms(Math.floor(deltaMilliSeconds / 60000)) + ".")
            deltaMilliSeconds = 0 //prevents further progress
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
        let formula = formulaList[shopFormulas[state.autoUnlockIndex]]
        if (state.alphaUpgrades.AUNL  && state.autoUnlockIndex < shopFormulas.length) {
            if (formula.effectLevel <= state.highestXTier && (state.xValue[0] >= formula.unlockCost * formula.unlockMultiplier || formula.isFree)) {
                state.formulaUnlocked[formula.formulaName] = true
                state.formulaUnlockCount++
            }
        }
        
        while (state.autoUnlockIndex < shopFormulas.length && (isLockedByChallenge(state,formula) || state.formulaUnlocked[formula.formulaName] || formula.effectLevel > state.highestXTier)) {
            state.autoUnlockIndex++
            formula = formulaList[shopFormulas[state.autoUnlockIndex]]
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
        if (state.insideChallenge && state.currentAlphaTime > 1800e3) {
            notify.error("Challenge Failed", "30 minute time limit is up")
            performAlphaReset(state)
            performShopReset(state)
            rememberLoadout(state)
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
        if (state.mileStoneCount < 6) {
            state.mileStoneCount = 6
            state.progressionLayer = 1
            state.alpha++
        } else {
            state.alpha = 1
            state.bestAlphaTime = Infinity
            state.bestIdleTime = Infinity
            state.bestIdleTimeAlpha = 1
            state.passiveAlphaTime = 0
            state.passiveMasterTime = 0
        }
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
            case "TR1PL3PR1M3":
                state.mileStoneCount = 5
                state.highestXTier = 3
                notify.success("CHAPTER 4: THIRD DIFFERENTIAL")
                break;
            case "4LPH4T0K3N":
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
        state.equipLayouts[state.highestXTier] = structuredClone(state.myFormulas)
        notify.success("Equip Layout Saved")
        break;
    case "remember":
        rememberLoadout(state)
        notify.success("Equip Layout Loaded")
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
        state.completedEndings[action.endingName] = true
        performXReset(state)
        state.currentEnding = ""
        if (action.endingName === "world" && state.progressionLayer <= 2) {
            state.progressionLayer = 2
            notify.success("DESTINY", "You finished the game!")
            performAlphaReset(state)
        } else if (action.endingName === "good" || action.endingName === "evil" || action.endingName === "true" || action.endingName === "world") {
            performAlphaReset(state)
        } else { //BadEndings
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