import { useContext } from "react"
import { save } from "./engine/saveload"
import { AppSuperContext } from "./ui/App"

export default function Test() {
  const context = useContext(AppSuperContext)
  const xValue = context.game.save.maingame.formulas.basicRun.xValue
  return <>
    Hello World! {xValue[0]} lulul<br/>
    <button onClick={()=>{context.updateGame({name:"applyFormula", amount:4})}}>ClickMe</button>
    <button onClick={()=>save("testname", context.game.save)}>Save</button>
    <button onClick={()=>context.popup.alert("blabla")}>Show Popup</button>
  </>
}