import { MAJORVERSION, MINORVERSION, PRODUCTIVE, mailStates } from "./constants"

//Resets on Basic Reset
export const newBasicRun = ()=>({
  xValues: [0,0,0,0],
  formulaUsed: {},
  inNegativeSpace: false,
  anyFormulaUsed: false, //Should be true in very first run

  playtime: 0, //Replaces timer for Countdown challenge
})

//Resets on x-Reset
export const newStageRun = ()=>({
  myFormulas: [],
  currentStage: 0, //formerly highestXTier
  formulaUnlocked: {},
  formulaBought: {},
  xResetCount: 0,
  formulaUnlockCount: 0,
  formulaApplyCount: 0,
  autoUnlockIndex: 0,

  playtime: 0, //replacescurrentChallengeTime
})

//Resets on Alpha Reset
export const newFormulaSave = ()=>({
  isFullyIdle: true,
  currentChallenge: null, //id of challenge
  
  basicRun: newBasicRun(),
  stageRun: newStageRun(),
  playtime: 0, //replaces currentAlphaTime
})

//Resets on World Reset
const newAlphaSave = ()=>({
  //General
  tokens: 0,
  selectedSubTabKey: "AlphaUpgradeTab",
  playtime: 0,

  //Upgrades
  alphaUpgrades: {},
  baseAlphaLevel: 0,

  //Auto Applier
  autoApply: [false,false,false,false,false],
  autoApplyLevel: 0,
  autoApplyRate: 2,
  millisSinceAutoApply: 0,

  //Passive Alpha
  bestAlphaTime: 1e100,
  bestIdleTime: 1800e3,
  bestIdleTimeAlpha: 1,
  passiveAlphaTime: 0,
  passiveAlphaInterval: 1e100,

  //Rememberer
  equipLayouts: [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]],
  selectedLayout: 0,
  autoRemembererActive: "ON",

  //Resetter
  autoResetterX: "OFF",
  autoResetterA: "OFF",
  alphaThreshold: "MINIMUM",

  //Research
  xHighScores: [20e3,20e9,20e21,20e33],
  researchTime: {}, //Replaces researchStartTime
  researchLevel: {},
  
  //Challenges
  challengeProgress: {},
  formulaGodScores: [1,1,1,1],

  //Starting Stones
  startingStoneTurned:{},
  startingStoneLevel:{},
  startingStoneMode:1, //1 Increment, 0 Description, -1 Decrement
})

//Resets on Void Reset
const newWorldSave = ()=>({
  essence: 0,
  playtime: 0,
})

//Resets on Destiny Reset
const newVoidSave = ()=>({
  energy: 0,
  playtime: 0,
})

//Resets on Destiny Reset
const newMailRun = ()=>({
  mailsList: [], //This is displayed on mails tab
  mailsState: {
    "Warning":{
      state: mailStates.checking,
      //untilTimeout: 10000,
      //response: 1,
      //progress: {}, //e.g. homework answers
    }
  }
})

//Resets on Destiny Reset
const newMainGameSave = ()=>({
  progressionLayer: 0,
  playtime: 0, //replaces destinyStartTimeStamp and destinyEndTimeStamp
  isFinished: false,
  completedEndings: {},
  noProdTime: 0, //For Prince Mail

  formulas: newFormulaSave(),
  alpha: newAlphaSave(),
  world: newWorldSave(),
  void: newVoidSave(),
  mails: newMailRun(),
})

//Resets on Constellation Reset
const newStarlightRun = ()=>({
  light: 0,
  lightAdder: 0,
  lightDoubler: 0,
  lightRaiser: 0,

  playtime: 0,
})

//This never resets, Postgame related
const newDestinySave = ()=>({
  stars: 0,
  starConstellations: {},
  constellationCount: 0,

  starlightRun: newStarlightRun(),
})

//Also never resets, User Preference related
const newSettingsSave = ()=>({
  valueReduction: "ON",
  offlineProgress: "ON",
  offlineProgressPopup: "ON",
  xResetPopup: "ON",
  autoSave: "ON",
  autoLoad: "ON",
  numberFormat: "LETTER",
  shopPrices: "ON",
  showHints: "ON",
  hotKeys: "ON",
  shopScroll: "OFF",
  shopFilter: "ALL",
  challengeTabSwitch: "ON",
  shopResetPopup: "ON",
  alphaResetPopup: "ON",
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
})

//Also never resets, Overall Gameplay related
const newGeneralSave = ()=>({
  idleMultiplier: 1, 
  progressionLayer: 0,
  selectedTabKey: "FormulaScreen",

  saveTimeStamp: 0,
  calcTimeStamp: 0,
  shopFavorites: [{},{},{},{}], //-1: hidden // 1: favorite // undefined: normal
  allTimeEndings: {},
  destinyRecordMillis: 1e100,

  fileStartTimeStamp: Date.now(), //Not shown to user, but saved just in case
  playtime: 0, //Not shown to user, but saved just in case
  mileStoneCount: 0,
})

//Resets when refreshing Page, not saved
export const newSessionContext = ()=>({
  tickFormula: false, //Session Property
  holdAction: null, //Session Property
  currentEnding: "",
  
  avgXPerSecond: [0,0,0,0], //Session Property
  xPerSecond: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], //Session Property
  decreaseCooldown: false,
  playtime: 0, //replaces justlaunched
})

//Contains properties derived from other properties, not saved
export const newDerivedContext = ()=>({
  productionBonus: [1,1,1,1],
  formulaEfficiency: [1,1,1,1],
  insideChallenge: false,
  currentChallengeName: null,
  isHolding: false,
  activeChallenges: {},
  clearedChallenges: {},
  startingStoneX: 0,
  badEndingCount: 0,
})

//Structure that gets saved in local Storage
export const newSave = ()=>({
  majorversion: MAJORVERSION,
  minorversion: MINORVERSION,
  productive: PRODUCTIVE,

  general: newGeneralSave(),
  maingame: newMainGameSave(),
  destiny: newDestinySave(),
  settings: newSettingsSave(),
})

//Get basic Structure for a Save
export const getSaveStructure = ()=>({
  general: true,
  maingame: {
    formulas: {
      basicRun: true,
      stageRun: true,
    },
    alpha: true,
    mails: true,
  },
  destiny: {
    starlightRun:true,
  },
  settings: true,
})
