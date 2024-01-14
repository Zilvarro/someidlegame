import { formatNumber, secondsToHms } from "../utilities"

export default function WorldChargeBar({state, updateState, chargeInfo}) {

  const increaseChargeCap = ()=>{
    if (!chargeInfo.capped) return
    updateState({name: "upgradeChargeCap"})
  }
  const backColor = chargeInfo.isCharged && chargeInfo.amountMult !== 0 ? "#44FFCC" : "#FFFFFF"
  const barColor = chargeInfo.isCharged && chargeInfo.amountMult !== 0 ? "#00AA77" : "#44FFCC"
  const progressBarWidth = chargeInfo.capped || (chargeInfo.amountMult === 0 && chargeInfo.isCharged) ? "100%" : Math.min(100 * chargeInfo.fraction,99).toFixed(2) + "%"

  return (<div style={{userSelect:"none"}}>
    <div style={{position: "relative", marginBottom:"5px", color:"#000000", backgroundColor:backColor, border:"2px solid", height:"25px",width:"80%", maxWidth:"320px"}}>
      <div style={{backgroundColor: barColor, border:"0px", height:"25px", width:progressBarWidth}}>
        <div style={{userSelect:"none",whiteSpace:"nowrap",lineHeight:"25px", position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b><>{formatNumber(chargeInfo.charges,state.numberFormat,3)} CHARGE{chargeInfo.charges !== 1 && "S"}{chargeInfo.capped && " (MAX)"}</></b></div>
      </div>
    </div><br/>
    {chargeInfo.capped && <b>Fully Charged!<br/></b>}
    {chargeInfo.amountMult === 0 && chargeInfo.isCharged && <>You can switch crystals!<br/><br/></>}
    {chargeInfo.amountMult === 0 && !chargeInfo.isCharges && <>Bar filled in {secondsToHms(chargeInfo.seconds)}<br/><br/></>}
    {chargeInfo.amountMult !== 0 && !chargeInfo.capped && <>Next Charge in {secondsToHms(chargeInfo.seconds)}<br/><br/></>}
    {/* Max Charges in {secondsToHms(chargeInfo.maxSeconds)}<br/> */}
    Charge Cap: {formatNumber(chargeInfo.cap,state.numberFormat,3)}&nbsp;&nbsp;<button onClick={increaseChargeCap} style={{color:"black"}} disabled={!chargeInfo.capped}>Upgrade</button><br/><br/>
  </div>)
}