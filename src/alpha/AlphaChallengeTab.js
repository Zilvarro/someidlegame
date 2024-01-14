import AlphaChallengeButton from './AlphaChallengeButton.js'
import {alphaTarget, differentialTargets, getChallengeBonus, getGlobalMultiplier, getStartingX} from '../savestate.js'
import { spaces } from '../utilities.js'

export const alphaChallengeTable = ["SLOWPROD","SIMPLEONLY","DECREASE","LIMITED","RESETOTHER","NEWONLY","SMALLINV","COMPLEX","COUNTDOWN","SINGLEUSE","ONESHOT","FULLYIDLE", "FORMULAGOD", "EVILROOT", "TRUEBETA"]

export const alphaChallengeDictionary = {
    "SLOWPROD": {
        id:"SLOWPROD",
        title:"Slowness",
        description:"Production is 100x slower.",
    },
    "SIMPLEONLY": {
        id:"SIMPLEONLY",
        title:"Simplicity",
        description:"Only simple formulas are available.",
    },
    "DECREASE": {
        id:"DECREASE",
        title:"Decay",
        description:"All X-Values decay at a rate of 10% per second, rounded up.",
    },
    "LIMITED": {
        id:"LIMITED",
        title:"Limited",
        description:"You can do at most 100 formula applications per x-Reset.",
    },
    "RESETOTHER": {
        id:"RESETOTHER",
        title:"Selfish",
        description:"Applying a formula resets all other X-Values.",
    },
    "NEWONLY": {
        id:"NEWONLY",
        title:"Trendsetter",
        description:"Formulas from previous x-Resets are no longer available.",
    },
    "SMALLINV": {
        id:"SMALLINV",
        title:"Small Backpack",
        description:"Only 1 equipment slot, but the first formula apply after a reset is free.",
    },
    "COMPLEX": {
        id:"COMPLEX",
        title:"Complexity",
        description:"Simple formulas are not available, except for Basic formulas.",
    },
    "COUNTDOWN": {
        id:"COUNTDOWN",
        title:"Countdown",
        description:"You must do a reset every 30 seconds.",
    },
    "SINGLEUSE": {
        id:"SINGLEUSE",
        title:"Single Use",
        description:"Each formula can only be used one time per reset.",
    },
    "ONESHOT": {
        id:"ONESHOT",
        title:"One-Shot",
        description:"Basic Resets are disabled.",
    },
    "FULLYIDLE": {
        id:"FULLYIDLE",
        title:"Master of Idle",
        description:"You cannot interact with anything on the Formulas tab.",
        requirement: 5,
    },
    "FORMULAGOD": {
        id:"FORMULAGOD",
        title:"Formula God",
        description:"All previous challenges at once.",
        subChallenges:alphaChallengeTable,
        requirement: 10,
    },
    "EVILROOT": {
      id:"EVILROOT",
      title:"Root of Evil",
      description:"Starting X, Production and Formula Results are square rooted.",
      //requirement: 12,
      advanced: true,
    },
    "TRUEBETA": {
      id:"TRUEBETA",
      title:"True Beta",
      description:"You do not gain any bonuses from the Alpha tab",
      //requirement: 14,
      advanced: true,
    },
}

export const trivialStartChallenges = ["SLOWPROD","SIMPLEONLY","RESETOTHER","NEWONLY","SMALLINV","COUNTDOWN","ONESHOT"]

