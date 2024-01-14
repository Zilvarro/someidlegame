import { crystalStart, getGlobalMultiplier } from "../savestate";
import { formatNumber, logB} from "../utilities";
import WorldBuffCrystal from "./WorldBuffCrystal";
import WorldChargeBar from "./WorldChargeBar";

export const getCrystalEffectMultiplier = (state) => {
  return 2+state.crystalEffectLevel*0.1
}

export const getCrystalMultiplier = (state, crystalId, useInactive) => {
  return (useInactive || state.activeCrystals[crystalId]) ? getCrystalEffectMultiplier(state) * (state.crystalMultipliers[crystalId] || crystalStart) / 100 : 1
}

export const getCrystalChargeSpeed = (state) => {
  const normalspeed = Math.pow(1.2,state.crystalSpeedLevel)*getGlobalMultiplier(state)
  if (state.activeCrystals.M) {
    return logB(2,getCrystalMultiplier(state,"M"))*normalspeed
  } else {
    return normalspeed
  }
}

export const getCrystalAmountMultiplier = (state) => {
  return state.essence  //Math.max(Math.pow(state.essence,2),1)
}

export const getCrystalSpeedUpgradeCost = (state) => {
  return Math.pow(10,state.crystalSpeedLevel)
}

export const getCrystalEffectUpgradeCost = (state) => {
  return Math.pow(1e3,state.crystalEffectLevel + 1)
}

export const getCrystalChargeInfo = (state) => {
  const chargeCapMap = [1,2,5]
  const chargeCap = Math.pow(10, Math.floor(state.chargeCapLevel / 3))*chargeCapMap[state.chargeCapLevel % 3]
  const crystalExp = state.crystalExp
  const amountMult = getCrystalAmountMultiplier(state)
  const speedMult = getCrystalChargeSpeed(state)
  const chargesRaw = (Math.cbrt(crystalExp/250 + 7415)-19.5)
  const chargesInt = Math.floor(chargesRaw)
  const last = (Math.pow(19.5 + chargesInt,3)-7415)*250
  const next = (Math.pow(19.5 + (chargesInt + 1),3)-7415)*250
  const max = amountMult === 0 ? Infinity : (Math.pow(19.5 + (Math.ceil(chargeCap / amountMult)),3)-7415)*250
  const progress = crystalExp - last
  const goal = next - last
  const fraction = progress / goal
  const seconds= (goal - progress) / 1000 / speedMult
  const maxSeconds= Math.max(0,(max - progress) / 1000 / speedMult)
  if (chargesInt * amountMult < chargeCap) 
    return {
      isCharged: chargesInt >= 1,
      charges: chargesInt * amountMult,
      fraction,
      seconds,
      cap: chargeCap,
      capped: false,
      amountMult,
      maxSeconds,
    }
  else
    return {
      isCharged: true,
      charges: chargeCap,
      fraction: 1,
      seconds: 0,
      cap: chargeCap,
      capped: true,
      amountMult,
      maxSeconds,
    }
}

const crystalDictionary = {
  "X":{
    id: "X",
    title: "Starter Crystal",
    description: "Starting X",
  },
  "R":{
    id: "R",
    title: "RESEARCH",
    description: "Research Speed",
  },
  "P":{
    id: "P",
    title: "PRODUCTION",
    description: "All X Production",
  },
  "E":{
    id: "E",
    title: "EFFICIENCY",
    description: "Formula Efficiency",
  },
  "A":{
    id: "A",
    title: "ALPHA",
    description: "Passive Alpha Speed",
  },
  "M":{
    id: "M",
    title: "CHARGE",
    description: "Charge Speed",
    logscale: true,
  },
}
const crystalList = ["R","P","E","A","M"]

export default function WorldCrystalTab({state, updateState, popup}) {
  const chargeInfo = getCrystalChargeInfo(state)

  const upgradeChargeSpeed = ()=>{
    updateState({name: "upgradeChargeSpeed"})
  }
  const upgradeCrystalEffect = ()=>{
    updateState({name: "upgradeCrystalEffect"})
  }
  return (
    <div style={{marginLeft:"10px"}}>
      <div className="row" style={{marginTop:"0px"}}><div className="smallcolumn" style={{marginRight:"30px"}}>
        <h2>Buff Crystals</h2>
        {crystalList.map((id)=><WorldBuffCrystal key={id} disabled={!chargeInfo.isCharged} crystal={crystalDictionary[id]} state={state} popup={popup} updateState={updateState}/>)}
        <br/><br/>
      </div><div className="column">
        <h2>Crystal Charges</h2><br/>
        <WorldChargeBar state={state} chargeInfo={chargeInfo} updateState={updateState}/>
        Crystal Effect: x{formatNumber(getCrystalEffectMultiplier(state),state.numberFormat,2,true)}
        &nbsp;&nbsp;<button style={{color:"black"}} onClick={upgradeCrystalEffect} disabled={state.inNegativeSpace || state.xValue[0]<getCrystalEffectUpgradeCost(state)}>+0.1 for x={formatNumber(getCrystalEffectUpgradeCost(state),state.numberFormat)}</button>
        <br/><br/>
        Charge Speed: x{formatNumber(getCrystalChargeSpeed(state),state.numberFormat,2,true)}
        &nbsp;&nbsp;<button style={{color:"black"}} onClick={upgradeChargeSpeed} disabled={state.alpha<getCrystalSpeedUpgradeCost(state)}>x1.2 for &alpha;={formatNumber(getCrystalSpeedUpgradeCost(state),state.numberFormat)}</button>
        <br/><br/>
        Charge Amount is multiplied by unspent &omega;.
      </div></div>
    </div>)
}