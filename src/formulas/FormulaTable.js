import FormulaButton from './FormulaButton'
export default function FormulaTable({state, popup, updateState, setTotalClicks, formulaNames, context}) {
    return (
        <table><tbody>
            {formulaNames.map((formulaName, index)=>
                <FormulaButton key={index} myIndex={index} state={state} popup={popup} updateState={updateState} setTotalClicks={setTotalClicks} formulaName={formulaName} context={context}/>
            )}
        </tbody></table>
    )
}