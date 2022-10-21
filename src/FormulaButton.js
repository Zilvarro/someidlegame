import {spaces,formatNumber} from './utilities'
import formulaList from './FormulaDictionary'

export default function FormulaButton({state, updateState, setTotalClicks, formulaName, context}) {
    const applyFormula = (formula,evt)=>{
        updateState({name: "applyFormula", formula: formula, forceApply: evt.shiftKey})
        setTotalClicks((x)=>x+1)
    }

    const unlockFormula = (formula)=>{
        updateState({name: "unlockFormula", formula: formula})
        setTotalClicks((x)=>x+1)
    }

    const getFormula = (formula)=>{
        updateState({name: "getFormula", formula: formula})
        setTotalClicks((x)=>x+1)
    }

    const discardFormula = (formula)=>{
        updateState({name: "discardFormula", formula: formula})
        setTotalClicks((x)=>x+1)
    }

    var formula = formulaList[formulaName]
    if (!formula) { //--- BUTTON
        return ( 
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button className="fbutton" disabled={true}>-------</button>
            </td><td>
            </td><td>
            </td>
            </tr>
        )
    } 

    var tooltip = formula.applyCost >= formula.applyNeed ? "Cost: x=" + formatNumber(formula.applyCost, state.settings.numberFormat) : "Needed: x=" + formatNumber(formula.applyNeed, state.settings.numberFormat)
    tooltip += formula && formula.explanation ? "\n" + formula.explanation : ""
    formula.isFree = (formulaName === state.freeFormula) 

    if (!formula.effectLevel) {
        formula.effectLevel = formula.targetLevel
    }

    formula.unlockMultiplier = 1
    if (formula.isBasic) {
        tooltip = "Basic Formula"
    } else {
        if (formula.effectLevel < 1 && state.highestXTier >= 1) {
            formula.unlockMultiplier *= 4
        }
        if (formula.effectLevel < 2 && state.highestXTier >= 2) {
            formula.unlockMultiplier *= 12
        }
        if (formula.effectLevel < 3 && state.highestXTier >= 3) {
            formula.unlockMultiplier *= 8000
        }
    }

    if (formula.numberFormat !== state.settings.numberFormat)
        formula.description =  formula.descriptions?.[state.settings.numberFormat] || formula.description

    const mouseHandler = (e)=>{
        switch(e.type){
        case "mousedown":
        case "touchstart":
            updateState({name:"changeHold", newValue:{type:"ApplyFormula", formulaName:formula.formulaName, delay: 3}})
            break
        case "mouseup":
        case "mouseleave":
        case "touchend":
            if (state.holdAction){
                updateState({name:"changeHold", newValue:null})
            }
            break
        default:
            console.error("Unexpected mouse event " + e.type)
        }

    }
    const onDrop = (e)=>{
        updateState({name:"swapFormulas", formulaName:e.dataTransfer.getData("formulaname"), partnerFormulaName:formula.formulaName})
    }
    const onDragOver = (e)=>{
        e.preventDefault()
    }
    const onDragStart = (e)=>{
        e.dataTransfer.setData("formulaname", formula.formulaName)
    }
    const moveFormulaUp = (e)=>{
        updateState({name:"swapFormulas", formulaName:formula.formulaName, isDownward:false})
    }
    const moveFormulaDown = (e)=>{
        updateState({name:"swapFormulas", formulaName:formula.formulaName, isDownward:true})
    }

    if (context === "my") { //APPLY BUTTON
        return (
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button className="fbutton" title={tooltip} draggable={!state.formulaUsed[formula.formulaName]} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart}
                    disabled={(formula.applyNeed && state.xValue[0] < formula.applyNeed) || (formula.applyCost && state.xValue[0] < formula.applyCost)}
                    onClick={(evt)=>applyFormula(formula,evt)} onMouseDown={mouseHandler} onMouseUp={mouseHandler} onMouseLeave={mouseHandler} onTouchStart={mouseHandler} onTouchEnd={mouseHandler}>
                    {formula.description}
                </button>
            </td><td>
                {!!formula.applyCost && state.xValue[0] < formula.applyCost && <>{spaces()}Cost: x={formatNumber(formula.applyCost, state.settings.numberFormat)}</> }
                {!!formula.applyNeed && state.xValue[0] < formula.applyNeed && <>{spaces()}Needed: x={formatNumber(formula.applyNeed, state.settings.numberFormat)}</>}
                {state.xValue[0] >= formula.applyNeed && state.xValue[0] >= formula.applyCost && !state.formulaUsed[formulaName] && <>{spaces()}Click to apply formula!</>}
                {!state.formulaUsed[formulaName] && <>{spaces()}<button
                    onClick={()=>discardFormula(formula)}>
                    UNEQUIP
                </button><button onClick={moveFormulaUp}>&nbsp;&#708;&nbsp;</button><button onClick={moveFormulaDown}>&nbsp;&#709;&nbsp;</button></>}
            </td><td>
            </td>
            <td align="left" className="block" style={{width:"auto"}}></td>
            </tr>
        )
    } else if (state.formulaBought[formulaName]) { //EQUIPPED
        return (
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button disabled={true} className="fbutton">
                    EQUIPPED
                </button>
            </td><td>
                {spaces()}
            </td><td>
            </td></tr>
        )
    } else if (state.formulaUnlocked[formulaName]) { //GET BUTTON
        return (
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button title={tooltip} className="fbutton"
                    disabled={state.myFormulas.length >= state.inventorySize}
                    onClick={()=>getFormula(formula)}>
                    GET {formula.description}
                </button>
            </td><td>
                {spaces()}
            </td><td>
            </td></tr>
        )
    } else { //UNLOCK BUTTON
        if (formula.effectLevel > state.highestXTier) {
            return undefined;
        }
        return (
            <tr><td align="left" className="block" style={{"width":"auto"}}>
                <button className="fbutton" title={tooltip}
                    disabled={state.xValue[0] < formula.unlockCost * formula.unlockMultiplier && !formula.isFree}
                    onClick={()=>unlockFormula(formula)}>
                    UNLOCK {formula.description}
                </button>
            </td><td>
                {spaces()}
            </td><td>
                {!formula.isFree > 0 ? <>Unlock this formula for x={formatNumber(formula.unlockCost * formula.unlockMultiplier, state.settings.numberFormat)}</> : <>First one is free!!!</>}
            </td></tr>
        )
    }
}