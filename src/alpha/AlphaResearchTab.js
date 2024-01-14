import AlphaResearchBar from './AlphaResearchBar.js'
import { getCumulResearchInfo } from './AlphaResearchHelper.js'
import {getMaxxedResearchBonus} from '../savestate'
import {formatNumber, secondsToHms} from '../utilities'
import { getCrystalMultiplier } from '../world/WorldCrystalTab.js'

const differentialTargets = [20e3,20e9,20e21,Infinity]
const alphaTarget = 20e33
const getResearchCrystalBonus = (state)=>{
  return getCrystalMultiplier(state,"R")
}

export const researchDictonary = {
    "x": {
        id: "x",
        durationStart: differentialTargets[0] * 5,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[0]*state.formulaGodScores[0]*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("Start with x=" + formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100),state.settings.numberFormat,0,true)) + " after resets",
        getBonusText2: (state)=>("Start with x=" + formatNumber(10e12, state.settings.numberFormat,0,true) + " after resets"),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[0],state.settings.numberFormat)} on x'-Reset</>),
        getBoostText2: (state)=>(<>x={formatNumber(state.formulaGodScores[0],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[0] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[0] > 1,
        lockText: "LOCKED (NEED: x=20)",
    },
    "x'": {
        id: "x'",
        durationStart: differentialTargets[1] * 5,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[1]*state.formulaGodScores[1]*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("x' produces " + formatNumber(Math.pow(1.01, level || 0),state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("x' produces " + formatNumber(100e9,state.settings.numberFormat,2,true) + " times as fast"),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[1],state.settings.numberFormat)} on x''-Reset</>),
        getBoostText2: (state)=>(<>x'={formatNumber(state.formulaGodScores[1],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[1] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[1] > 1,
        lockText: "LOCKED (NEED: x'=20)",
    },
    "x''": {
        id: "x''",
        durationStart: differentialTargets[2] * 5,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[2]*state.formulaGodScores[2]*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("x'' produces " + formatNumber(Math.pow(1.01, level || 0),state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("x'' produces " + formatNumber(100e9,state.settings.numberFormat,2,true) + " times as fast"),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[2],state.settings.numberFormat)} on x'''-Reset</>),
        getBoostText2: (state)=>(<>x''={formatNumber(state.formulaGodScores[2],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[2] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[2] > 1,
        lockText: "LOCKED (NEED: x''=20)",
    },
    "x'''": {
        id: "x'''",
        durationStart: alphaTarget * 5,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[3]*state.formulaGodScores[3]*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("x''' produces " + formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("x''' produces " + formatNumber(100e9,state.settings.numberFormat,2,true) + " times as fast"),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[3],state.settings.numberFormat)} on &alpha;-Reset</>),
        getBoostText2: (state)=>(<>x'''={formatNumber(state.formulaGodScores[3],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[3] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[3] > 1,
        lockText: "LOCKED (NEED: x'''=20)",
    },
    "alpha": {
        id: "alpha",
        advanced: true,
        durationStart: 20,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.alpha*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("All X-Production is " + formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100), state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("None"),
        getBoostText: (state)=>(<>Alpha Tokens &alpha;={formatNumber(state.essence,state.settings.numberFormat)}</>),
        getBoostText2: (state)=>(<>No special boost.</>),
        checkUnlock: (state)=>(state.alpha >= 20),
        checkBoost2: (state)=>false,
        lockText: "LOCKED (NEED: a=20)",
    },
    "passive": {
        id: "passive",
        advanced: true,
        durationStart: 20,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.essence*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("Gain Passive Alpha " + formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100), state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("None"),
        getBoostText: (state)=>(<>World Essence &omega;={formatNumber(state.essence,state.settings.numberFormat)}</>),
        getBoostText2: (state)=>(<>No special boost.</>),
        checkUnlock: (state)=>(state.essence >= 20),
        checkBoost2: (state)=>false,
        lockText: "LOCKED (NEED: w=20)",
    },
    "meta": {
        id: "meta",
        advanced: true,
        durationStart: 20,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.essence*getResearchCrystalBonus(state),
        getBonusText: (level,state)=>("All research is " + formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100), state.settings.numberFormat,2,true) + " times as fast"),
        getBonusText2: (state)=>("None"),
        getBoostText: (state)=>(<>World Essence &omega;={formatNumber(state.essence,state.settings.numberFormat)}</>),
        getBoostText2: (state)=>(<>No special boost.</>),
        checkUnlock: (state)=>(state.essence >= 20),
        checkBoost2: (state)=>false,
        lockText: "LOCKED (NEED: w=20)",
    },

}