export function calcChallengePower(state) {
  //Global Multiplier is not considered! With higher exponent on deeper powers.
  let power = [0,0,0,0]
  let easypower = [0,0,0,0]
  let hardpower = [0,0,0,0]
  let differentials = [0,0,0,0]
  let easymults = [1, 30, 435, 4060]
  let hardmults = [1, 0.348, 0.00231, 0.000172]
  let targets = [differentialTargets[0],differentialTargets[1],differentialTargets[2],alphaTarget]
  const startingX = getStartingX(state) 
  const gm = getGlobalMultiplier(state)
  power[0] = startingX + state.formulaEfficiency[0]*gm
  power[1] = state.formulaEfficiency[1]*state.productionBonus[0]*Math.pow(gm,2)
  power[2] = state.formulaEfficiency[2]*state.productionBonus[0]*state.productionBonus[1]*Math.pow(gm,3)
  power[3] = state.formulaEfficiency[3]*state.productionBonus[0]*state.productionBonus[1]*state.productionBonus[2]*Math.pow(gm,4)

  easypower[0] = startingX + 100*state.formulaEfficiency[0]*gm //x+1 can be repeated
  easypower[1] = Math.max(startingX, easymults[1] * power[1])
  easypower[2] = Math.max(startingX, easymults[2] * power[2])
  easypower[3] = Math.max(startingX, easymults[3] * power[3])

  const applyMult = (state.alphaUpgrades.AREM && state.alphaUpgrades.AAPP) ? 1 : 0 //can player apply formulas while fully idle?
  hardpower[0] = startingX + applyMult*state.formulaEfficiency[0]*gm //x+1 cannot be repeated due to Single Use challenge
  hardpower[1] = Math.max(startingX, applyMult * hardmults[1] * power[1])
  hardpower[2] = Math.max(startingX, applyMult * hardmults[2] * power[2])
  hardpower[3] = Math.max(startingX, applyMult * hardmults[3] * power[3])


  switch (state.challengeProgress.FORMULAGOD || 0) {
    case 0:
      differentials[0] = hardmults[0]*power[0]
      break;
    case 1:
      differentials[0] = hardmults[1]*power[1]
      differentials[1] = hardmults[0]*state.formulaEfficiency[1]*gm
      break;
    case 2:
      differentials[0] = hardmults[2]*power[2]
      differentials[1] = hardmults[1]*state.formulaEfficiency[2]*state.productionBonus[1]*Math.pow(gm,2)
      differentials[2] = hardmults[0]*state.formulaEfficiency[2]*gm
      break;
    case 3:
    case 4:
      differentials[0] = hardmults[3]*power[3]
      differentials[1] = hardmults[2]*state.formulaEfficiency[3]*state.productionBonus[2]*state.productionBonus[1]*Math.pow(gm,3)
      differentials[2] = hardmults[1]*state.formulaEfficiency[3]*state.productionBonus[2]*Math.pow(gm,2)
      differentials[3] = hardmults[0]*state.formulaEfficiency[3]*gm
      break;
    default:
      console.log("Invalid Challenge Progress: " + state.challengeProgress.FORMULAGOD)
      break;
  }

  let easyclears = 4
  if (easypower[3] < targets[3] || startingX < 2000) easyclears = 3
  if (easypower[2] < targets[2] || startingX < 200) easyclears = 2
  if (easypower[1] < targets[1]) easyclears = 1
  if (easypower[0] < targets[0]) easyclears = 0

  let hardclears = 4
  if (hardpower[3] < targets[3] || state.challengeProgress.FULLYIDLE === 3) hardclears = 3
  if (hardpower[2] < targets[2] || state.challengeProgress.FULLYIDLE === 2) hardclears = 2
  if (hardpower[1] < targets[1] || state.challengeProgress.FULLYIDLE === 1) hardclears = 1
  if (hardpower[0] < targets[0] || !state.challengeProgress.FULLYIDLE) hardclears = 0

  return {
    easypower,
    easyclears,
    hardpower,
    hardclears,
    differentials,
    targets,
  }
}

export default function AlphaChallengeTab({state, updateState, popup}) {
    const exitAlphaChallenge = ()=>{
        popup.confirm(<>Exit current Challenge?</>,()=>{
            updateState({name: "exitChallenge"})
        }, state.settings.exitChallengePopup === "OFF")
    }
    const openChallengeInfo = ()=>{
        popup.alert(<>All challenges have a 30 minute time limit.
            <br/>Formula Offline Progress is disabled during Challenges.
            <br/>Challenges are NOT ordered by difficulty.
            <br/>Each completed segment grants +15% Formula Efficiency.
            <br/>Every fully completed challenge doubles your Formula Efficiency.
            <br/>"Master of Idle" and "Formula God" give additional secret perks.
        </>)
    }

    const challengeBonus = getChallengeBonus(state)
    const challengeInfo = calcChallengePower(state)

    return (<div style={{marginLeft:"20px"}}>
        <h2>Challenges</h2>
        Challenge-Power: {Math.floor(challengeInfo.easypower[Math.min(challengeInfo.easyclears,3)])}<br/>
        God-Power: {Math.floor(challengeInfo.hardpower[Math.min(challengeInfo.hardclears,3)])}<br/>
        Challenges are like normal Alpha-Runs, but with additional constraints.<br/> You are rewarded for each successful x-Reset and for completing the entire run!<br/>
        {challengeBonus.full === 13 ? <>You completed all challenges, boosting your Formula Efficiency by {challengeBonus.bonus.toFixed(2)}.</>: <>Your {challengeBonus.full} challenge completions and {challengeBonus.segment} segment completions boost your Formula Efficiency by {challengeBonus.bonus.toFixed(2)}.</>}
        {state.currentChallenge && <p>You are currently in the "{state.currentChallengeName}" Challenge.</p>}
        <p>
            <button style={{color:"black"}} disabled={!state.insideChallenge} onClick={exitAlphaChallenge}>Exit Challenge</button>
            {spaces()}<button onClick={openChallengeInfo}>About Challenges</button>
        </p>
        {alphaChallengeTable.map((challenge)=>
            <AlphaChallengeButton key={challenge} challenge={alphaChallengeDictionary[challenge]} state={state} updateState={updateState} popup={popup}/>
        )}
    </div>)
}