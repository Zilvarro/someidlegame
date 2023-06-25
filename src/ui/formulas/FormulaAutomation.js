import ActionButton from "../components/ActionButton";

export default function FormulaAutomation() {
  return (<div>
    <div className="ltrList">
      <ActionButton actionName="applyFormula">Memorize</ActionButton>
      <ActionButton actionName="applyFormula">Remember</ActionButton>
      <ActionButton actionName="applyFormula">Unequip</ActionButton>
      <ActionButton actionName="applyFormula">Auto</ActionButton>
    </div>
    <div className="ltrList">
      <ActionButton actionName="applyFormula"><b>Loadout A</b></ActionButton>
      <ActionButton actionName="applyFormula"><b>Loadout B</b></ActionButton>
      <ActionButton actionName="applyFormula"><b>Loadout C</b></ActionButton>
    </div>
    <div className="ltrList">
      <ActionButton actionName="applyFormula">X Resetter: OFF</ActionButton>
      <ActionButton actionName="applyFormula">Rememberer: OFF</ActionButton>
    </div>
    <div className="ltrList">
      <ActionButton actionName="applyFormula">&alpha; Resetter: OFF</ActionButton>
      <ActionButton actionName="applyFormula">Target: MINIMUM</ActionButton>
    </div>
  </div>)
}