import ActionButton from "../components/ActionButton";

export default function FormulaResets() {
  return (<div>
    <ActionButton actionName="getWorldFormula" fullLine><b>DISCOVER THE WORLD FORMULA</b></ActionButton>
    <div className="ltrList">
      <ActionButton actionName="basicReset">Basic Reset</ActionButton>
      <ActionButton actionName="xReset">x-Reset</ActionButton>
      <ActionButton actionName="completeSegment">x-Reset C</ActionButton>
      <ActionButton actionName="alphaReset">&alpha;-Reset</ActionButton>
      <ActionButton actionName="completeChallenge"><b>Complete Challenge</b></ActionButton>
      <ActionButton actionName="abortAlphaRun">Abort</ActionButton>
      <ActionButton actionName="exitChallenge">Abort C</ActionButton>
    </div>
  </div>)
}