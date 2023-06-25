import { useContext } from "react";
import SplitLayout, { SplitColumn } from "./SplitLayout";
import ValueTable from "./ValueTable";
import { AppContext } from "../App";
import FormulaResets from "./FormulaResets";
import FormulaAutomation from "./FormulaAutomation";
import FormulaInventory from "./FormulaInventory";
import FormulaInfos from "./FormulaInfos";
import GreenBar from "./GreenBar";
import FormulaShop from "./FormulaShop";

export default function FormulaScreen() {
  const context = useContext(AppContext)
  const formulas = context.formulas
  return <div style={{color: "#99FF99"}}>
    <SplitLayout>
      <SplitColumn>
        <h2 style={{marginTop:"0px"}}>X Values</h2>
        <ValueTable values={formulas.basicRun.xValues} diffs={[0,0,0,0]} />
        <br/>
        <FormulaResets/>
        <h2>My Formulas</h2>
        <FormulaInventory/>
        <br/>
        <FormulaAutomation/>
        <FormulaInfos/>
        <GreenBar/>
      </SplitColumn>
      <SplitColumn>
        {/* TODO Indicate full inventory */}
        <h2 style={{marginTop:"0px"}}>Shop</h2> 
        <FormulaShop/>
      </SplitColumn>
    </SplitLayout>
  </div>
}