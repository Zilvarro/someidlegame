import { secondsToHms, formatNumber} from '../utilities'
import { getCrystalMultiplier } from '../world/WorldCrystalTab'
import AlphaUpgradeButton from './AlphaUpgradeButton'
import { alphaUpgradeDictionary, alphaUpgradeTable } from './AlphaUpgradeDictionary'

export const countAlphaUpgrades=(state)=>{
    return alphaUpgradeTable.filter((x)=>state.alphaUpgradesBought[x]).length
}

export default function AlphaUpgradeTab({state, updateState, popup, setTotalClicks}) {
      
let boughtSomething = false

const baseAlphaMultiplier = Math.pow(2,state.baseAlphaLevel)
const baseAlphaUpgradeCost = Math.pow(5,state.baseAlphaLevel + 1)
const upgradeBaseAlpha = ()=>{
    if (boughtSomething || state.alpha < baseAlphaUpgradeCost) return
    boughtSomething = true
    updateState({name:"upgradeBaseAlpha", level:state.baseAlphaLevel + 1, cost:baseAlphaUpgradeCost })
}

const crystalBonus = getCrystalMultiplier(state,"A")

return (
    <div style={{marginLeft:"20px"}}>{<>
        <h2>Alpha Upgrades</h2>
        {alphaUpgradeTable.map((upgrade)=><AlphaUpgradeButton key={upgrade} upgrade={alphaUpgradeDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
        <br/><br/>
        <h2>Info</h2>
        <p>You have {formatNumber(state.alpha, state.settings.numberFormat,2)} Alpha Token{state.alpha !== 1 && "s"}!</p>
        <p>Time in current Alpha run: {secondsToHms(state.currentAlphaTime / 1000)}{state.isFullyIdle && <> (Fully Idle)</>}</p>
        {state.bestAlphaTime<1e50 && <p>Fastest Alpha run: {secondsToHms(state.bestAlphaTime / 1000, true)}</p>}
        {state.clearedChallenges.FULLYIDLE && <>
            <p>Best Fully Idle: {formatNumber(state.bestIdleTimeAlpha, state.settings.numberFormat, 2)}&alpha; in {secondsToHms(state.bestIdleTime  / 1000, true)}</p>
        </>}
        {state.alphaUpgrades.PALP && ((state.passiveAlphaInterval * crystalBonus <= 1000) ? <p>Passive Alpha Tokens: {formatNumber(Math.floor(crystalBonus * 1000 / state.passiveAlphaInterval),state.settings.numberFormat,2)}/s</p> :<p>Next Passive Alpha Token: {secondsToHms(Math.max(0,((state.passiveAlphaInterval - state.passiveAlphaTime) / crystalBonus / 1000)))}</p>)}
        <p>Base &alpha;-Reset Tokens: {formatNumber(baseAlphaMultiplier,state.settings.numberFormat,2)}&nbsp;&nbsp;{state.baseAlphaLevel<12 && <button style={{color:"black"}} disabled={state.alpha < baseAlphaUpgradeCost} onClick={upgradeBaseAlpha}>Double for {formatNumber(baseAlphaUpgradeCost,state.settings.numberFormat,2)} &alpha;</button>}</p>
        </>}
    </div>)
}