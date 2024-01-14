import { Buffer } from "buffer";

import {destinyMileStoneList, milestoneList} from './AchievementScreen' 
import {endingList} from './endings/EndingDictionary'
import {getRewardInterval, notify, secondsToHms, getOfflinePopupLine, stringifyProperly} from './utilities'
import formulaList from './formulas/FormulaDictionary'
import {shopFormulas} from './formulas/FormulaScreen'
import {getUnlockMultiplier, isLockedByChallenge} from './formulas/FormulaButton'
import {calcStoneResultForX} from './alpha/AlphaStonesTab'
import {startingStones, stoneTable, stoneList} from './alpha/AlphaStoneDictionary'
import * as eventsystem from './mails/MailEventSystem'
import * as progresscalculation from './progresscalculation'
import { checkResearch, researchList } from "./alpha/AlphaResearchHelper";
import { autoBuyStarlightUpgrades } from "./destiny/DestinyWelcomeTab";
import { alphaUpgradeDictionary, autoAlphaUpgrades } from "./alpha/AlphaUpgradeDictionary";
import { alphaChallengeDictionary, alphaChallengeTable, calcChallengePower, trivialStartChallenges } from "./alpha/AlphaChallengeTab";
import { getCrystalChargeInfo, getCrystalChargeSpeed, getCrystalEffectUpgradeCost, getCrystalMultiplier, getCrystalSpeedUpgradeCost } from "./world/WorldCrystalTab";
import { worldPerkDeck } from "./world/WorldPerkDictionary";

export const majorversion = "2d"
export const version = "2.01d"
export const productive = false
export var invitation = "efHyDkqGRZ"

export const newSave = {
    version: version,
    productive: productive,
    progressionLayer: 0,
    selectedTabKey: "FormulaScreen",
    selectedAlphaTabKey: "AlphaUpgradeTab",
    selectedWorldTabKey: "WorldPerkTab",
    selectedVoidTabKey: "VoidSkillTab",
    xValue: [0,0,0,0],
    avgXPerSecond: [0,0,0,0],
    xPerSecond: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    xHighScores: [20e3,20e9,20e21,20e33],
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
    autoApplyRate: 10,
    equipLayouts: [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]],
    shopFavorites: [{},{},{},{}], //-1: hidden // 1: favorite // undefined: normal
    selectedLayout: 0,
    anyFormulaUsed: true,
    xResetCount: 0,
    formulaUnlockCount: 0,
    formulaApplyCount: 0,
    alpha: 0,
    essence: 0,
    energy: 0,
    destinyStars: 0,
    starLight: 0,
    lightAdder: 0,
    lightDoubler: 0,
    lightRaiser: 0,
    starConstellations: {},
    constellationCount: 0,
    tickFormula: false,
    idleMultiplier: 1,
    boughtAlpha: [false,false],
    alphaUpgrades: {},
    alphaUpgradesBought: {},
    worldPerks: {},
    worldPerksAvailable: ["NULL","NULL","NULL"],
    perkCardsDrawn: 0,
    canBuyPerk: true,
    noStoneUsed: true,
    noStoneWorldReset: false,
    worldResetEnabled: false,
    autoUnlockIndex: 0,
    saveTimeStamp: 0,
    calcTimeStamp: 0,
    fileStartTimeStamp: -1,
    destinyStartTimeStamp: -1,
    destinyEndTimeStamp: -1,
    destinyRecordMillis: 1e100,
    starlightStartTimeStamp: -1,
    starlightEndTimeStamp: -1,
    starlightRecordMillis: 1e100,
    starLightInfiniteResetCount: 0,
    millisSinceAutoApply: 0,
    millisSinceHoldEvent: 0,
    millisSinceCountdown: 0,
    millisSinceDestinyAuto: 0,
    mileStoneCount: 0,
    destinyMileStoneCount: 0,
    holdAction: null,
    isHolding: false,
    justLaunched: true,
    lastPlayTime: 0,
    currentAlphaTime: 0,
    currentWorldTime: 0,
    isFullyIdle: true,
    bestAlphaTime: 1e100,
    bestWorldTime: 1e100,
    bestIdleTime: 1800e3,
    bestIdleTimeAlpha: 1,
    passiveAlphaTime: 0,
    passiveAlphaInterval: 1e100,
    insideChallenge: false,
    currentChallenge: null,
    currentChallengeName: null,
    currentChallengeTime: 0,
    activeChallenges: {},
    clearedChallenges: {},
    trivialChallengesCleared: false,
    challengeProgress: {},
    researchStartTime: {},
    researchLevel: {},
    startingStoneTurned:{},
    startingStoneLevel:{},
    startingStoneMode:1, //1 Increment, 0 Description, -1 Decrement
    startingStoneX: 0,
    clearedTimewall: false,
    baseAlphaLevel: 0,
    baseEssenceLevel: 0,
    activeCrystals: {},
    crystalMultipliers: {},
    activeCrystalCap: 1,
    chargeCapLevel: 0,
    activeCrystalCount: 0,
    crystalExp: 0,
    crystalEffectLevel: 0,
    crystalSpeedLevel: 0,
    currentEnding: "",
    completedEndings: {},
    allTimeEndings: {},
    badEndingCount: 0,
    infProd: false, //For Hint about avoiding x'''=-Infinity
    passedTime: 0, //For Debugging
    noProdTime: 0, //For Prince Mail
    mailsForCheck: ["Warning"],
    mailsPending: [],
    mailsList: [],
    mailsForTimeout: [],
    mailsUnread: {},
    mailsReceived: {},
    mailsCompleted: {},
    mailsProgress: {},
    mailsUnlocked: {},
    settings: {
        valueReduction: "ON",
        offlineProgress: "ON",
        offlineProgressPopup: "ON",
        xResetPopup: "ON",
        autoSave: "ON",
        autoLoad: "ON",
        headerDisplay: "X",
        numberFormat: "LETTER",
        shopPrices: "ON",
        showHints: "ON",
        hotKeys: "ON",
        shopScroll: "OFF",
        advancedDisplayModes: "OFF",
        challengeTabSwitch: "ON",
        shopFilter: "ALL",
        autoResetterS: "OFF",
        autoResetterA: "OFF",
        alphaThreshold: "MINIMUM",
        autoRemembererActive: "ON",
        shopResetPopup: "ON",
        alphaResetPopup: "ON",
        worldResetPopup: "ON",
        alphaAbortPopup: "DOUBLE",
        memorizePopup: "ON",
        exitChallengePopup: "ON",
        alphaUpgradePopup: "ON",
        hotkeyApplyFormula: "ON",
        hotkeyBasicReset: "OFF",
        hotkeyXReset: "OFF",
        hotkeyAlphaReset: "OFF",
        hotkeyToggleAuto: "OFF",
        hotkeyAbortRun: "OFF",
        hotkeyResearchAll: "OFF",
        hotkeyDiscardPopup: "ON",
    }
}

