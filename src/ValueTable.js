import {formatNumber} from './utilities'
export default function ValueTable({values, baseName, maxTier, numberFormat}) {
    return (
        <table><tbody>
            {values.slice(0,maxTier + 1).map((value, index)=>
                <tr key={index}>
                <td align="left" className="block" style={{"width":"auto"}}>{baseName}{"'".repeat(index)}</td>
                <td align="center" className="block" style={{"width":"auto"}}>&nbsp;&nbsp;=&nbsp;&nbsp;</td>
                <td align="right" className="block" style={{"width":"auto"}}>{formatNumber(value, numberFormat, 3)}</td>
                </tr>
            )}
        </tbody></table>
    )
}