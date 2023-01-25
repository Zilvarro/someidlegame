import { spaces, secondsToHms, formatNumber} from '../utilities'
import AlphaUpgradeButton from './AlphaUpgradeButton'
import MultiOptionButton from '../MultiOptionButton'

const alphaUpgradeTable = ["AAPP","FREF","SAPP","OAPP","BR1","AUNL","MEEQ","AREM","MEMS","BR2","SLOT","PALP","SRES","ARES"]

export const countAlphaUpgrades=(state)=>{
    return alphaUpgradeTable.filter((x)=>state.alphaUpgrades[x]).length
}

export default function AlphaScreen({state, updateState, popup, setTotalClicks}) {
      
const alphaUpgradeDictionary = {
    "AAPP": {
        id:"AAPP",
        title:"Auto Applier",
        description:"Applies a formula for you twice per second, if beneficial. Rate can be further upgraded.",
        cost:1,
    },
    "FREF": {
        id:"FREF",
        requires: "AAPP",
        title:"Formula Refund",
        description:"Applying formulas does not reduce x.",
        cost:2,
    },
    "SAPP": {
        id:"SAPP",
        requires: "FREF",
        title:"Super Applier",
        description:"Auto Applier can handle multiple formulas simultaneously.",
        cost:4,
    },
    "OAPP": {
        id:"OAPP",
        requires: "SAPP",
        title:"Offline Applier",
        description:"Auto Applier works offline.",
        cost:100,
    },
    "AUNL": {
        id:"AUNL",
        title:"Auto Unlocker",
        description:"Automatically unlocks formulas. Unlocking formulas does not reduce x.",
        cost:1,
    },
    "MEEQ": {
        id:"MEEQ",
        requires: "AUNL",
        title:"Memorize Equip",
        description:"One Equipment loadout can be saved and loaded for each stage.",
        cost:2,
    },
    "AREM": {
        id:"AREM",
        requires: "MEEQ",
        title:"Auto Rememberer",
        description:"Memorized equipment is automatically loaded when differentials are unlocked.",
        cost:4,
    },
    "MEMS": {
        id:"MEMS",
        requires: "AREM",
        title:"Better Memory",
        description:"Up to three different Equipment loadouts can be saved. (Not yet implemented!)",
        cost:100,
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
        description:"Gain Alpha Tokens passively in Intervals based on fastest Alpha-Reset.",
        cost:2,
    },
    "SRES": {
        id:"SRES",
        requires: "PALP",
        title:"X Resetter",
        description:"Automatically performs x-Resets.",
        cost:4,
    },
    "ARES": {
        id:"ARES",
        requires: "SRES",
        title:"Alpha Resetter",
        description:"Automatically performs Alpha-Resets. Can also complete Challenges.",
        cost:100,
    },
    "BR1": {
        fixed: <br/>
    },
    "BR2": {
        fixed: <br/>
    },
}

const applierRates = [2,5,10]
const applierCosts = [1,3,10]
const applierLevel = state.autoApplyLevel
const upgradeApplierRate = ()=>{
    updateState({name:"upgradeApplierRate", level:applierLevel + 1, rate:applierRates[applierLevel + 1], cost:applierCosts[applierLevel + 1] })
}
const baseAlphaMultiplier = Math.pow(2,state.baseAlphaLevel)
const baseAlphaUpgradeCost = Math.pow(5,state.baseAlphaLevel + 1)
const upgradeBaseAlpha = ()=>{
    updateState({name:"upgradeBaseAlpha", level:state.baseAlphaLevel + 1, cost:baseAlphaUpgradeCost })
}

return (
    <div>{<>
        <h2>Upgrades</h2>
            {state.alphaUpgrades.SRES && <><MultiOptionButton settingName="autoResetterS" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
              description="X Resetter"/></>}
            {state.alphaUpgrades.AREM && <>{spaces()}<MultiOptionButton settingName="autoRemembererActive" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
              description="Rememberer"/></>}
            {(state.alphaUpgrades.SRES || state.alphaUpgrades.AREM) &&<><br/><br/></>}
            
            {state.alphaUpgrades.ARES && <><MultiOptionButton settingName="autoResetterA" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
              description="Alpha Resetter"/></>}
            {state.alphaUpgrades.ARES && <>{spaces()}<MultiOptionButton settingName="alphaThreshold" statusList={["MINIMUM","1e40","1e50","1e60","1e70","1e80","1e90","1e100"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
              description="Alpha Target"/></>}
            {(state.alphaUpgrades.SRES || state.alphaUpgrades.AREM) && <><br/><br/></>}
        {alphaUpgradeTable.map((upgrade)=><AlphaUpgradeButton key={upgrade} upgrade={alphaUpgradeDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
        <br/><br/>
        <h2>Infos</h2>
        <p>You have {formatNumber(state.alpha, state.settings.numberFormat)} Alpha Token{state.alpha !== 1 && "s"}!</p>
        <p>Time in current Alpha run: {secondsToHms(state.currentAlphaTime / 1000)}</p>
        {state.bestAlphaTime<1e50 && <p>Fastest Alpha run: {secondsToHms(Math.ceil(state.bestAlphaTime / 1000))}</p>}
        {state.clearedChallenges.FULLYIDLE && <>
            <p>Best Master of Idle: {state.bestIdleTimeAlpha}&alpha; in {secondsToHms(Math.ceil(state.bestIdleTime  / 1000))}</p>
        </>}
        {state.alphaUpgrades.PALP && ((state.passiveAlphaInterval <= 1000) ? <p>Passive Alpha Tokens:{(1000 / state.passiveAlphaInterval).toFixed()}/s</p> :<p>Next Passive Alpha Token: {secondsToHms(Math.max(0,((state.passiveAlphaInterval - state.passiveAlphaTime) / 1000)))}</p>)}
        {state.alphaUpgrades.AAPP && <p>Auto Applier Rate: {state.autoApplyRate}/s{spaces()}{applierLevel<2 && <button disabled={state.alpha < applierCosts[applierLevel + 1]} onClick={upgradeApplierRate}>Upgrade for {applierCosts[applierLevel + 1]} &alpha;</button>}</p>}
        <p>Base Tokens per &alpha;-Reset: {baseAlphaMultiplier}{spaces()}{state.baseAlphaLevel<12 && <button disabled={state.alpha < baseAlphaUpgradeCost} onClick={upgradeBaseAlpha}>Double for {baseAlphaUpgradeCost} &alpha;</button>}</p>
        </>}
    </div>)
}