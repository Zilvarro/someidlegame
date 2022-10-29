import {getStartingX} from '../savestate'
// import {formatNumber} from '../utilities'
import AlphaUpgradeButton from './AlphaUpgradeButton'

export default function AlphaScreen({state, updateState, popup, setTotalClicks}) {
      
const alphaUpgradeDictionary = {
    "AAPP": {
        id:"AAPP",
        title:"Auto Applier",
        description:"Applies a formula for you once per second. Rate can be further upgraded.",
        cost:1,
    },
    "FREF": {
        id:"FREF",
        requires: "AAPP",
        title:"Formula Refund",
        description:"Applying formulas does not reduce x.",
        cost:2,
    },
    "OAPP": {
        id:"OAPP",
        requires: "FREF",
        title:"Offline Applier",
        description:"Auto Applier works offline. Accurracy for complex formulas may vary.",
        cost:3,
    },
    "SAPP": {
        id:"SAPP",
        requires: "OAPP",
        title:"Super Applier",
        description:"Auto Applier can handle multiple formulas simultaneously.",
        cost:4,
    },
    "UREF": {
        id:"UREF",
        title:"Unlock Refund",
        description:"Unlocking formulas does not reduce x.",
        cost:1,
    },
    "AUNL": {
        id:"AUNL",
        requires: "UREF",
        title:"Auto Unlocker",
        description:"Automatically unlocks formulas.",
        cost:2,
    },
    "MEEQ": {
        id:"MEEQ",
        requires: "AUNL",
        title:"Memorize Equip",
        description:"One Equipment layout can be saved and loaded for each stage.",
        cost:3,
    },
    "AREM": {
        id:"AREM",
        requires: "MEEQ",
        title:"Auto Rememberer",
        description:"Memorized equipment is automatically loaded when differentials are unlocked.",
        cost:4,
    },
    "SLOT": {
        id:"SLOT",
        title:"Formula Slot",
        description:"Grants an additional formula equipment slot.",
        cost:1,
    },
    "PALP": {
        id:"PALP",
        requires: "SLOT",
        title:"Passive Alpha",
        description:"Gain 10% Alpha passively based on fastest Alpha-Reset.",
        cost:2,
    },
    "SRES": {
        id:"SRES",
        requires: "PALP",
        title:"S-Resetter",
        description:"Automatically performs S-Resets.",
        cost:3,
    },
    "ARES": {
        id:"ARES",
        requires: "SRES",
        title:"\u03B1-Resetter",
        description:"Automatically performs Alpha-Resets.",
        cost:4,
    },
    "BR1": {
        fixed: <br/>
    },
    "BR2": {
        fixed: <br/>
    },
}
const alphaUpgradeTable = ["AAPP","FREF","OAPP","SAPP","BR1","UREF","AUNL","MEEQ","AREM","BR2","SLOT","PALP","SRES","ARES"]

return (
    <div>{<>
        <h2>Upgrades</h2>
        {alphaUpgradeTable.map((upgrade)=><AlphaUpgradeButton key={upgrade} upgrade={alphaUpgradeDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
        {/* <p>&alpha; = {state.alpha}</p> */}
        {/* <p>&alpha;<sub>max</sub> = {state.maxAlpha}</p> */}
        <p>You start with x={getStartingX(state)} after resets</p>
        <p>Time in current &alpha; run: 1h23m45s</p>
        <p>Remember Equip: ON</p>
        <p>Auto Applier: ON</p>
        <p>Auto Unlocker: ON</p>
        <p>S-Resetter: ON</p>
        <p>&alpha;-Resetter: ON, Minimum 10 &alpha;</p>
        {/* <p><button disabled={state.alpha < 1 || state.boughtAlpha[0]} onClick={()=>{buyAlphaUpgrade(0)}}>Get an extra formula slot</button>{spaces()}{state.boughtAlpha[0] ? <>Already bought</>: <>Cost: &alpha; = 1</>}</p> */}
        {/* <p><button disabled={state.alpha < 2 || state.boughtAlpha[1]} onClick={()=>{buyAlphaUpgrade(1)}}>Double all idle production</button>{spaces()}{state.boughtAlpha[1] ? <>Already bought</>: <>Cost: &alpha; = 2</>}</p> */}
        </>}
    </div>)
}