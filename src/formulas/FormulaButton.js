import {spaces,formatNumber} from '../utilities'
import formulaList from './FormulaDictionary'
import {getInventorySize} from '../savestate'

export const isLockedByChallenge = (state, formula)=>((state.activeChallenges.SIMPLEONLY && formula.complex) || 
    (state.activeChallenges.COMPLEX && !formula.complex && !formula.isBasic) ||
    (state.activeChallenges.NEWONLY && formula.effectLevel !== state.highestXTier))

export const getUnlockMultiplier = (formula, state)=>{
    let unlockMultiplier = 1
    let effectLevel = formula.effectLevel || formula.targetLevel

    if (formula.isBasic) {
        unlockMultiplier = 1
    } else {
        if (effectLevel < 1 && state.highestXTier >= 1) {
            formula.unlockMultiplier *= 4
        }
        if (effectLevel < 2 && state.highestXTier >= 2) {
            formula.unlockMultiplier *= 12
        }
        if (effectLevel < 3 && state.highestXTier >= 3) {
            formula.unlockMultiplier *= 8000
        }
    }
    return unlockMultiplier
}

export default function FormulaButton({state, popup, updateState, setTotalClicks, formulaName, context, myIndex}) {
    const applyFormula = (formula,evt)=>{
        if (state.settings.valueReduction === "CONFIRM" && 0.9999 * state.xValue[formula.targetLevel] > formula.applyFormula(state.formulaEfficiency[formula.targetLevel],state.xValue, state)) {
            popup.confirm("This will lower your X value. Are you sure?\n(You can skip this pop-up by using Shift+Click)",()=>{
                updateState({name: "applyFormula", formula: formula, updateState: updateState, forceApply: true})
                setTotalClicks((x)=>x+1)
            })
        } else {
            updateState({name: "applyFormula", formula: formula, updateState: updateState, forceApply: evt.shiftKey})
            setTotalClicks((x)=>x+1)
        }
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

    const toggleAutoApply = (event)=>{
        event.preventDefault()
        updateState({name:"toggleAutoApply", index:myIndex})
    }

    if (!formula) { //--- BUTTON
        return ( 
            <tr>{state.alphaUpgrades.AAPP && <td><input onClick={toggleAutoApply} disabled={state.activeChallenges.FULLYIDLE} style={{transform:"scale(1.2)"}} type="checkbox" checked={state.autoApply[myIndex]} readOnly></input></td>}
                <td align="left" className="block" style={{width:"auto"}}>
                <button className="fbutton" style={{backgroundColor:"#ffffff"}} disabled={true}>-------</button>
            </td><td>
            </td><td>
            </td>
            </tr>
        )
    } 

    let lockedByChallenge = isLockedByChallenge(state, formula)
    let applyNeed = formula.applyNeed
    let applyCost = formula.applyCost
    if (state.activeChallenges.SMALLINV && !state.anyFormulaUsed && state.formulaBought[formula.formulaName]) {
        applyCost = 0
        applyNeed = 0
    } else if (state.alphaUpgrades.FREF) {
        applyCost = 0
        applyNeed = formula.applyNeed + formula.applyCost
    }
    var tooltip = applyCost >= applyNeed ? (state.alphaUpgrades.FREF ? "Need":"Cost") + ": x=" + formatNumber(applyCost, state.settings.numberFormat) : "Need: x=" + formatNumber(applyNeed, state.settings.numberFormat)
    const delimiter = state.settings.shopPrices ? " / " : "\n"
    tooltip += formula && formula.explanation ? delimiter + formula.explanation : ""

    const freeFormulas = ["x+1","x'=1","x'=1","x'=1"]
    formula.isFree = formula.formulaName === freeFormulas[state.highestXTier]

    if (!formula.effectLevel) {
        formula.effectLevel = formula.targetLevel
    }

    const buttonColors=["#ffffff","#d6d6ff","#ffffcc","#ffcccc"]
    let buttonColor = buttonColors[0]
    switch (state.settings.colorizedFormulas) {
        case "NEW":
            if (formula.effectLevel === state.highestXTier)
                buttonColor = buttonColors[formula.effectLevel]
            break
        case "EFFECT":
            buttonColor = buttonColors[formula.effectLevel]
            break
        case "TARGET":
            buttonColor = buttonColors[formula.targetLevel]
            break
        case "ALL":
            buttonColor = buttonColors[state.highestXTier]
            break
        default:
    }

    formula.unlockMultiplier = getUnlockMultiplier(formula,state)
    if (formula.isBasic)
        tooltip = "Basic Formula"

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
            if (state.holdAction && (state.holdAction.formulaName===formula.formulaName)){
                updateState({name:"changeHold", newValue:null})
            }
            break
        default:
            console.error("Unexpected mouse event " + e.type)
        }

    }
    const moveFormulaUp = (e)=>{
        updateState({name:"swapFormulas", formulaName:formula.formulaName, isDownward:false})
    }
    const moveFormulaDown = (e)=>{
        updateState({name:"swapFormulas", formulaName:formula.formulaName, isDownward:true})
    }

    if (context === "my") { //APPLY BUTTON
        return (
            <tr>{state.alphaUpgrades.AAPP && <td><input onClick={toggleAutoApply} disabled={state.activeChallenges.FULLYIDLE} style={{transform:"scale(1.2)"}} type="checkbox" checked={state.autoApply[myIndex]} readOnly></input></td>}
                <td align="left" className="block" style={{width:"auto"}}>
                <button className="fbutton" title={tooltip} style={{backgroundColor: buttonColor}}
                    disabled={lockedByChallenge || state.activeChallenges.FULLYIDLE || !state.formulaUnlocked[formulaName] || (applyNeed && state.xValue[0] < applyNeed) || (applyCost && state.xValue[0] < applyCost)}
                    onClick={(evt)=>applyFormula(formula,evt)} onMouseDown={mouseHandler} onMouseUp={mouseHandler} onMouseLeave={mouseHandler} onTouchStart={mouseHandler} onTouchEnd={mouseHandler}>
                    {formula.description}
                </button>
            </td><td>
                {!state.formulaUnlocked[formulaName] && lockedByChallenge && <>{spaces()}Locked by Challenge</> }
                {!state.formulaUnlocked[formulaName] && !lockedByChallenge && <>{spaces()}Unlocks at x={formatNumber(formula.unlockCost * formula.unlockMultiplier, state.settings.numberFormat)}</> }
                {state.formulaUnlocked[formulaName] && !!applyCost && state.xValue[0] < applyCost && <>{spaces()}{state.alphaUpgrades.FREF ? "Need":"Cost"}: x={formatNumber(applyCost, state.settings.numberFormat)}</> }
                {state.formulaUnlocked[formulaName] && !!applyNeed && state.xValue[0] < applyNeed && <>{spaces()}Need: x={formatNumber(applyNeed, state.settings.numberFormat)}</>}
                {state.formulaUnlocked[formulaName] && state.xValue[0] >= applyNeed && state.xValue[0] >= applyCost && !state.formulaUsed[formulaName] && <>{spaces()}Click to apply formula!</>}
                {!state.formulaUsed[formulaName] && <>{spaces()}<button disabled={state.activeChallenges.FULLYIDLE} 
                    onClick={()=>discardFormula(formula)}>
                    UNEQUIP
                </button>&nbsp;<button onClick={moveFormulaUp} disabled={state.activeChallenges.FULLYIDLE}>&nbsp;&#708;&nbsp;</button>&nbsp;<button onClick={moveFormulaDown} disabled={state.activeChallenges.FULLYIDLE}>&nbsp;&#709;&nbsp;</button></>}
            </td><td>
            </td>
            <td align="left" className="block" style={{width:"auto"}}></td>
            </tr>
        )
    } else if (lockedByChallenge) { //LOCKED BY CHALLENGE (=>HIDDEN)
        return undefined
    } else if (state.formulaBought[formulaName]) { //EQUIPPED
        return (
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button disabled={true} className="fbutton" style={{backgroundColor: buttonColor}}>
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
                <button title={tooltip} className="fbutton" style={{backgroundColor: buttonColor}}
                    disabled={state.activeChallenges.FULLYIDLE || state.myFormulas.length >= getInventorySize(state)}
                    onClick={()=>getFormula(formula)}>
                    GET {formula.description}
                </button>
            </td><td>
                {spaces()}
            </td><td>
                {state.settings.shopPrices === "ON" && tooltip}
            </td></tr>
        )
    } else { //UNLOCK BUTTON
        if (formula.effectLevel > state.highestXTier) {
            return undefined;
        }
        return (
            <tr><td align="left" className="block" style={{"width":"auto"}}>
                <button className="fbutton" style={{backgroundColor: buttonColor}} title={tooltip}
                    disabled={state.activeChallenges.FULLYIDLE || (state.xValue[0] < formula.unlockCost * formula.unlockMultiplier && !formula.isFree)}
                    onClick={()=>unlockFormula(formula)}>
                    UNLOCK {formula.description}
                </button>
            </td><td>
                {spaces()}
            </td><td>
                {!formula.isFree ? <>Unlock{state.alphaUpgrades.AUNL ? "s" : ""} {state.alphaUpgrades.UREF ? "at" : "for" } x={formatNumber(formula.unlockCost * formula.unlockMultiplier, state.settings.numberFormat)}</> : <>First formula is free!!!</>}
            </td></tr>
        )
    }
}