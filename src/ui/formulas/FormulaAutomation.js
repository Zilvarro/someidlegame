import { useContext } from "react";
import ActionButton from "../components/ActionButton";
import DropdownSelectButton from "../components/DropdownSelectButton";
import ToggleSelectButton from "../components/ToggleSelectButton";
import { AppContext } from "../App";

export default function FormulaAutomation() {
  const context = useContext(AppContext)
  const automationSettings = context.alpha
  const updateStatus = (settingName, newStatus)=>{
    context.perform("changeAlphaSetting", {settingName, newStatus})
  }  
  const validateStatus = (settingName, newStatus)=>{
    return context.game.validate("changeAlphaSetting", {settingName, newStatus})
  }  

  return (<div>
    <div className="ltrList">
      <ActionButton actionName="memorize">Memorize</ActionButton>
      <ActionButton actionName="remember">Remember</ActionButton>
      <ActionButton actionName="unequipAll">Unequip</ActionButton>
      <ActionButton actionName="toggleAutoAll">Auto</ActionButton>
    </div>
    <div className="ltrList">
      <ActionButton actionName="changeLoadout" parameters={{index:0}}><b>Loadout A</b></ActionButton>
      <ActionButton actionName="changeLoadout" parameters={{index:1}}><b>Loadout B</b></ActionButton>
      <ActionButton actionName="changeLoadout" parameters={{index:2}}><b>Loadout C</b></ActionButton>
    </div>
    <div className="ltrList">
      <ToggleSelectButton settingName="autoResetterX" settings={automationSettings} updateStatus={updateStatus} validateStatus={validateStatus} statusList={["ON","OFF"]} description={<>X-Resetter</>}/>
      <ToggleSelectButton settingName="autoRemembererActive" settings={automationSettings} updateStatus={updateStatus} validateStatus={validateStatus} statusList={["ON","OFF"]} description={<>Rememberer</>}/>
    </div>
    <div className="ltrList">
      <ToggleSelectButton settingName="autoResetterA" settings={automationSettings} updateStatus={updateStatus} validateStatus={validateStatus} statusList={["ON","OFF"]} description={<>&alpha;-Resetter</>}/>
      <DropdownSelectButton settingName="alphaThreshold" settings={automationSettings} updateStatus={updateStatus} validateStatus={validateStatus} statusList={["MINIMUM","1e40"]} />
    </div>
  </div>)
}