export const differentialTargets = [20e3,20e9,20e21,Infinity]
export const alphaTarget = 20e33
export const crystalStart = 100
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
    const savedversion = window.localStorage.getItem('majorversion')
    let savedgame
    if (savedversion && window.location.href.split("/").pop() !== "?newgame")
        savedgame = window.localStorage.getItem('idleformulas_v' + majorversion)
    if (!savedgame) {
        return ({...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now(), fileStartTimeStamp: Date.now()})
    }
    else{
        const decodedGame = Buffer.from(savedgame,"base64").toString()
        const savedgamejson = JSON.parse(decodedGame)
        if (savedgamejson.settings.autoLoad === "OFF") {
            notify.warning("Auto Load disabled")
            let newgame = {...structuredClone(newSave), saveTimeStamp: Date.now(), calcTimeStamp: Date.now(), fileStartTimeStamp: Date.now()}
            newgame.settings.autoSave = "OFF"
            newgame.settings.autoLoad = "OFF"
            return newgame
        } else {
            return {...structuredClone(newSave), ...savedgamejson, settings:{...structuredClone(newSave.settings), ...savedgamejson.settings}, saveTimeStamp: Date.now(), currentEnding: newSave.currentEnding, justLaunched: true}
        }
    }
}

export const loadGame = ()=>{
    const savedversion = window.localStorage.getItem('majorversion')
    let savedgame
    if (savedversion)
        savedgame = window.localStorage.getItem('idleformulas_v' + majorversion)

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
    const crystalBonus = getCrystalMultiplier(state,"X")
    if (state.activeChallenges.TRUEBETA) return 0
    const fromStartingStones = Math.max(state.startingStoneX, 1)
    const fromResearch = Math.floor(100*Math.pow(1.01, state.researchLevel["x"] || 0)-100);
    const startx = fromStartingStones * fromResearch * crystalBonus
    return state.activeChallenges.EVILROOT ? Math.sqrt(startx) : startx
}

export const getInventorySize = (state)=>{
    if (state.activeChallenges.SMALLINV)
        return 1
    else {
      const alphaslot = state.alphaUpgrades.SLOT ? 1 : 0
      const worldslot = state.worldPerks.WSLO ? 1 : 0
      return 3 + alphaslot + worldslot
    }
}

export const getGlobalMultiplier = (state)=>{
    return state.idleMultiplier * (state.destinyStars || 1)
}

export const save = (state)=>{
    state.version = version
    state.saveTimeStamp = Date.now()
    let currentgame = stringifyProperly({...state, holdAction:null})
    const encodedGame = Buffer.from(currentgame).toString("base64");
    // window.localStorage.setItem('majorversion', majorversion)
    window.localStorage.setItem('idleformulas_v' + majorversion, encodedGame)
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
    state.isFullyIdle = true
    state.activeChallenges = {}
    state.alphaUpgrades = {...state.alphaUpgradesBought}
    return state
}

const performWorldReset = (state)=>{
  if (state.noStoneUsed)
    state.noStoneWorldReset = true
  state.bestWorldTime = Math.min(state.bestWorldTime, state.currentWorldTime)
  state.essence++
  
  state.currentWorldTime = 0
  state.alpha = 0
  state.alphaUpgrades = {}
  state.alphaUpgradesBought = {}
  state.researchStartTime = {}
  state.researchLevel = {}
  state.startingStoneTurned = {}
  state.startingStoneLevel = {}
  state.trivialChallengesCleared = false
  state.xHighScores = newSave.xHighScores.slice()
  state.formulaGodScores = newSave.formulaGodScores.slice()
  state.canBuyPerk = true
  state.noStoneUsed = true
  state.worldResetEnabled = false

  state.bestAlphaTime = 1e100
  state.bestIdleTime = 1800e3
  state.bestIdleTimeAlpha = 1
  state.passiveAlphaTime = 0
  state.passiveAlphaInterval = 1e100
  state.insideChallenge = false
  state.currentChallenge = null
  state.currentChallengeName = null
  state.currentChallengeTime = 0
  state.activeChallenges = {}
  state.clearedChallenges = {}
  state.trivialChallengesCleared = false
  state.challengeProgress = {}
  state.researchStartTime = {}
  state.researchLevel = {}
  state.startingStoneTurned = {}
  state.startingStoneLevel = {}
  state.startingStoneX = 0
  state.clearedTimewall = false
  state.baseAlphaLevel = 0

  performAlphaReset(state)
  performShopReset(state)
  state = updateProductionBonus(state)
  state = updateFormulaEfficiency(state)
  return state
}

