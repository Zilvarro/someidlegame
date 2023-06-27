import { useContext } from "react";
import formulaDictionary, { textifyFormula } from "../../content/FormulaDictionary";
import FancyButton from "../components/FancyButton";
import { AppContext } from "../App";

export default function FormulaShopButton({formulaId, index, actionName}) {
  const context = useContext(AppContext)
  const stageRun = context.formulas.stageRun
  const isUnlocked = stageRun.formulaUnlocked[formulaId]
  const isBought = stageRun.formulaBought[formulaId]

  if (!isUnlocked) {
    return (<div>
      <FancyButton color="#CCFFCC" actionName="unlockFormula" parameters={{index}}>
        UNLOCK {textifyFormula(formulaDictionary[formulaId], context)}
      </FancyButton>
      <br/>
    </div>)
  } else if (!isBought) {
    return (<div>
      <FancyButton color="#CCFFCC" actionName="getFormula" parameters={{index}}>
        GET {textifyFormula(formulaDictionary[formulaId], context)}
      </FancyButton>
      <br/>
    </div>)
  } else {
    return (<div>
      <FancyButton color="#CCFFCC" actionName="" parameters={{index}}>
        EQUIPPED
      </FancyButton>
      <br/>
    </div>)
  }

}