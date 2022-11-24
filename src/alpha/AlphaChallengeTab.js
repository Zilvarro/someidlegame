import AlphaChallengeButton from './AlphaChallengeButton.js'

const alphaChallengeDictionary = {
    "SLOWPROD": {
        id:"SLOWPROD",
        title:"Slowness",
        description:"Production is 1000x slower.",
    },
    "SIMPLEONLY": {
        id:"SIMPLEONLY",
        title:"Simplicity",
        description:"Only simple formulas are available.",
    },
    "DECREASE": {
        id:"DECREASE",
        title:"Decreasing",
        description:"All non-negative x-Values are decreased by 1 each second.",
    },
    "LIMITED": {
        id:"LIMITED",
        title:"Limited",
        description:"You can do at most 500 formula applications per S-Reset.",
    },
    "RESETOTHER": {
        id:"RESETOTHER",
        title:"Selfish",
        description:"Applying a formula resets all other x-Values.",
    },
    "NEWONLY": {
        id:"NEWONLY",
        title:"Trendsetter",
        description:"Formulas from previous S-Resets are no longer available.",
    },
    "SMALLINV": {
        id:"SMALLINV",
        title:"Small Backpack",
        description:"You only have 1 equipment slot, but you can ignore apply needs.",
    },
    "COMPLEX": {
        id:"COMPLEX",
        title:"Complexity",
        description:"Simple formulas are not available, except for Basic formulas.",
    },
    "COUNTDOWN": {
        id:"COUNTDOWN",
        title:"Countdown",
        description:"Every 60 seconds, an X-Reset is performed automatically.",
    },
    "THUNDER": {
        id:"THUNDER",
        title:"Thunder",
        description:"Every 5 seconds your x-Values are cut in half.",
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
    },
}
const alphaChallengeTable = ["SLOWPROD","SIMPLEONLY","DECREASE","LIMITED","RESETOTHER","NEWONLY","SMALLINV","COMPLEX","COUNTDOWN","SINGLEUSE","ONESHOT","FULLYIDLE"]

export default function AlphaChallengeTab({state, updateState, popup}) {
    const exitAlphaChallenge = ()=>{
        popup.confirm(<>Exit current Challenge?<br/>This will perform an &alpha;-Reset.</>,()=>{
            updateState({name: "exitChallenge"})
        })
    }

    return (<div>
        <h2>Challenges</h2>
        <p>Under construction! The challenges do not work yet and are just example ideas.</p>
        <p><button disabled={!state.insideChallenge} onClick={exitAlphaChallenge}>Exit Challenge</button></p>
        {alphaChallengeTable.map((challenge)=>
            <AlphaChallengeButton key={challenge} challenge={alphaChallengeDictionary[challenge]} state={state} updateState={updateState} popup={popup}/>
        )}
        
    </div>)
}