const giveAlphaRewards = (state)=>{
    if (state.xValue[0] < alphaTarget || state.inNegativeSpace) {return state} //No rewards

    //Initial Unlock of the Layer
    if (state.progressionLayer <= 0) {
        state.alpha = 1
        state.progressionLayer = 1
        state.mailsForCheck.push("Welcome")
        notify.success("ALPHA", "New Layer Unlocked!")
        return state
    }
    
    const alphaReward = getAlphaRewardTier(state.xValue[0]).alpha * Math.pow(2,state.baseAlphaLevel)
    if (state.currentChallenge) {
        //General Challenge Stuff
        if (!state.clearedChallenges[state.currentChallenge])
            notify.success("Challenge Complete", state.currentChallengeName)
        state.challengeProgress[state.currentChallenge] = 4
        state.clearedChallenges[state.currentChallenge] = true
        state.activeChallenges = {}
        state.insideChallenge = false
        state.currentChallenge = null
        state.currentChallengeName = null
        if (state.settings.challengeTabSwitch === "ON") {
            state.selectedTabKey = "AlphaScreen"
            state.selectedAlphaTabKey = "AlphaChallengeTab"
        }
        state = updateFormulaEfficiency(state)
    } else {

        //Autoclear for Master of Idle Challenge
        if (state.worldPerks.ACHA && state.isFullyIdle) {
          state.clearedChallenges.FULLYIDLE = true
          state.challengeProgress.FULLYIDLE = 4
        }

        //Passive Alpha from Master of Idle
        if (state.isFullyIdle && state.clearedChallenges.FULLYIDLE) {
            const newRewardInterval = getRewardInterval(alphaReward, state.currentAlphaTime, getGlobalMultiplier(state))
            const oldMOIRewardInterval = getRewardInterval(state.bestIdleTimeAlpha, state.bestIdleTime, getGlobalMultiplier(state))
            if (newRewardInterval < state.passiveAlphaInterval || newRewardInterval < oldMOIRewardInterval) {
                state.passiveAlphaInterval = Math.min(state.passiveAlphaInterval, newRewardInterval)
                state.passiveAlphaTime = Math.min(state.passiveAlphaTime, newRewardInterval)
                state.bestIdleTimeAlpha = alphaReward
                state.bestIdleTime = Math.max(1000, state.currentAlphaTime)
            }
        }

        state.alpha += alphaReward
        state.bestAlphaTime = Math.max(1000,Math.min(state.currentAlphaTime, state.bestAlphaTime))
        state.passiveAlphaTime = Math.min(state.passiveAlphaTime, state.bestAlphaTime)
        state.passiveAlphaInterval = Math.min(state.passiveAlphaInterval, getRewardInterval(1, state.bestAlphaTime, getGlobalMultiplier(state)))
        state.xHighScores[state.highestXTier] = Math.max(state.xHighScores[state.highestXTier], state.xValue[0])
        if ((state.xValue[0] >= 1e110 && state.alpha >= 4e9))
            state.clearedTimewall = true
    }
    return state
}

const performXReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.avgXPerSecond = [0,0,0,0]
    state.xPerSecond = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    state.millisSinceCountdown = 0
    state.formulaUsed = {}
    state.autoApply = [false,false,false,false,false]
    state.anyFormulaUsed = false
    state.inNegativeSpace = false
    state.decreaseCooldown = false
    state.xResetCount++
}

const performShopReset = (state)=>{
    state.xValue = [getStartingX(state),0,0,0]
    state.avgXPerSecond = [0,0,0,0]
    state.xPerSecond = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
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
    if (state.inNegativeSpace) return

    if (state.progressionLayer !== 0)
        state.xHighScores[state.highestXTier] = Math.max(state.xHighScores[state.highestXTier], state.xValue[0])
    state.highestXTier++
    if (state.currentChallenge) {
        if (!state.clearedChallenges[state.currentChallenge])
            notify.success("Segment Complete", state.currentChallengeName)
        state.challengeProgress[state.currentChallenge] = Math.max(state.challengeProgress[state.currentChallenge] || 0,state.highestXTier)
        state = updateFormulaEfficiency(state)
    }

    //Autoclear master of idle segments
    if (state.worldPerks.ACHA && state.isFullyIdle) {
      state.challengeProgress.FULLYIDLE = Math.max(state.challengeProgress.FULLYIDLE || 0, state.highestXTier)
    }

    //Autoclear trivial challenge segments
    if (state.worldPerks.ACHA && !state.trivialChallengesCleared && state.highestXTier === 1) {
      trivialStartChallenges.forEach(challenge => {
        state.challengeProgress[challenge] ||= 1
      });
      state.trivialChallengesCleared = true
      state = updateFormulaEfficiency(state)
    }
    return state
}

const updateProductionBonus = (state)=>{
    const crystalBonus = getCrystalMultiplier(state,"P")
    if (state.activeChallenges.TRUEBETA){
      state.productionBonus = [crystalBonus,crystalBonus,crystalBonus,crystalBonus]
      return state
    }
    state.productionBonus[0] = Math.pow(1.01, state.researchLevel["x'"] || 0 )*crystalBonus
    state.productionBonus[1] = Math.pow(1.01, state.researchLevel["x''"] || 0)*crystalBonus
    state.productionBonus[2] = Math.pow(1.01, state.researchLevel["x'''"] || 0)*crystalBonus
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
        bonus:(1 + 0.15 * clearedSegments) * Math.pow(2, clearedFull),
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
    const crystalBonus = getCrystalMultiplier(state,"E")
    if (state.activeChallenges.TRUEBETA){
      state.formulaEfficiency = [crystalBonus,crystalBonus,crystalBonus,crystalBonus]
      return state
    }
    const challengeBonus = getChallengeBonus(state).bonus
    const researchBonus = getMaxxedResearchBonus(state).bonus
    state.formulaEfficiency = [challengeBonus * researchBonus * crystalBonus,challengeBonus * researchBonus * crystalBonus,challengeBonus * researchBonus* crystalBonus,challengeBonus * researchBonus * crystalBonus]
    return state
}

