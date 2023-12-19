import { useContext } from "react"
import { AppContext } from "../App"
import { ALPHATARGET, layers } from "../../game/constants"

export default function GreenBar() {
  const context = useContext(AppContext)
  if (context.maingame.progressionLayer !== layers.formulas)
    return undefined
  
  const progressBarWidth = Math.min(100 * Math.log10(Math.max(context.formulas.basicRun.xValues[0],1)) / Math.log10(ALPHATARGET),99).toFixed(0) + "%"
  //debugger
  const joinAcademy = ()=>{
    context.popup.confirm("You lose all your differentials but you join the Academy and gain a powerful Alpha Token.",()=>{
      context.perform("joinAcademy")
    })
  }

  if (context.formulas.basicRun.xValues[0] >= ALPHATARGET) {
    return <div><button onClick={joinAcademy} style={{backgroundColor:"#99FF99", fontWeight:"bold", border:"2px solid", height:"25px", width:"280px"}}>
      JOIN THE ACADEMY
    </button></div>
  } else {
    return <div style={{color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"25px",width:"280px"}}>
      <div style={{backgroundColor:"#99FF99", border:"0px", height:"25px", width:progressBarWidth}}></div>
    </div>
  }

}