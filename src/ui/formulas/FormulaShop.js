import { useContext } from "react"
import { AppContext } from "../App"
import stageDictionary, { stageList } from "../../content/StageDictionary"
import formulaDictionary, { textifyFormula } from "../../content/FormulaDictionary"
import ComponentMap from "../components/ComponentMap"
import ActionButton from "../components/ActionButton"

export default function FormulaShop() {
  const context = useContext(AppContext)
  const stage = stageDictionary[stageList[context.formulas.stageRun.currentStage]]
  return <div>
    <ComponentMap values={stage.formulas} mapping={(formula)=>
      <ActionButton key={formula.id} fullLine actionName={context.formulas.stageRun.formulaUnlocked[formula.id] ? "getFormula" : "unlockFormula"} parameters={{id: formula.id}}>{textifyFormula(formulaDictionary[formula.id], context)}</ActionButton>
    }/>
  </div>
}