const researchAll = (state)=>{
  let totalGains = 0
    for (const researchName of researchList) {
        const researchInfo = checkResearch(state,researchName)
        if (!researchInfo.isBlocked && researchInfo.isDone) {
            const previousLevel = state.researchLevel[researchName]
            state.researchStartTime[researchName] = Date.now()
            state.researchLevel[researchName] = Math.min(2500, (state.researchLevel[researchName] || 0) + researchInfo.bulkAmount)
            totalGains += state.researchLevel[researchName] - previousLevel
        }
    }
    state = updateProductionBonus(state)
    state = updateFormulaEfficiency(state)
  return totalGains
}

// eslint-disable-next-line no-unused-vars
const startDestinyLayer = (state)=>{
  state.progressionLayer = 4
  state.destinyEndTimeStamp = Date.now()
  if (state.destinyStartTimeStamp > 0)
      state.destinyRecordMillis = Math.min(state.destinyRecordMillis, state.destinyEndTimeStamp - state.destinyStartTimeStamp)
  state.mailsForCheck.push("Destiny")
  notify.success("DESTINY", "You finished the game!")
  performAlphaReset(state)
  performShopReset(state)
}

export const saveReducer = (state, action)=>{
    const popup = action.popup
    switch(action.name){
    case "idle":
        if (action.playTime === state.lastPlayTime) break

        state.productive = state.productive && productive

        state.lastPlayTime = action.playTime
        const timeStamp = Date.now()
        let deltaMilliSeconds = Math.max(timeStamp - state.calcTimeStamp, 0)
        state.currentWorldTime += deltaMilliSeconds

        const xValuesBefore = state.xValue.map(x=>x)

        const xBefore = state.xValue[0]
        const aBefore = state.alpha
        const sBefore = state.starLight

        //Makes sure that playtime only starts counting after player did something
        if (xBefore > 0 && state.destinyStartTimeStamp === -1)
          state.destinyStartTimeStamp = Date.now()

        if (state.noProdTime > 0) {
            state.noProdTime -= deltaMilliSeconds
            deltaMilliSeconds = 0
        }

        if (state.xValue[0] === -Infinity) {
            state.currentEnding = "negative"
            performXReset(state)
        } else if (state.xValue[0]<=-1||state.xValue[1]<=-1||state.xValue[2]<=-1||state.xValue[3]<=-1) {
            state.inNegativeSpace = true
        }
        
        if (deltaMilliSeconds < 120000) { //Quick Computation
            if (state.insideChallenge || state.anyFormulaUsed || state.xResetCount || state.highestXTier > 0)
                state.currentAlphaTime += deltaMilliSeconds
            state.currentChallengeTime += deltaMilliSeconds
            const challengeMultiplier = state.activeChallenges.SLOWPROD ? 0.01 : 1

            //Regular Production
            for(let i=1; i<state.xValue.length; i++) {
                //Close to 0 does not produce
                if (Math.abs(state.xValue[i]) >= 0.5) {
                    const prodPerSecond = state.productionBonus[i-1] *challengeMultiplier * getGlobalMultiplier(state) * state.xValue[i]
                    state.xValue[i-1]+= (state.activeChallenges.EVILROOT ? Math.sqrt(prodPerSecond) : prodPerSecond) * deltaMilliSeconds / 1000
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
            state = progresscalculation.applyIdleProgress(state, deltaMilliSeconds)
        } else if (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched)){
            //Nothing done anymore
        }

        //Apply Mouse Hold / Touch Hold events
        let recoverHold = false
        let recoverValue = 0
        let recoverTier = 0
        if (state.holdAction?.type === "ApplyFormula"){
            if (state.holdAction.temp > 0)
                state.holdAction.temp--
            if(state.holdAction.delay > 0) {
                state.holdAction.delay--
            } else if (state.millisSinceHoldEvent + deltaMilliSeconds >= 80){
                state.millisSinceHoldEvent += deltaMilliSeconds
                const formula = formulaList[state.holdAction.formulaName]
                let xBeforeHold = state.xValue[formula.targetLevel]
                const isApplied = progresscalculation.applyFormulaToState(state, formula, false, false, true)
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

                state.millisSinceHoldEvent = Math.min(100, state.millisSinceHoldEvent - 100) //Buffer up to 100 ms
            } else {
                state.millisSinceHoldEvent += deltaMilliSeconds
            }

            if (state.holdAction?.temp === 0)
                state.holdAction = null
        }

        //Auto Appliers
        state.millisSinceAutoApply += deltaMilliSeconds
        if (state.alphaUpgrades.AAPP && state.millisSinceAutoApply > 800 / state.autoApplyRate){
            for (let i = 0; i<5; i++) {
                if (state.autoApply[i] && state.myFormulas.length > i) {
                    progresscalculation.applyFormulaToState(state,formulaList[state.myFormulas[i]],false, true, true)
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
            state.currentEnding = "timeout"
            performAlphaReset(state)
            performShopReset(state)
            rememberLoadout(state)
        }

        //Check if next milestone is reached
        if (milestoneList[state.mileStoneCount]?.check(state)){
            notify.success("New Milestone", milestoneList[state.mileStoneCount].name)
            state.mileStoneCount++
        }

        //Check if next destiny milestone is reached
        if (destinyMileStoneList[state.destinyMileStoneCount]?.check(state)){
            notify.success("New Milestone", destinyMileStoneList[state.destinyMileStoneCount].name)
            state.destinyMileStoneCount++
        }

        //Check if new starting stones are turned
        stoneList.forEach(stoneName => {
            if (!state.startingStoneTurned[stoneName] && startingStones[stoneName]?.check(state)){
                notify.success("Starting Stone Turned", startingStones[stoneName].title)
                state.startingStoneTurned[stoneName] = true
            }
        });

        //Check and receive new Mails
        eventsystem.checkNewMails(state)
        if (eventsystem.updatePendingMails(state)) {
            notify.warning("New Mail Received")
        }
        eventsystem.checkTimeouts(state)

        //Kick out formulas that do not exist anymore (due to update etc)
        if (state.justLaunched) {
            state.myFormulas = state.myFormulas.filter(formulaName => formulaList[formulaName]);
            state.holdAction = null
        }
        //Kick out formulas beyond inventory size
        if (state.myFormulas.length > getInventorySize(state)) {
            state.myFormulas = state.myFormulas.slice(0, getInventorySize(state))
        }

        state.calcTimeStamp = timeStamp
        state.justLaunched = false
        state.tickFormula=false

        //Auto Unlocker
        let formula
        for (; state.autoUnlockIndex < shopFormulas.length; state.autoUnlockIndex++) {
            formula = formulaList[shopFormulas[state.autoUnlockIndex]]

            //Unlock not possible/necessary
            if (isLockedByChallenge(state,formula) || state.formulaUnlocked[formula.formulaName] || formula.effectLevel > state.highestXTier || formula.targetLevel > state.highestXTier)
                continue

            //Not enough x for unlock (future formulas are even more expensive)
            if (state.xValue[0] < formula.unlockCost * getUnlockMultiplier(formula,state) && !formula.isFree)
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
            const crystalBonus = getCrystalMultiplier(state,"A")
            state.passiveAlphaTime += deltaMilliSeconds * crystalBonus
            if (state.passiveAlphaTime >= Math.min(state.passiveAlphaInterval, 1000*3600*24)) {
                state.alpha += Math.floor(state.passiveAlphaTime / state.passiveAlphaInterval)
                state.passiveAlphaTime %= state.passiveAlphaInterval
            }
        }   

        //Charges for Crystals
        if (state.mailsCompleted["Crystals"] !== undefined) {
          const speed = getCrystalChargeSpeed(state)
          state.crystalExp += deltaMilliSeconds * speed
        }

        //Auto Resetters
        const alphaThreshold = alphaThresholds[state.settings.alphaThreshold] || alphaTarget

        if (!state.inNegativeSpace && state.settings.autoResetterA !== "OFF" && state.alphaUpgrades.ARES && state.highestXTier === 3 && (state.xValue[0] >= alphaThreshold || (state.insideChallenge && state.xValue[0] >= alphaTarget))) {
            giveAlphaRewards(state)
            performAlphaReset(state)
            performShopReset(state)
            rememberLoadout(state)
        } else if (!state.inNegativeSpace && state.highestXTier < 3 && state.settings.autoResetterS !== "OFF" && state.alphaUpgrades.SRES && state.xValue[0] >= differentialTargets[state.highestXTier]) {
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

        //Generate Starlight for Destiny Layer
        progresscalculation.generateStarLight(state, deltaMilliSeconds)
        if (state.starlightStartTimeStamp > 0 && state.starlightEndTimeStamp < 0 && state.starLight === Infinity){
            state.starlightEndTimeStamp = Date.now()
            state.starlightRecordMillis = Math.min(state.starlightRecordMillis, state.starlightEndTimeStamp - state.starlightStartTimeStamp)
        }

        //Destiny Automation
        state.millisSinceDestinyAuto += deltaMilliSeconds
        if (state.millisSinceDestinyAuto > 100) {
            autoBuyStarlightUpgrades(state)
            state.millisSinceDestinyAuto = Math.min(state.millisSinceDestinyAuto - 100, 100)
        }

        //Estimate x per Second
        if (state.progressionLayer > 0 || state.destinyStars > 1) {
            let perSecond = [0,0,0,0]
            for(let i = 0; i < state.xValue.length; i++) {
                perSecond[i] = deltaMilliSeconds ? (state.xValue[i] - xValuesBefore[i]) / (deltaMilliSeconds / 1000) : 0
                perSecond[i] = perSecond[i] || 0
            }
            state.xPerSecond.splice(0,1)
            state.xPerSecond.push(perSecond)
            for(let i = 0; i < state.xValue.length; i++) {
                let history = state.xPerSecond.map((elem)=>elem[i])
                history.sort((a,b)=>(a - b))
                const newAvg = (history[2] + history[3] + history[4] + history[5] + history[6] + history[7]) / 6
                state.avgXPerSecond[i] = (newAvg > state.avgXPerSecond[i] || newAvg < 0.9 * state.avgXPerSecond[i]) ? newAvg : state.avgXPerSecond[i]
                state.avgXPerSecond[i] = state.avgXPerSecond[i] || 0
            }
        }

        //Offline Progress Popup
        if (deltaMilliSeconds > 120000 && (state.settings.offlineProgressPopup === "ON" || (state.settings.offlineProgressPopup === "LAUNCH" && state.justLaunched))){
            const timeText = <>You were away for {secondsToHms(Math.floor(deltaMilliSeconds / 1000))}</>
            const xText = state.insideChallenge ? <></> : getOfflinePopupLine(<>x</>, xBefore, state.xValue[0], state.settings.numberFormat)
            const aText = getOfflinePopupLine(<>&alpha;</>, aBefore, state.alpha, state.settings.numberFormat)
            const sText = getOfflinePopupLine(<>&lambda;</>, sBefore, state.starLight, state.settings.numberFormat)
            popup.alert(<>{timeText}{xText}{aText}{sText}</>)
        }

        //Autosave
        const lastSaveMilliseconds = (timeStamp - state.saveTimeStamp)
        if (state.mileStoneCount > 0 && state.settings.autoSave === "ON" && lastSaveMilliseconds >= 10000) {
            save(state)
        }

        if (state.xValue[3] === -Infinity)
            state.infProd = true //Triggers mail with hint if world formula not found within 90 minutes

        //Failsafe NaN
        if (!state.currentEnding && (isNaN(state.xValue[0]) || isNaN(state.xValue[1]) || isNaN(state.xValue[2]) || isNaN(state.xValue[3])))
        {
            performXReset(state)
            state.currentEnding = "infinite"
        }

        //Auto Upgrader
        if (state.worldPerks.AUPG){
          autoAlphaUpgrades.forEach((upgradeName)=>{
            const upgrade = alphaUpgradeDictionary[upgradeName]
            if(state.alpha >= upgrade.cost){
              state.alphaUpgradesBought[upgrade.id] = true
              if (!state.activeChallenges.TRUEBETA)
                 state.alphaUpgrades[upgrade.id] = true
              if (!state.worldPerks.ALPR)
                state.alpha -= upgrade.cost
            }
          })

          const baseAlphaMaxLevel = 12
          while (state.baseAlphaLevel < baseAlphaMaxLevel && state.alpha >= Math.pow(5,state.baseAlphaLevel + 1)) {
            state.baseAlphaLevel++
            if (!state.worldPerks.ALPR)
              state.alpha -= action.cost
          }
        }

        //Auto Challenger (TODO: Account for Advanced Challenges and Formula Efficiency)
        if (state.worldPerks.ACHA) {
          const challengeInfo = calcChallengePower(state)

          //Complete Challenges
          alphaChallengeTable.forEach((challengeId)=>{
            if (alphaChallengeDictionary[challengeId].isEasy)
              state.challengeProgress[challengeId] = Math.max(state.challengeProgress[challengeId] || 0, challengeInfo.easyclears)
            else if (!alphaChallengeDictionary[challengeId].advanced)
              state.challengeProgress[challengeId] = Math.max(state.challengeProgress[challengeId] || 0, challengeInfo.hardclears)

            if (state.challengeProgress[challengeId] === 4)
              state.clearedChallenges[challengeId] = true
          })

          //Update Formula God Highscores (Regular Highscores are not really Challenge Helper's business)
          for (let i=0; i<4; i++) {
            //if (challengeInfo.easypower[i] > state.xHighscores[i]) state.xHighscores[i] = challengeInfo.easypower[i]
            if (challengeInfo.hardclears >= i && challengeInfo.differentials[i] > state.formulaGodScores[i]) state.formulaGodScores[i] = challengeInfo.differentials[i]
          }
        }

        //Check for World Reset
        if (state.xValue[3] === Infinity)
          state.worldResetEnabled = true

        //Auto Researcher
        if (state.worldPerks.AURS)
          researchAll(state)

        break;
    case "selectTab":
        state.selectedTabKey = action.tabKey
        break;
    case "selectAlphaTab":
        state.selectedAlphaTabKey = action.tabKey
        break;
    case "selectWorldTab":
        state.selectedWorldTabKey = action.tabKey
        break;
    case "selectVoidTab":
        state.selectedVoidTabKey = action.tabKey
        break;
    case "hardreset":
        state = {...structuredClone(newSave), calcTimeStamp: Date.now(), saveTimeStamp: Date.now(), fileStartTimeStamp: Date.now()};
        break;
    case "load":
        state = action.state || loadGame() || state;
        break;
    case "changeSetting":
        state.settings[action.settingName] = action.nextStatus
        break;
    case "changeHold":
        if (state.activeChallenges.FULLYIDLE) break
        state.isFullyIdle = false
        state.holdAction = action.newValue
        state.isHolding = !!state.holdAction
        break;
    case "swapFormulas":
        state.isFullyIdle = false
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
        if (state.activeChallenges.FULLYIDLE || !state.formulaUnlocked[action.formula.formulaName]) break
        state.isFullyIdle = false
        if (!state.tickFormula && !state.isHolding) {
            progresscalculation.applyFormulaToState(state, action.formula, action.forceApply)
            state.tickFormula = true
        }
        break;
    case "unlockFormula":
        state.isFullyIdle = false
        const unlockCost = action.formula.isFree ? 0 : action.formula.unlockCost * action.formula.unlockMultiplier
        if (unlockCost > state.xValue[0] || state.formulaUnlocked[action.formula.formulaName])
            break
        if (!state.alphaUpgrades.AUNL)
            state.xValue[0] -= unlockCost
        state.formulaUnlocked[action.formula.formulaName] = true
        state.formulaUnlockCount++
        break;
    case "getFormula":
        state.isFullyIdle = false
        state.formulaBought[action.formula.formulaName] = true
        state.myFormulas.push(action.formula.formulaName)
        break;
    case "discardFormula":
        state.isFullyIdle = false
        state.formulaBought[action.formula.formulaName] = false
        state.myFormulas = state.myFormulas.filter(formulaName => formulaName !== action.formula.formulaName)
        break;
    case "resetXValues":
        if (state.progressionLayer === 0 && state.highestXTier === 0 && state.formulaUnlockCount < 4) break
        if (state.activeChallenges.FULLYIDLE || state.activeChallenges.ONESHOT || !state.anyFormulaUsed) break
        state.isFullyIdle = false
        performXReset(state)
        break;
    case "upgradeXTier":
        if (state.inNegativeSpace || state.activeChallenges.FULLYIDLE || state.highestXTier >= 3 || state.xValue[0] < differentialTargets[state.highestXTier]) break
        state.isFullyIdle = false
        upgradeXTier(state)
        performShopReset(state)
        rememberLoadout(state)
        break;
    case "alphaReset":
        if (state.activeChallenges.FULLYIDLE) break
        if ((state.highestXTier < 3 || state.xValue[0] < alphaTarget || state.inNegativeSpace) && !action.isAbort) break

        state.isFullyIdle = false
        if (action.isAbort && !state.insideChallenge) {
            state.settings.autoResetterS = "OFF"
            state.settings.autoResetterA = "OFF"
            state.autoApply = [false,false,false,false,false]
        }

        if (!action.isAbort)
            giveAlphaRewards(state)

        performAlphaReset(state)
        performShopReset(state)
        rememberLoadout(state)
        break;
    case "worldReset":
      performWorldReset(state)
      break;
    case "getAlpha":
      state.alpha += action.reward
      break;
    case "alphaUpgrade":
        if (state.alpha >= action.upgrade.cost) {
            if (!state.worldPerks.ALPR)
              state.alpha-=action.upgrade.cost
            state.alphaUpgradesBought[action.upgrade.id] = true
            if (!state.activeChallenges.TRUEBETA)
              state.alphaUpgrades[action.upgrade.id] = true
        }
        break;
    case "worldPerk":
        if (state.essence >= action.upgrade.cost && state.canBuyPerk) {
          state.worldPerks[action.upgrade.id] = true
          state.canBuyPerk = false
        }
        break;
    case "drawPerkCard":
        const index = state.worldPerksAvailable.indexOf("NULL");
        const newPerk = worldPerkDeck.find((perkId)=>{
          return !state.worldPerks[perkId] && !state.worldPerksAvailable.includes(perkId)
        })
        if (index !== -1 && newPerk) {
          state.perkCardsDrawn++
          state.worldPerksAvailable[index] = newPerk;
        }
        break;
    case "addToCollection":
        const perk = state.worldPerksAvailable[action.index];
        if (state.worldPerks[perk]) {
          state.worldPerksAvailable[action.index] = "NULL"
        }
        break;
    case "cheat":
        if (productive) break
        state.currentEnding = "true"
        break;
    case "chapterJump":
        switch (action.password) { 
            case "F0RMUL45":
                notify.success("CHAPTER 1: FORMULAS")
                break;
            case "51N6L3PR1M3":
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 3
                state.highestXTier = 1
                notify.success("CHAPTER 2: FIRST DIFFERENTIAL")
                break;
            case "D0UBL3PR1M3":
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 4
                state.highestXTier = 2
                notify.success("CHAPTER 3: SECOND DIFFERENTIAL")
                break;
            case "7R1PL3PR1M3":
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 5
                state.highestXTier = 3
                notify.success("CHAPTER 4: THIRD DIFFERENTIAL")
                break;
            case "4LPH470K3N":
                state.alpha = 1
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 6
                state.progressionLayer = 1
                state.mailsForCheck = ["Welcome"]
                state.mailsCompleted["Favorites"] = 0 //Unlocks Shop Filters
                notify.success("CHAPTER 5: ALPHA")
                break;
            case "world":
                case "":
                state.essence = 1
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 12
                state.progressionLayer = 2
                state.mailsForCheck = ["World"]
                state.mailsCompleted["Favorites"] = 0 //Unlocks Shop Filters
                state.mailsCompleted["Research"] = 0 
                state.mailsCompleted["Challenges"] = 0 
                state.mailsCompleted["Stones"] = 0 
                notify.success("CHAPTER 6: WORLD")
                break;
            case "void":
                state.energy = 1
                state.destinyStartTimeStamp = -2
                state.mileStoneCount = 18
                state.progressionLayer = 3
                state.mailsForCheck = ["Welcome"]
                state.mailsCompleted["Favorites"] = 0 //Unlocks Shop Filters
                state.mailsCompleted["Perks"] = 0 
                state.mailsCompleted["Crystals"] = 0 
                state.mailsCompleted["Rituals"] = 0 
                notify.success("CHAPTER 7: VOID")
                break;
            case "destiny":
                state.destinyStars = 1
                state.progressionLayer = 4
                state.mileStoneCount = 24
                state.mailsForCheck = ["World"]
                state.mailsCompleted["Crystals"] = 0 
                state.mailsCompleted["Rituals"] = 0 
                state.mailsCompleted["Favorites"] = 0 
                state.mailsCompleted["Research"] = 0 
                state.mailsCompleted["Challenges"] = 0 
                state.mailsCompleted["Stones"] = 0 
                notify.success("ENDGAME: DESTINY")
                break;
            case "D3571NY574R":
                state.destinyStartTimeStamp = -1
                state.destinyStars = 2
                state.mileStoneCount = 12
                state.progressionLayer = 0
                state.mailsForCheck.push("Destiny")
                notify.success("POSTGAME: DESTINY")
                break;
            case "DEVTEST":
                if (productive) break
                state.destinyStartTimeStamp = -2
                state.destinyStars = 90
                state.mileStoneCount = 12
                state.progressionLayer = 0
                state.constellationCount = 10
                state.mailsForCheck.push("Destiny")
                notify.success("DEVTEST")
                break;
            default:
                notify.error("WRONG PASSWORD")
                break;
        }
        break;
    case "memorize":
        state.isFullyIdle = false
        state.equipLayouts[state.selectedLayout][state.highestXTier] = structuredClone(state.myFormulas)
        notify.success("Equip Loadout Saved")
        break;
    case "remember":
        state.isFullyIdle = false
        rememberLoadout(state,true)
        notify.success("Equip Loadout Loaded")
        break;
    case "selectLoadout":
        state.isFullyIdle = false
        state.selectedLayout = action.index || 0
        break;
    case "clearLoadout":
        state.isFullyIdle = false
        state.myFormulas = state.myFormulas.filter(formulaName => state.formulaUsed[formulaName])
        state.formulaBought = state.myFormulas.reduce((a,v)=>({...a, [v]:true}),{})
        break;
    case "toggleAutoApply":
        if (state.activeChallenges.FULLYIDLE) break
        state.isFullyIdle = false
        if (action.all) {
            if (!state.alphaUpgrades.SAPP) break
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
    case "changeFavorite":
        if (!state.shopFavorites[action.tier][action.formulaName])
            state.shopFavorites[action.tier][action.formulaName] = 1 //FAVORITE
        else if (state.shopFavorites[action.tier][action.formulaName] > 0)
            state.shopFavorites[action.tier][action.formulaName] = -1 //HIDDEN
        else
            delete state.shopFavorites[action.tier][action.formulaName] //NORMAL
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
        if (state.settings.challengeTabSwitch === "ON") {
            state.selectedTabKey = "FormulaScreen"
        }
        if (action.challenge.id === "TRUEBETA")
          state.alphaUpgrades = {}
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
    case "researchAll":
        const totalGains = researchAll(state)
        if(action.showNotification && totalGains === 1)
            notify.success("Research Successful", "1 Research Level Gained")
        else if(action.showNotification && totalGains > 1)
            notify.success("Research Successful", totalGains.toFixed(0) + " Research Levels Gained")
        break;
    case "upgradeBaseAlpha":
        const baseAlphaUpgradeCost = Math.pow(5,state.baseAlphaLevel + 1)
        if (state.alpha < baseAlphaUpgradeCost) break
        state.alpha -= baseAlphaUpgradeCost
        state.baseAlphaLevel++
        break;
    case "upgradeBaseEssence":
        const baseEssenceUpgradeCost = Math.pow(8,state.baseEssenceLevel + 1)
        if (state.essence < baseEssenceUpgradeCost) break
        state.essence -= baseEssenceUpgradeCost
        state.baseEssenceLevel++
        break;
    case "incrementStone":
        state.noStoneUsed = false
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
        state.allTimeEndings[action.endingName] = true
        let isNew = !state.completedEndings[action.endingName]
        state.completedEndings[action.endingName] = true
        performXReset(state)
        if (isNew && action.endingName !== "world" && endingList[action.endingName]?.titlestring)
            notify.success("Ending Completed", endingList[action.endingName].titlestring)
        state.currentEnding = ""
        if (action.endingName === "world" && state.progressionLayer < 2) {
            state.progressionLayer = 2
            performWorldReset(state)
        } else if (action.endingName === "good" || action.endingName === "evil" || action.endingName === "true" || action.endingName === "skipped" || action.endingName === "world") {
            performAlphaReset(state)
            performShopReset(state)
        } else { //BadEndings
            if (isNew)
                state.badEndingCount++
            performXReset(state)
        }
        break;
    case "claimFirstStar":
        state.destinyStars = Math.max(state.destinyStars, 1)
        break;
    case "performDestinyReset":
        state.destinyStars += 1
        state = {...structuredClone(newSave), calcTimeStamp: Date.now(), saveTimeStamp: Date.now(), settings:state.settings, shopFavorites:state.shopFavorites, mileStoneCount:state.mileStoneCount, destinyMileStoneCount:state.destinyMileStoneCount, allTimeEndings:state.allTimeEndings,
            destinyStars:state.destinyStars, starLight:state.starLight, lightAdder:state.lightAdder, lightDoubler:state.lightDoubler, lightRaiser:state.lightRaiser, starConstellations:state.starConstellations, constellationCount:state.constellationCount, destinyRecordMillis:state.destinyRecordMillis, fileStartTimeStamp:state.fileStartTimeStamp, destinyStartTimeStamp: -1,
            starlightStartTimeStamp: state.starlightStartTimeStamp, starlightEndTimeStamp:state.starlightEndTimeStamp, starlightRecordMillis:state.starlightRecordMillis, starLightInfiniteResetCount:state.starLightInfiniteResetCount};
        state.settings.autoResetterS = "OFF"
        state.settings.autoResetterA = "OFF"
        state.settings.alphaThreshold = "MINIMUM"
        state.settings.autoRemembererActive = "ON"
        state.mailsForCheck.push("Destiny")
        break;
    case "buyLightUpgrade":
        state[action.currency] += 1
        if (action.cost < Infinity)
            state.starLight -= action.cost
            
        break;
    case "completeConstellation":
        if (action.constellation) {
            state.constellationCount += 1
            state.starConstellations[action.constellation.id] = true
        } else if (state.starLight === Infinity) {
            state.starLightInfiniteResetCount++
        }
        state.starLight = 0
        state.lightAdder = 0
        state.lightDoubler = 0
        state.lightRaiser = 0
        state.starlightStartTimeStamp = Date.now()
        state.starlightEndTimeStamp = -1
        break;
    case "passTime":
        state.passedTime += action.time
        progresscalculation.generateStarLight(state,action.time)
        break;
    case "markAsRead":
        eventsystem.markAsRead(state, action.mailid)
        break;
    case "progressMail":
        eventsystem.progressMail(state, action.mailid, action.path, action.subpath, action.value)
        break;
    case "completeMail":
        eventsystem.completeMail(state, action.mailid, action.reply)
        break;
    case "unlockMail":
        eventsystem.unlockMail(state, action.mailid)
        break;
    case "toggleCrystal":
        const chargeInfo = getCrystalChargeInfo(state)
        if (chargeInfo.charges < 1) break

        state.crystalMultipliers[action.crystal] ||= crystalStart
        state.crystalMultipliers[action.crystal] += chargeInfo.charges
        if (state.activeCrystals[action.crystal]) {
          state.activeCrystalCount--
          state.activeCrystals[action.crystal] = false
        }
        else {
          if (state.activeCrystalCount >= state.activeCrystalCap)
            state.activeCrystals = {}
          state.activeCrystalCount++
          state.activeCrystals[action.crystal] = true
        }
        state.crystalExp = 0
        state = updateProductionBonus(state)
        state = updateFormulaEfficiency(state)
        break;
    case "upgradeChargeCap":
        const chargeInfo2 = getCrystalChargeInfo(state)
        if (!chargeInfo2.capped) break

        state.crystalExp = 0
        state.chargeCapLevel++
        break;
    case "upgradeChargeSpeed":
        const acost = getCrystalSpeedUpgradeCost(state)
        if (state.alpha < acost) break

        state.alpha -= acost
        state.crystalSpeedLevel++
        break;
    case "upgradeCrystalEffect":
        const xcost = getCrystalEffectUpgradeCost(state)
        if (state.inNegativeSpace || state.xValue[0] < xcost) break

        state.xValue[0] -= xcost
        state.crystalEffectLevel++
        break;
    default:
        console.error("Action " + action.name + " not found.")
    }
    return state;
}