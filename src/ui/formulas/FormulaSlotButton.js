import { useContext } from "react";
import formulaDictionary, { textifyFormula } from "../../content/FormulaDictionary";
import FancyButton from "../components/FancyButton";
import { AppContext } from "../App";
import ActionButton from "../components/ActionButton";

export default function FormulaSlotButton({formulaId, slot}) {
  const context = useContext(AppContext)
  return (<div>
    <FancyButton color="#CCFFCC" actionName="applyFormula" parameters={{slot}}>
      {textifyFormula(formulaDictionary[formulaId], context)}
    </FancyButton>
    <ActionButton actionName="unequipFormula" parameters={{slot}} text="Unequip"/>
    <ActionButton actionName="moveFormulaUp" parameters={{slot}}>&nbsp;&#708;&nbsp;</ActionButton>
    <ActionButton actionName="moveFormulaDown" parameters={{slot}}>&nbsp;&#709;&nbsp;</ActionButton>
    <br/>
  </div>)
}