export const researchList = ["x","x'","x''","x'''","alpha","passive","meta"]

export default function AlphaResearchTab({state, updateState, setTotalClicks}) {
    const cumulResearchInfo = getCumulResearchInfo(state,researchList)
    const progressBarWidth = cumulResearchInfo.isDone ? "100%" : Math.min(100 * cumulResearchInfo.percentage,99).toFixed(2) + "%" //cumulResearchInfo.progressBarWidth.toFixed(0) + "%"
    const bulkAmount = cumulResearchInfo.bulkAmount
    const isDone = cumulResearchInfo.isDone
    const remainingTime = cumulResearchInfo.remainingTime
    const totalLevel = cumulResearchInfo.totalLevel
    const allBlocked = cumulResearchInfo.allBlocked
    const showResearchAllBar = (state.mailsCompleted["ResearchAll"] !== undefined)
    const clickResearchAll = ()=>{
        updateState({name: "researchAll"})
    }
    return (
        <div style={{marginLeft:"20px"}}>{<>
        <h2>Research</h2>

        {showResearchAllBar && allBlocked && totalLevel < 10000 && <>
            <div style={{position: "relative", marginBottom:"5px", color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"25px",width:"80%", maxWidth:"200px"}}>
                <div style={{userSelect:"none",whiteSpace:"nowrap",lineHeight:"25px", position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>RESEARCH ALL</b>
            </div></div>
            <div>Total Level: {formatNumber(totalLevel, state.numberFormat, 2)}</div><br/><br/>
        </>}

        {showResearchAllBar && totalLevel >= 10000 && <>
            <div style={{position: "relative", marginBottom:"5px", color:"#000000", backgroundColor:"#ff6666", border:"2px solid", height:"25px",width:"80%", maxWidth:"200px"}}>
            <div style={{backgroundColor:"#ff6666", border:"0px", height:"25px", width:"100%"}}>
                <div style={{userSelect:"none",whiteSpace:"nowrap" ,lineHeight:"25px",position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>ALL MAXXED</b></div>
            </div>
            </div>
            <div>Total Level: {formatNumber(totalLevel, state.numberFormat, 2)}</div><br/><br/>
        </>}

        {showResearchAllBar && !allBlocked && totalLevel < 10000 && <>
            <div onClick={clickResearchAll} style={{position: "relative", marginBottom:"5px", color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"25px",width:"80%", maxWidth:"200px"}}>
            <div style={{backgroundColor:"#ff9999", border:"0px", height:"25px", width:progressBarWidth}}>
                <div style={{userSelect:"none",whiteSpace:"nowrap",lineHeight:"25px", position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>{isDone ? <>RESEARCH ALL{bulkAmount > 0 && <>&nbsp;(+{bulkAmount})</>}</> : secondsToHms(Math.ceil(remainingTime))}</b></div>
            </div>
            </div>
            <div>Total Level: {formatNumber(totalLevel, state.numberFormat, 2)}</div><br/><br/>
        </>}

        Research speed is boosted by your highscores but higher levels take longer.
        {getMaxxedResearchBonus(state).count > 0 && <><br/>Every maxxed Research Bar doubles your Formula Efficiency (x{getMaxxedResearchBonus(state).bonus}).</>}
        <br/><br/><AlphaResearchBar key="x" research={researchDictonary["x"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x'" research={researchDictonary["x'"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x''" research={researchDictonary["x''"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x'''" research={researchDictonary["x'''"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="alpha" research={researchDictonary["alpha"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="passive" research={researchDictonary["passive"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="meta" research={researchDictonary["meta"]} state={state} updateState={updateState}/>
        </>}
    </div>)
}