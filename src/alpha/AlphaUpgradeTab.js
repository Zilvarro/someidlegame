import { spaces, secondsToHms } from '../utilities'
// import {formatNumber} from '../utilities'
import AlphaUpgradeButton from './AlphaUpgradeButton'
import MultiOptionButton from '../MultiOptionButton'

const alphaUpgradeTable = ["AAPP","FREF","OAPP","SAPP","BR1","UREF","AUNL","MEEQ","AREM","BR2","SLOT","PALP","SRES","ARES"]

export const countAlphaUpgrades=(state)=>{
    return alphaUpgradeTable.filter((x)=>state.alphaUpgrades[x]).length
}

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
        title:"Shop Resetter",
        description:"Automatically performs Shop-Resets (S-Resets).",
        cost:3,
    },
    "ARES": {
        id:"ARES",
        requires: "SRES",
        title:"Alpha Resetter",
        description:"Automatically performs Alpha-Resets. Can also complete Challenges.",
        cost:4,
    },
    "BR1": {
        fixed: <br/>
    },
    "BR2": {
        fixed: <br/>
    },
}

const applierRates = [1,2,5,10]
const applierCosts = [1,1,2,10]
const applierLevel = state.autoApplyLevel
const upgradeApplierRate = ()=>{
    updateState({name:"upgradeApplierRate", level:applierLevel + 1, rate:applierRates[applierLevel + 1], cost:applierCosts[applierLevel + 1] })
}

return (
    <div>{<>
        <h2>Upgrades</h2>
        {alphaUpgradeTable.map((upgrade)=><AlphaUpgradeButton key={upgrade} upgrade={alphaUpgradeDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
        <br/><br/>
        <h2>Infos</h2>
        <p>Time in current Alpha run: {secondsToHms(state.currentAlphaTime / 1000)}</p>
        <p>Fastest Alpha run: {secondsToHms(Math.ceil(state.bestAlphaTime / 1000))}</p>
        {state.alphaUpgrades.PALP && <p>Next Passive Alpha: {secondsToHms(Math.max(0,((10 * state.bestAlphaTime - state.passiveAlphaTime) / 1000)))}</p>}
        {state.clearedChallenges.FULLYIDLE && <>
            <p>Best Master of Idle Completion: {state.bestIdleTimeAlpha}&alpha; in {secondsToHms(Math.ceil(state.bestIdleTime  / 1000))}</p>
            {(state.bestIdleTimeAlpha / state.bestIdleTime / 1000 > 1) ? <p>{(state.bestIdleTimeAlpha / state.bestIdleTime / 1000).toFixed()}/s</p> :<p>Next Master Alpha: {secondsToHms(Math.max(0,((state.bestIdleTime / state.bestIdleTimeAlpha - state.passiveMasterTime) / 1000)))}</p>}
        </>}
        {state.alphaUpgrades.AAPP && <p>Auto Applier Rate: {state.autoApplyRate}/s{spaces()}{applierLevel<3 && <button disabled={state.alpha < applierCosts[applierLevel + 1]} onClick={upgradeApplierRate}>Upgrade for {applierCosts[applierLevel + 1]} &alpha;</button>}</p>}
        </>}
    </div>)
}