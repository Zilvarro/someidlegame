import { useContext } from "react";
import ActionButton from "../components/ActionButton";
import { AppContext } from "../App";
import ComponentMap from "../components/ComponentMap";
import formulaDictionary, { textifyFormula } from "../../content/FormulaDictionary";

export default function FormulaInventory() {
  const context=useContext(AppContext)
  return (<div>
    <ComponentMap values={context.formulas.stageRun.myFormulas} mapping={(formulaId, index)=>(
      <ActionButton key={index} actionName="applyFormula" parameters={{id:formulaId}} fullLine>{textifyFormula(formulaDictionary[formulaId], context)}</ActionButton>
    )}/>
  </div>)
}