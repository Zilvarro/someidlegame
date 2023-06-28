import { useContext } from "react"
import { AppContext } from "../App"
import stageDictionary, { stageList } from "../../content/StageDictionary"
import ComponentMap from "../components/ComponentMap"
import FormulaShopButton from "./FormulaShopButton"

export default function FormulaShop() {
  const context = useContext(AppContext) 
  const stage = stageDictionary[stageList[context.formulas.stageRun.currentStage]]
  return <div>
    <ComponentMap values={stage.formulas} mapping={(formula, index)=>
      <FormulaShopButton key={index} formulaId={formula.id} index={index}/>
    }/>
  </div>
}