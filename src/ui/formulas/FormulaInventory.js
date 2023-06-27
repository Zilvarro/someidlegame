import { useContext } from "react";
import { AppContext } from "../App";
import ComponentMap from "../components/ComponentMap";
import FormulaSlotButton from "./FormulaSlotButton";

export default function FormulaInventory() {
  const context=useContext(AppContext)
  return (<div>

    <ComponentMap values={context.formulas.stageRun.myFormulas} mapping={(formulaId, slot)=>(
      <FormulaSlotButton key={slot} slot={slot} formulaId={formulaId}/>
    )}/>
  </div>)
}