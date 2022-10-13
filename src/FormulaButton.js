import {spaces,formatNumber} from './utilities'

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

    const formulaList = {
        //Tier 1 Formulas
        "x+1": {
            formulaName: "x+1",
            description: <>x &rarr; x + 1</>,
            unlockCost: 20,
            applyCost: 0,
            applyNeed: 0,
            targetLevel: 0,
            isBasic: true,
            applyFormula: (x)=>(x[0] + 1),
        },
        "x+5": {
            formulaName: "x+5",
            description: <>x &rarr; x + 5</>,
            unlockCost: 50,
            applyCost: 0,
            applyNeed: 20,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 5),
        },
        "x+10": {
            formulaName: "x+10",
            description: <>x &rarr; x + 10</>,
            unlockCost: 500,
            applyCost: 0,
            applyNeed: 100,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 10),
        },
        "x+20": {
            formulaName: "x+20",
            description: <>x &rarr; x + 20</>,
            unlockCost: 2000,
            applyCost: 0,
            applyNeed: 300,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 20),
        },
        "x+50": {
            formulaName: "x+50",
            description: <>x &rarr; x + 50</>,
            unlockCost: 5000,
            applyCost: 0,
            applyNeed: 800,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 50),
        },
        "x+100": {
            formulaName: "x+100",
            description: <>x &rarr; x + 100</>,
            unlockCost: 12000,
            applyCost: 0,
            applyNeed: 2000,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 100),
        },

        //Tier 2 Formulas
        "x'=1": {
            formulaName: "x'=1",
            description: <>x' &rarr; 1</>,
            unlockCost: 0,
            applyCost: 0,
            applyNeed: 0,
            targetLevel: 1,
            isBasic: true,
            applyFormula: (x)=>(1),
        },
        "x'=16": {
            formulaName: "x'=16",
            description: <>x' &rarr; 16</>,
            unlockCost: 600,
            applyCost: 30,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(16),
        },
        "x'+1": {
            formulaName: "x'+1",
            description: <>x' &rarr; x' + 1</>,
            unlockCost: 3000,
            applyCost: 50,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(x[1] + 1),
        },
        "x+500": {
            formulaName: "x+500",
            description: <>x &rarr; x + 500</>,
            unlockCost: 100000, //*4
            applyCost: 0,
            applyNeed: 10000,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 500),
        },
        "x'+3": {
            formulaName: "x'+3",
            description: <>x' &rarr; x' + 3</>,
            unlockCost: 600000,
            applyCost: 300,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(x[1] + 3),
        },
        "x+x'": {
            formulaName: "x+x'",
            description: <>x &rarr; x + x'</>,
            unlockCost: 1e6,
            applyCost: 0,
            applyNeed: 10,
            targetLevel: 0,
            effectLevel: 1,
            applyFormula: (x)=>(x[0] + x[1]),
        },
        "x'+220": {
            formulaName: "x'+220",
            description: <>x' &rarr; x' + 220</>,
            unlockCost: 10e6,
            applyCost: 100000,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(x[1] + 220),
        },
        "x'=420K": {
            formulaName: "x'=420K",
            description: <>x' &rarr; 420K</>,
            unlockCost: 69e6,
            applyCost: 69,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(420000),
        },
        "x+50M": {
            formulaName: "x+50M",
            description: <>x &rarr; x + 50M</>,
            unlockCost: 500e6, //*4
            applyCost: 0,
            applyNeed: 1e6,
            targetLevel: 0,
            applyFormula: (x)=>(x[0] + 50e6),
        },

        //Tier 3 Formulas
        "x''=1": {
            formulaName: "x''=1",
            description: <>x'' &rarr; 1</>,
            unlockCost: 200,
            applyCost: 0,
            applyNeed: 0,
            targetLevel: 2,
            isBasic: true,
            applyFormula: (x)=>(1),
        },
        "x''=2": {
            formulaName: "x''=2",
            description: <>x'' &rarr; 2</>,
            unlockCost: 1500,
            applyCost: 100,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(2),
        },
        "x''=3": {
            formulaName: "x''=3",
            description: <>x'' &rarr; 3</>,
            unlockCost: 2800,
            applyCost: 1000,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(3),
        },
        "x''=#U": {
            formulaName: "x''=#U",
            description: <>x'' &rarr; 1.25<sup>#U</sup></>,
            unlockCost: 13000,
            applyCost: 5000,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(Math.floor(Math.pow(1.25,state.formulaUnlockCount))),
            explanation: "Boosted by number of unlocked formulas.",
        },
        "x'=1000*x''": {
            formulaName: "x'=1000*x''",
            description: <>x' &rarr; 1000x''</>,
            unlockCost: 111000,
            applyCost: 11000,
            applyNeed: 0,
            targetLevel: 1,
            effectLevel: 2,
            applyFormula: (x)=>(Math.floor(1000*x[2])),
        },
        "x''=sqrt(x)": {
            formulaName: "x''=sqrt(x)",
            description: <>x'' &rarr; x<sup>0.3</sup></>,
            unlockCost: 9e6,
            applyCost: 100000,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(Math.floor(Math.pow(x[0],0.3))),
        },
        "x''+1": {
            formulaName: "x''+1",
            description: <>x'' &rarr; x''  + 1</>,
            unlockCost: 1.9e9,
            applyCost: 100000,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(x[2]+1),
        },
        "x''+33": {
            formulaName: "x''+33",
            description: <>x'' &rarr; x'' + 130</>,
            unlockCost: 37e9,
            applyCost: 49e6,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(x[2]+130),
        },
        "x'=(x'+0.01x)^0.9": {
            formulaName: "x'=(x'+0.01x)^0.9",
            description: <>x' &rarr; (x' + 0.01x)<sup>0.9</sup></>,
            unlockCost: 100e9, //*12
            applyCost: 100e6,
            applyNeed: 0,
            targetLevel: 1,
            applyFormula: (x)=>(x[1]+Math.pow(x[0],0.7)),
        },
        "x''+10B": {
            formulaName: "x''+10B",
            description: <>x'' &rarr; x'' + 10B</>,
            unlockCost: 1e15, //??? check pricing
            applyCost: 200e6,
            applyNeed: 0,
            targetLevel: 2,
            applyFormula: (x)=>(x[2]+10e9),
        },
        "x+50P": {
            formulaName: "x+50P",
            description: <>x &rarr; x + 50P</>,
            unlockCost: 1e17, //*48
            applyCost: 0, 
            applyNeed: 100e6,
            targetLevel: 0,
            applyFormula: (x)=>(x[0]+50e18),
        },

        //Tier 4 Formulas
        "x'''=1": {
            formulaName: "x'''=1",
            description: <>x''' &rarr; 1</>,
            unlockCost: 2000,
            applyCost: 0,
            applyNeed: 0,
            targetLevel: 3,
            isBasic: true,
            applyFormula: (x)=>(1),
        },
        "x'''=(#U^2)/12": {
            formulaName: "x'''=(#U^2)/12",
            description: <>x''' &rarr; #U<sup>2</sup>/12</>,
            unlockCost: 1e6,
            applyCost: 300,
            applyNeed: 0,
            targetLevel: 3,
            applyFormula: (x)=>(Math.floor(Math.pow(state.formulaUnlockCount,2)/12)),
            explanation: "Boosted by number of unlocked formulas.",
            
        },
        "x'''=4": {
            formulaName: "x'''=4",
            description: <>x''' &rarr; 4</>,
            unlockCost: 10000,
            applyCost: 100,
            applyNeed: 0,
            targetLevel: 3,
            applyFormula: (x)=>(4),
        },
        "x'''=sqrt(#R)": {
            formulaName: "x'''=sqrt(#R)",
            description: <>x''' &rarr; sqrt(#R)</>,
            unlockCost: 50000,
            applyCost: 20000,
            applyNeed: 0,
            targetLevel: 3,
            applyFormula: (x)=>(Math.floor(Math.sqrt(state.xResetCount))),
            explanation: "Boosted by number of X-Resets.",
        },
        "x'+x''+x'''": {
            formulaName: "x'+x''+x'''",
            description: <>x' &rarr; x'+x''+x'''</>,
            unlockCost: 80e6,
            applyCost: 2e5,
            applyNeed: 0,
            targetLevel: 1,
            effectLevel: 3,
            applyFormula: (x)=>(Math.floor(x[1]+x[2]+x[3])),
        },
        "x''+x'''^2": {
            formulaName: "x''+x'''^2",
            description: <>x'' &rarr; x''+x'''<sup>2</sup></>,
            unlockCost: 10e9,
            applyCost: 2e6,
            applyNeed: 0,
            targetLevel: 2,
            effectLevel: 3,
            applyFormula: (x)=>(Math.floor(x[2]+Math.pow(x[3],2))),
        },
        "x'''+1": {
            formulaName: "x'''+1",
            description: <>x''' &rarr; x'''+1</>,
            unlockCost: 4e12,
            applyCost: 400,
            applyNeed: 0,
            targetLevel: 3,
            applyFormula: (x)=>(x[3]+1),
        },
        "x+x'*x'''": {
            formulaName: "x+x'*x'''",
            description: <>x &rarr; x' / x'' * x'''<sup>4</sup></>,
            unlockCost: 2e15,
            applyCost: 0,
            applyNeed: 1e9,
            targetLevel: 0,
            effectLevel: 3,
            applyFormula: (x)=>(1e16*x[3]*x[2]/x[1]),
        },
    }
    //Größenordnung nächstes S'''-Upgrade: 100P?

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

    var tooltip = formula.applyCost >= formula.applyNeed ? "Cost: x=" + formatNumber(formula.applyCost) : "Needed: x=" + formatNumber(formula.applyNeed)
    tooltip += formula && formula.explanation ? "\n" + formula.explanation : ""
    if (formulaName === state.freeFormula) {
        formula.isFree = true
        formula.unlockCost = 0
    }

    if (!formula.effectLevel) {
        formula.effectLevel = formula.targetLevel
    }

    if (formula.isBasic) {
        tooltip = "Basic Formula"
    } else {
        if (formula.effectLevel < 1 && state.highestXTier >= 1) {
            formula.unlockCost *= 4
        }
        if (formula.effectLevel < 2 && state.highestXTier >= 2) {
            formula.unlockCost *= 12
        }
        if (formula.effectLevel < 3 && state.highestXTier >= 3) {
            formula.unlockCost *= 8000
        }
    }

    if (context === "my") { //APPLY BUTTON
        return (
            <tr><td align="left" className="block" style={{width:"auto"}}>
                <button className="fbutton" title={tooltip}
                    disabled={(formula.applyNeed && state.xValue[0] < formula.applyNeed) || (formula.applyCost && state.xValue[0] < formula.applyCost)}
                    onClick={(evt)=>applyFormula(formula,evt)}>
                    {formula.description}
                </button>
            </td><td>
                {!!formula.applyCost && state.xValue[0] < formula.applyCost && <>{spaces()}Cost: x={formatNumber(formula.applyCost)}</> }
                {!!formula.applyNeed && state.xValue[0] < formula.applyNeed && <>{spaces()}Needed: x={formatNumber(formula.applyNeed)}</>}
                {state.xValue[0] >= formula.applyNeed && state.xValue[0] >= formula.applyCost && !state.formulaUsed[formulaName] && <>{spaces()}Click to apply formula!</>}
                {!state.formulaUsed[formulaName] && <>{spaces()}<button
                    onClick={()=>discardFormula(formula)}>
                    UNEQUIP
                </button></>}
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
                    disabled={state.xValue[0] < formula.unlockCost}
                    onClick={()=>unlockFormula(formula)}>
                    UNLOCK {formula.description}
                </button>
            </td><td>
                {spaces()}
            </td><td>
                {formula.unlockCost > 0 ? <>Unlock this formula for x={formatNumber(formula.unlockCost)}</> : <>First one is free!!!</>}
            </td></tr>
        )
    }
}