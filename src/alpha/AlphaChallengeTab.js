import AlphaChallengeButton from './AlphaChallengeButton.js'
import {getChallengeBonus, alphaTarget} from '../savestate.js'
import { spaces } from '../utilities.js'

export const alphaChallengeTable = ["SLOWPROD","SIMPLEONLY","DECREASE","LIMITED","RESETOTHER","NEWONLY","SMALLINV","COMPLEX","COUNTDOWN","SINGLEUSE","ONESHOT","FULLYIDLE", "FORMULAGOD"]

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
        description:"You can do at most 100 formula applications per S-Reset.",
    },
    "RESETOTHER": {
        id:"RESETOTHER",
        title:"Selfish",
        description:"Applying a formula resets all other X-Values.",
    },
    "NEWONLY": {
        id:"NEWONLY",
        title:"Trendsetter",
        description:"Formulas from previous S-Resets are no longer available.",
    },
    "SMALLINV": {
        id:"SMALLINV",
        title:"Small Backpack",
        description:"You only have 1 equipment slot, but the first formula apply after a reset is free.",
    },
    "COMPLEX": {
        id:"COMPLEX",
        title:"Complexity",
        description:"Simple formulas are not available, except for Basic formulas.",
    },
    "COUNTDOWN": {
        id:"COUNTDOWN",
        title:"Countdown",
        description:"Every 30 seconds, all X-Values are set to zero.",
    },
    "SINGLEUSE": {
        id:"SINGLEUSE",
        title:"Single Use",
        description:"Each formula can only be used one time per reset.",
    },
    "ONESHOT": {
        id:"ONESHOT",
        title:"One-Shot",
        description:"X-Resets are disabled.",
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
}
export default function AlphaChallengeTab({state, updateState, popup}) {
    const exitAlphaChallenge = ()=>{
        popup.confirm(<>Exit current Challenge?</>,()=>{
            updateState({name: "exitChallenge"})
        })
    }
    const completeAlphaChallenge = ()=>{
        updateState({name: "alphaReset"})
    }
    const openChallengeInfo = ()=>{
        popup.alert(<>All challenges have a 30 minute time limit.
            <br/>Formula Offline Progress is disabled during Challenges.
            <br/>Each completed segment grants +10% Formula Efficiency.
            <br/>Every fully completed challenge doubles your Formula Efficiency.
            <br/>"Master of Idle" and "Formula God" give additional secret perks.
        </>)
    }

    const challengeBonus = getChallengeBonus(state)

    return (<div>
        <h2>Challenges</h2>
        Your {challengeBonus.full} challenge completions and {challengeBonus.segment} segment completions boost your Formula Efficiency by {challengeBonus.bonus.toFixed(2)}.
        {state.currentChallenge && <p>You are currently in the "{state.currentChallengeName}" Challenge.</p>}
        <p>
            {(state.xValue[0] < alphaTarget || !state.insideChallenge || state.activeChallenges.FULLYIDLE) &&<button disabled={!state.insideChallenge} onClick={exitAlphaChallenge}>Exit Challenge</button>}
            {state.xValue[0] >= alphaTarget && state.insideChallenge && !state.activeChallenges.FULLYIDLE && <button onClick={completeAlphaChallenge}>Complete Challenge</button>}
            {spaces()}<button onClick={openChallengeInfo}>About Challenges</button>
        </p>
        {alphaChallengeTable.map((challenge)=>
            <AlphaChallengeButton key={challenge} challenge={alphaChallengeDictionary[challenge]} state={state} updateState={updateState} popup={popup}/>
        )}
    </div>)
}