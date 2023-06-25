import ActionButton from "../components/ActionButton";

//TODO Inline hints for new players (or maybe take these to Infos)

export default function FormulaResets() {
  return (<div>
    <ActionButton actionName="applyFormula" fullLine><b>DISCOVER THE WORLD FORMULA</b></ActionButton>
    <div className="ltrList">
      <ActionButton actionName="applyFormula">Basic Reset</ActionButton>
      <ActionButton actionName="applyFormula">x-Reset</ActionButton>
      <ActionButton actionName="applyFormula">&alpha;-Reset</ActionButton>
      <ActionButton actionName="applyFormula"><b>Complete Challenge</b></ActionButton>
      <ActionButton actionName="applyFormula">Abort</ActionButton>
    </div>
  </div>)
}