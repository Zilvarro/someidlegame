import { formatNumber, logB } from "../utilities"
import { getCrystalMultiplier } from "./WorldCrystalTab"

export default function WorldBuffCrystal({state, popup, disabled, crystal, updateState}) {
  const multiplier = getCrystalMultiplier(state, crystal.id, true)
  const clickCrystal = ()=>{
    updateState({name: "toggleCrystal", crystal: crystal.id})
  }

  const buttonStyle={
    margin:"10px",
    border:"0px", 
    padding:"0px", 
    fontWeight: "bold",
    width:"95px", 
    height:"80px", 
    fontSize:"12px",
    backgroundColor: state.activeCrystals[crystal.id] ? "#44FFCC" : "#FFFFFF",
    color: "black",
    display: "table-cell",
    verticalAlign: "middle",
}

  return (<div style={{display:"table"}}>
    <button title="Click to toggle this Buff" disabled={disabled} onClick={clickCrystal} style={buttonStyle}>{crystal.title}<br/>CRYSTAL</button>
    <div style={{display:"table-cell", verticalAlign:"middle"}}>
      {crystal.description}<br/>{crystal.logscale ? <>xlog2({formatNumber(multiplier,state.numberFormat,2,true)}) = {formatNumber(logB(2,multiplier),state.numberFormat,2,true)}</> : <>x{formatNumber(multiplier,state.numberFormat,2,true)}</>}<br/>
    </div>
  </div>)

}