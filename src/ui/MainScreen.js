import { useContext } from "react";
import Test from "../Test";
import { AppSuperContext } from "./App";
import TabContent from "./components/TabContent";
import OptionScreen from "./options/OptionScreen";
import Placeholder from "./Placeholder";

export default function MainScreen() {
  const context = useContext(AppSuperContext)

  const hasNewMail = false

  const selectTab = (tabKey)=>{
    context.perform({name: "selectTab", tabKey: tabKey})
    window.scrollTo(0,0)
  }

  return <>
    Hello Guys
    <Test>Hello World! lulul</Test>
    <TabContent selectedTabKey={context.save.general.selectedTabKey}>
      <Placeholder tabKey="FormulaScreen"/>
      <Placeholder tabKey="AlphaScreen"/>
      <Placeholder tabKey="DestinyScreen"/>
      <Placeholder tabKey="WorldScreen"/>
      <Placeholder tabKey="VoidScreen"/>
      <Placeholder tabKey="MilestoneScreen"/>
      <Placeholder tabKey="MailScreen"/>
      <OptionScreen tabKey="OptionScreen"/>
    </TabContent>
    <br/><br/><br/>
    <footer>
    <span style={{display:"inline-block"}}>
      <button style={{backgroundColor: "#99FF99", border:"2px solid", padding:"5px", margin:"5px", marginLeft:"10px", fontWeight:"bold"}} onClick={()=>selectTab("FormulaScreen")}>Formulas</button>
      <button style={{backgroundColor: "#ff7777", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("AlphaScreen")}>Alpha</button>
      <button style={{backgroundColor: "#44FFCC", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("WorldScreen")}>World</button>
      <button style={{backgroundColor: "#AA55AA", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("VoidScreen")}>Void</button>
      <button style={{backgroundColor: "#FFFF88", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("DestinyScreen")}>Destiny</button>
    </span>
    <span style={{display:"inline-block"}}>
      <button style={{margin:"5px"}} onClick={()=>selectTab("MilestoneScreen")}>Milestones</button>
      <button style={{margin:"5px", fontWeight: hasNewMail ? "700" : undefined, background: hasNewMail ? "#FFAA66" : undefined}} onClick={()=>selectTab("MailScreen")}>Mails</button>
      <button style={{margin:"5px"}} onClick={()=>selectTab("OptionScreen")}>Options</button>
    </span>
    </footer>
  </>
}
