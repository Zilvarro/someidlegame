import Hotkeys from 'react-hot-keys';
import formulaList from './formulas/FormulaDictionary';

export default function KeyBoardHandler({state, updateState}) {

    const hotkeyApplyFormulaDown = (keyName, e, handle) => {
        const index = keyName - 1
        if (index >= state.myFormulas.length) return

        const formula = formulaList[state.myFormulas[index]]
        debugger
        if (e.repeat) {
            updateState({name: "changeHold", newValue:{type:"ApplyFormula", formulaName:formula.formulaName, delay: 0, temp: 10}})
        } else {
            updateState({name: "applyFormula", formula: formula})
        }
    }

    const hotkeyApplyFormulaUp = (keyName, e, handle) => {
        updateState({name:"changeHold", newValue:null})
    }

    const hotkeyXReset = (keyName, e, handle) => {
        updateState({name:"resetShop"})
    }

    const hotkeyAlphaReset = (keyName, e, handle) => {
        updateState({name:"resetShop"})
    }

    const hotkeyToggleAuto = (keyName, e, handle) => {
        updateState({name:"resetShop"})
    }

    const hotkeyAbortRun = (keyName, e, handle) => {
        updateState({name:"resetShop"})
    }



    return <>
            <div style={{ padding: "50px" }}>
                Deine Mudda is deine Mudda!
            </div>
        <Hotkeys keyName="1,2,3,4,5"  disabled={state.settings.hotkeyApplyFormula === "OFF"} onKeyDown={hotkeyApplyFormulaDown} onKeyUp={hotkeyApplyFormulaUp} allowRepeat={true}/>
        <Hotkeys keyName="x" disabled={state.settings.hotkeyXReset === "OFF"} onKeyDown={hotkeyXReset}/>
        <Hotkeys keyName="a" disabled={state.settings.hotkeyAlphaReset === "OFF"} onKeyDown={hotkeyAlphaReset}/>
        <Hotkeys keyName="t" disabled={state.settings.hotkeyToggleAuto === "OFF"} onKeyDown={hotkeyToggleAuto}/>
        <Hotkeys keyName="c" disabled={state.settings.hotkeyAbortRun === "OFF"} onKeyDown={hotkeyAbortRun}/>
    </>


}