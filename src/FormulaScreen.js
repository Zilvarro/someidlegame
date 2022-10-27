import FormulaTable from './FormulaTable'
import ValueTable from './ValueTable'
import {getStartingX} from './savestate'
import {spaces,formatNumber} from './utilities'

export default function FormulaScreen({state, updateState, setTotalClicks, popup}) {
    const resetXValues = ()=>{
      popup.confirm("Your x values are reset, but you can change your equipped formulas.",()=>{
          updateState({name: "resetXValues"})
          setTotalClicks((x)=>x+1)
      })
    }
    
    const resetShop = ()=>{
      const shopMultipliers = [4, 12, 8000, 1]
      const shopMultiplier = shopMultipliers[state.highestXTier]
      popup.confirm("A new differential of x and its formulas become available, but the shop is reset and the unlock cost for all non-basic formulas is " + shopMultiplier + " times as high.",()=>{
        updateState({name: "upgradeXTier"})
        updateState({name: "resetShop"})
        setTotalClicks((x)=>x+1)
      })
    }
    
    const performAlphaReset = ()=>{
      popup.confirm("You lose all your differentials but you gain a powerful Alpha Point.",()=>{
        updateState({name: "alphaReset"})
        updateState({name: "resetShop"})
        setTotalClicks((x)=>x+1)
      })
    }
  
    const buyAlphaUpgrade = (id)=>{
        updateState({name: "alphaUpgrade", id: id})
        setTotalClicks((x)=>x+1)
    }

    const shopFormulas=[
      "x'=1",
      "x+1",
      "x''=1",
      "x'''=1",
      "x'''=4",
      "x'''=sqrt(#R)",
      "x'''=(#U^2)/12",
      "x''=2",
      "x+5",
      "x''=3",
      "x'=24",
      "x'+x''+x'''",
      "x''=#U",
      "x+10",
      "x'+1",
      "x+20",
      "x'=1000*x''",
      "x+50",
      "x+100",
      "x''+x'''^2",
  
      "x+1000",
      "x'+3",
      "x''=sqrt(x)",
      "x+x'",
      "x'+220",
      "x'''+1",
      "x'=420K",
      "x''+1",
      "x+50M",
      "x''+130",
      "x=10Q*x'''*x''/x'",
  
      "x'+x^0.6",
      "x''+10B",
      "x'=5Q*x'''",
      "x'''+log2(x)^2",
      "x+50P",

      "x'''+log2(#F/#E)^13",
      "x'+30S",
      "x''+40P",
      "x'''*sqrt(300S-x''')/500B",
      "x'''+5S",
    ]
  
    const differentialTargets = [30e3,30e9,30e21,Infinity]
    const differentialTarget = differentialTargets[state.highestXTier]
    const alphaTarget = 30e33
  
    const formulasForXReset = state.inventorySize - state.formulaUnlockCount + 1
  
    const inventoryFormulas = Object.assign(new Array(state.inventorySize).fill(), state.myFormulas)

    return (<>
        {<h1 style={{fontSize: "40px", marginLeft: "10px", textAlign:"left"}}>x={formatNumber(state.xValue[0], state.settings.numberFormat, 8)}</h1>}
        <div className="row"><div className="column">
        <h2>X Values</h2>
            <ValueTable values={state.xValue} baseName={"x"} maxTier={state.highestXTier} numberFormat={state.settings.numberFormat}/>
            {state.inventorySize < state.formulaUnlockCount ? 
            <p>{spaces()}<button onClick={resetXValues} disabled={!state.anyFormulaUsed}>X-Reset</button>{state.mileStoneCount === 1 && <>{spaces()}&larr; Reset x, but you can adapt your equipped formulas.</>}</p> :
            <p>Unlock {formulasForXReset} more formula{formulasForXReset !== 1 && "s"} to enable X-Resets</p>
            }
            {state.mileStoneCount >= 2 && state.highestXTier < 3 && (state.xValue[0] >= differentialTarget ? 
            <p>{spaces()}<button onClick={resetShop}>S-Reset</button>{spaces()}Reset the shop for a new differential</p> :
            <p>Reach x={formatNumber(differentialTarget, state.settings.numberFormat)} to discover a new differential of x</p>)
            }
            {state.highestXTier === 3 && (state.xValue[0] >= alphaTarget ? 
            <p>{spaces()}<button onClick={performAlphaReset}>&alpha;-Reset</button>{spaces()}Reset the game to increase your maximum alpha</p> :
            <p>Reach x={formatNumber(alphaTarget, state.settings.numberFormat)} to unlock the next layer</p>)
            }
        <p>&nbsp;</p><h2>My Formulas</h2>
            <FormulaTable state={state} updateState={updateState} popup={popup} setTotalClicks={setTotalClicks} formulaNames={inventoryFormulas} context="my"/>
            {state.mileStoneCount >= 1 && state.mileStoneCount <=2 && 
            <p>Hint: You can apply formulas repeatedly by holding the button or using Enter</p>
            }
        {state.maxAlpha > 0 && <><p>&nbsp;</p><h2>Alpha</h2>
            <p>&alpha; = {state.alpha}</p>
            <p>&alpha;<sub>max</sub> = {state.maxAlpha}</p>
            <p>Your Alpha Max lets you start with x={getStartingX(state)} after resets</p>
            <p><button disabled={state.alpha < 1 || state.boughtAlpha[0]} onClick={()=>{buyAlphaUpgrade(0)}}>Get an extra formula slot</button>{spaces()}{state.boughtAlpha[0] ? <>Already bought</>: <>Cost: &alpha; = 1</>}</p>
            <p><button disabled={state.alpha < 2 || state.boughtAlpha[1]} onClick={()=>{buyAlphaUpgrade(1)}}>Double all idle production</button>{spaces()}{state.boughtAlpha[1] ? <>Already bought</>: <>Cost: &alpha; = 2</>}</p></>}
        </div><div className="column">
        <h2>Shop {state.myFormulas.length >= state.inventorySize && <>{spaces()}[FULL INVENTORY]</>}</h2>
            <FormulaTable state={state} updateState={updateState} popup={popup} setTotalClicks={setTotalClicks} formulaNames={shopFormulas}/>
        </div></div>
    </>)
}