import { useContext } from "react"
import { formatNumber } from "../../utilities/formatter"
import { AppContext } from "../App"
import { layers } from "../../game/constants"
import ComponentMap from "./ComponentMap"

const currencyDictionary = {
  "X": {
    id: "X",
    symbol: <>x</>,
    layer: layers.formulas,
    getValue: (context)=>(context.formulas.basicRun.xValues[0]),
  },
  "ALPHATOKENS": {
    id: "ALPHATOKENS",
    symbol: <>&alpha;</>,
    layer: layers.alpha,
    getValue: (context)=>(context.alpha.tokens),
  },
  "WORLDESSENCE": {
    id: "WORLDESSENCE",
    symbol: <>&#969;</>,
    layer: layers.world,
    getValue: (context)=>(context.world.essence),
  },
  "VOIDENERGY": {
    id: "VOIDENERGY",
    symbol: <>&#120599;</>, //&thetasym;
    layer: layers.void,
    getValue: (context)=>(context.void.energy),
  },
  "STARLIGHT": {
    id: "STARLIGHT",
    symbol: <>&lambda;</>,
    layer: layers.destiny,
    getValue: (context)=>(context.destiny.starlightRun.light),
  },
  "DESTINYSTARS": {
    id: "DESTINYSTARS",
    symbol: <>&#9733;</>,
    layer: layers.destiny,
    getValue: (context)=>(context.destiny.stars),
    symboloffset: "-6px",
  },
}

const currencyList = ["X", "ALPHATOKENS", "WORLDESSENCE", "VOIDENERGY", "STARLIGHT", "DESTINYSTARS"]
const currencies = currencyList.map((currencyName)=>currencyDictionary[currencyName])
export default function HeaderValues() {
  const context = useContext(AppContext)
  const layout = context.settings.headerDisplay

  switch (layout) {
    case "OFF":
      return undefined
    case "VERTICAL":
      return (<table><tbody style={{fontSize: "24px", fontWeight:"bold", marginLeft: "20px", marginBottom: "10px", textAlign:"left", verticalAlign:"middle"}}>
        <ComponentMap values={currencies} mapping={(currency)=><tr key={currency.id}>
          <td align="center"><div style={{height:"24px", marginTop:currency.symboloffset}}>{currency.symbol}</div></td>
          <td align="center"><div style={{height:"24px"}}>&nbsp;&nbsp;=&nbsp;&nbsp;</div></td>
          <td align="right"><div style={{height:"24px"}}>{formatNumber(currency.getValue(context), context.settings.numberFormat, 6, false, false)}</div></td>
        </tr>}/>
      </tbody></table>)
    case "HORIZONTAL":
      return <div className="ltrList" style={{fontSize: "36px", fontWeight:"bold", marginBottom: "10px", textAlign:"left"}}>
        <ComponentMap values={currencies} mapping={(currency)=>
          <span key={currency.id} style={{marginRight:"50px"}}>{currency.symbol}&nbsp;=&nbsp;{formatNumber(currency.getValue(context), context.settings.numberFormat, 6, false, false)}</span>
        }/>
      </div>
    default:
      const currency = currencyDictionary[layout]
      if (!currency) return undefined
      return <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>
        {currency.symbol}&nbsp;=&nbsp;{formatNumber(currency.getValue(context), context.settings.numberFormat, 6, false, false)}
      </h1>
  }
}