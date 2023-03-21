import {formatNumber} from '../utilities'
export default function ValueTable({values, diffs, baseName, maxTier, numberFormat}) {
    return (
        <table><tbody>
            {values.map((value, index)=>
                <tr key={index} style={{visibility: index > maxTier ? "hidden" : undefined}}>
                <td align="left" className="block" style={{"width":"auto"}}>{baseName}{"'".repeat(index)}</td>
                <td align="center" className="block" style={{"width":"auto"}}>&nbsp;&nbsp;=&nbsp;&nbsp;</td>
                <td align="right" className="block" style={{"width":"auto"}}>{formatNumber(value, numberFormat, 3,false,true)}</td>
                <td align="left" className="block" style={{"width":"auto"}}>{diffs[index] > 0 && <>&nbsp;&nbsp;&nbsp;&nbsp;(+{formatNumber(diffs[index], numberFormat, 3, false, true)}/s)</>}</td>
                </tr>
            )}
        </tbody></table>
    )
}