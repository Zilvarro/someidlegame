import { useContext } from "react";
import { AppContext } from "../App";
import ComponentMap from "../components/ComponentMap";
import FormulaSlotButton from "./FormulaSlotButton";

export default function FormulaInventory() {
  const context=useContext(AppContext)
  const inventory = Object.assign(new Array(context.derived.inventorySize).fill(), context.formulas.stageRun.myFormulas)
  return (<div>

    <ComponentMap values={inventory} mapping={(formulaId, slot)=>(
      <FormulaSlotButton key={slot} slot={slot} formulaId={formulaId}/>
    )}/>
  </div>)
}