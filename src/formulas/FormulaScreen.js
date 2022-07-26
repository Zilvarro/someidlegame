import FormulaTable from './FormulaTable'
import {getUnlockMultiplier} from './FormulaButton'
import ValueTable from './FormulaValueTable'
import formulaList from './FormulaDictionary'
import {spaces,formatNumber, secondsToHms} from '../utilities'
import {getInventorySize, differentialTargets, alphaTarget, getAlphaRewardTier} from '../savestate'

export const shopFormulas=[
  "x'=1",
  "x+1",
  "x''=1",
  "x'''=1",
  "x'''=4",
  "x'''=sqrt(2*#R)",
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
  "x''+1V",
  "x'''+5S",
]

export default function FormulaScreen({state, updateState, setTotalClicks, popup}) {
    const resetXValues = ()=>{
      popup.confirm("Your x values are reset, but you can change your equipped formulas.",()=>{
          updateState({name: "resetXValues"})
          setTotalClicks((x)=>x+1)
      }, state.settings.xResetPopup === "OFF")
    }
    
    const resetShop = ()=>{
      const shopMultipliers = [4, 12, 8000, 1]
      const shopMultiplier = shopMultipliers[state.highestXTier]
      popup.confirm("A new differential of x and its formulas become available, but the shop is reset and the unlock cost for all non-basic formulas is " + shopMultiplier + " times as high.",()=>{
        updateState({name: "upgradeXTier"})
        updateState({name: "resetShop"})
        setTotalClicks((x)=>x+1)
      }, state.progressionLayer >= 1)
    }
    
    const performAlphaReset = ()=>{
      popup.confirm("You lose all your differentials but you gain a powerful Alpha Token.",()=>{
        updateState({name: "alphaReset"})
        setTotalClicks((x)=>x+1)
      }, state.progressionLayer >= 1)
    }

    const abortAlphaReset = ()=>{
      popup.confirm("Abort the current Alpha Run?",()=>{
        updateState({name: "alphaReset"})
        setTotalClicks((x)=>x+1)
      })
    }

    const negativeSpaceInfo = ()=>{
      popup.alert(<>When an X-Value becomes negative, you enter Negative Space.<br/>While in Negative Space: x-Resets, Alpha-Resets and Challenge Completions are disabled.<br/>You can leave Negative Space by doing a Basic Reset or aborting your run.</>)
    }

    const completeChallenge = ()=>{
      updateState({name: "alphaReset"})
      setTotalClicks((x)=>x+1)
    }

    const getWorldFormula = ()=>{
      updateState({name: "startEnding", endingName:"worldselect"})
      setTotalClicks((x)=>x+1)
    }

    const memorize = ()=>{
      updateState({name: "memorize"})
    }

    const remember = ()=>{
      updateState({name: "remember"})
    }

    const selectLoadout = (index)=>{
      updateState({name: "selectLoadout", index:index})
    }

    const clearLoadout = ()=>{
      updateState({name: "clearLoadout"})
    }

    const toggleAutoApply = ()=>{
      updateState({name:"toggleAutoApply", all:true})
    }

    const sResetNames = ["x'", "x''", "x'''", "N/A"]
    const sResetName = sResetNames[state.highestXTier]


    const differentialTarget = differentialTargets[state.highestXTier]
  
    const inventoryFormulas = Object.assign(new Array(getInventorySize(state)).fill(), state.myFormulas)

    const progressBarWidth = Math.min(100 * Math.log10(Math.max(state.xValue[0],1)) / Math.log10(alphaTarget),99).toFixed(0) + "%"

    const alphaRewardTier = getAlphaRewardTier(state.xValue[0])

    const nextUnlockCost = state.autoUnlockIndex < shopFormulas.length ? formulaList[shopFormulas[state.autoUnlockIndex]].unlockCost * getUnlockMultiplier(formulaList[shopFormulas[state.autoUnlockIndex]],state) : Infinity

    return (<div style={{color: "#99FF99"}}>
        <div className="row" style={{marginTop:"0px"}}><div className="column">
        <h2 style={{marginTop:"0px"}}>X Values</h2>
            <ValueTable values={state.xValue} baseName={"x"} maxTier={state.highestXTier} numberFormat={state.settings.numberFormat}/>
            <br/>
            {(state.mileStoneCount >= 2 || state.formulaUnlockCount >= 4) &&
              <>{spaces()}<button onClick={resetXValues} disabled={state.activeChallenges.FULLYIDLE || state.activeChallenges.ONESHOT || !state.anyFormulaUsed}>Basic Reset</button>{state.mileStoneCount === 1 && <>{spaces()}&larr; Reset x, but you can adapt your equipped formulas.</>}</>
            }
            {(state.mileStoneCount >= 3 || (state.mileStoneCount === 2 && state.xValue[0] >= differentialTarget)) && state.highestXTier < 3 && 
              <>{spaces()}<button disabled={state.inNegativeSpace || state.activeChallenges.FULLYIDLE || state.xValue[0] < differentialTarget} onClick={resetShop}>{sResetName}-Reset</button>{state.mileStoneCount === 2 && <>{spaces()}&larr; Reset the shop for a new differential</>}</>
            }
            {state.mileStoneCount >= 6 && !state.insideChallenge && state.highestXTier === 3 &&
              <>{spaces()}<button disabled={state.inNegativeSpace || state.activeChallenges.FULLYIDLE || state.xValue[0] < alphaTarget} onClick={performAlphaReset}>&alpha;-Reset</button>{spaces()}</>
            }
            {state.insideChallenge && state.highestXTier === 3 && state.xValue[0] > alphaTarget &&
              <>{spaces()}<button disabled={state.inNegativeSpace || state.activeChallenges.FULLYIDLE || state.xValue[0] < alphaTarget} onClick={completeChallenge}><b>Complete Challenge</b></button>{spaces()}</>
            }
            {state.mileStoneCount >= 6 && state.xValue[0] < alphaTarget &&
              <>{spaces()}<button disabled={state.activeChallenges.FULLYIDLE} onClick={abortAlphaReset}>Abort</button>{spaces()}</>
            }
          {/* <br/> */}
          <h2>My Formulas</h2>
          <FormulaTable state={state} updateState={updateState} popup={popup} setTotalClicks={setTotalClicks} formulaNames={inventoryFormulas} context="my"/>
          {state.mileStoneCount >= 1 && state.mileStoneCount <=2 && 
            <p>Hint: You can apply formulas repeatedly by holding the button or using Enter</p>
          }
          <p>
            {(state.alphaUpgrades.MEEQ) && <>
              <button onClick={memorize} disabled={state.activeChallenges.FULLYIDLE} title={"Saves equip layout so you can use it again later"}>Memorize</button>
              {spaces()}<button onClick={remember} disabled={state.activeChallenges.FULLYIDLE} title={"Loads saved equip layout for current x-Reset"}>Remember</button>
              {spaces()}<button onClick={clearLoadout} disabled={state.activeChallenges.FULLYIDLE} title={"Unequips all unused formulas"}>Unequip</button>
            </>}
            {(state.alphaUpgrades.SAPP) && <>
              {spaces()}<button onClick={toggleAutoApply} disabled={state.activeChallenges.FULLYIDLE} title={"Activate/Deactivate all Auto Appliers"}>Auto</button>
            </>}
            {(state.alphaUpgrades.MEMS) && <><br/><br/>
              <button onClick={()=>selectLoadout(0)} disabled={state.activeChallenges.FULLYIDLE} title={"Select Loadout A"}>{state.selectedLayout === 0 ? <div style={{fontWeight:900}}>Loadout A</div> : <>Loadout A</>}</button>
              {spaces()}<button onClick={()=>selectLoadout(1)} disabled={state.activeChallenges.FULLYIDLE} title={"Select Loadout B"}>{state.selectedLayout === 1 ? <div style={{fontWeight:900}}>Loadout B</div> : <>Loadout B</>}</button>
              {spaces()}<button onClick={()=>selectLoadout(2)} disabled={state.activeChallenges.FULLYIDLE} title={"Select Loadout C"}>{state.selectedLayout === 2 ? <div style={{fontWeight:900}}>Loadout C</div> : <>Loadout C</>}</button>
            </>}
          </p>
          {!state.insideChallenge && state.xValue[0] >= Infinity &&
              <><br/><br/>{spaces()}<button onClick={getWorldFormula}><b>DISCOVER THE WORLD FORMULA</b></button>{spaces()}</>
            }
            {state.inNegativeSpace && <p><b>You are in Negative Space!</b>{spaces()}<button onClick={negativeSpaceInfo}>About Negative Space</button></p>}
            {state.mileStoneCount === 1 && state.formulaUnlockCount < 4 && <p>Unlock {4 - state.formulaUnlockCount} more formula{state.formulaUnlockCount !== 3 && "s"} to enable Basic Resets</p>}
            {state.currentChallenge && <p>You are currently in the "{state.currentChallengeName}" Challenge.{state.currentChallengeTime > 600e3 && <> (Time Limit: {secondsToHms(1800-state.currentChallengeTime/1000)})</>}</p>}
            {state.activeChallenges.COUNTDOWN && <p>{Math.floor(30 - state.millisSinceCountdown / 1000)} seconds until X-Values become zero.</p>}
            {state.activeChallenges.LIMITED && <p>You can apply {100 - state.formulaApplyCount} more formulas.</p>}
            {state.mileStoneCount >= 2 && state.highestXTier < 3 && state.xValue[0] < differentialTarget && <p>Reach x={formatNumber(differentialTarget, state.settings.numberFormat)} for the next x-Reset</p>}
            {state.progressionLayer >= 1 && state.highestXTier === 3 && state.xValue[0] < alphaTarget && !state.insideChallenge && <p>Reach x={formatNumber(alphaTarget)} to perform an &alpha;-Reset</p>}
            {state.highestXTier === 3 && state.xValue[0] < alphaTarget && state.insideChallenge && <p>Reach x={formatNumber(alphaTarget)} to complete the challenge</p>}
            {state.progressionLayer >= 1 && state.highestXTier === 3 && !state.inNegativeSpace && !state.insideChallenge && state.xValue[0] >= alphaTarget && <p>Alpha Reset for {alphaRewardTier.alpha * Math.pow(2,state.baseAlphaLevel)} &alpha;.{alphaRewardTier.next && <>&nbsp;(Next: {alphaRewardTier.nextAlpha * Math.pow(2,state.baseAlphaLevel)} &alpha; at x={formatNumber(alphaRewardTier.next)})</>}</p>}
            {state.mileStoneCount >= 3 && state.autoUnlockIndex < shopFormulas.length && state.xValue[0] < nextUnlockCost && (nextUnlockCost <= alphaTarget || state.progressionLayer > 0) && <p>Next Formula at x={formatNumber(nextUnlockCost, state.settings.numberFormat)}</p>}
            {state.mileStoneCount >= 3 && state.autoUnlockIndex < shopFormulas.length && state.xValue[0] >= nextUnlockCost && <p>New Formula available</p>}
            {state.progressionLayer === 0 && state.autoUnlockIndex < shopFormulas.length && nextUnlockCost > alphaTarget && <p>Almost done! Let's fill this bar!</p>}
            <p></p>
            {state.progressionLayer === 0 && (state.xValue[0] >= alphaTarget ?
                <button onClick={performAlphaReset} style={{backgroundColor:"#99FF99", fontWeight:"bold", border:"2px solid", height:"20px", width:"280px"}}>
                  SEEK THE BEGINNING
                </button>
            : 
              <div style={{color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",width:"280px"}}>
                <div style={{backgroundColor:"#99FF99", border:"0px", height:"20px", width:progressBarWidth}}></div>
              </div>
            )}
        </div><div className="column">
        <h2 style={{marginTop:"0px"}}>Shop {state.myFormulas.length >= getInventorySize(state) && <>{spaces()}[FULL INVENTORY]</>}</h2>
          <div style={state.settings.shopScroll === "ON" ? {overflow:"auto", height:"70vh"} : {}}>
            <FormulaTable state={state} updateState={updateState} popup={popup} setTotalClicks={setTotalClicks} formulaNames={shopFormulas}/>
          </div>
        </div></div>
    </div>)
}