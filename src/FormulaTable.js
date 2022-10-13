import FormulaButton from './FormulaButton'
export default function FormulaTable({state, updateState, setTotalClicks, formulaNames, context}) {
    return (
        <table><tbody>
            {formulaNames.map((formulaName, index)=>
                <FormulaButton key={index} state={state} updateState={updateState} setTotalClicks={setTotalClicks} formulaName={formulaName} context={context}/>
            )}
        </tbody></table>
    )
}