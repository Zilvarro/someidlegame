import AlphaResearchBar from './AlphaResearchBar.js'
import {differentialTargets, alphaTarget, getMaxxedResearchBonus} from '../savestate'
import {formatNumber} from '../utilities'
//TODO formatNumber on Bonuses
const researchDictonary = {
    "x": {
        id: "x",
        durationStart: differentialTargets[0] * 10,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[0]*state.formulaGodScores[0],
        getBonusText: (level)=>("Start with x=" + Math.floor(100*Math.pow(1.01, level || 0) - 100)) + " after resets",
        getBonusText2: ()=>("Start with x=10T after resets"),
        // getBonusText: (level,state)=>(<>Starting x is increased by {formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100), state.settings.numberFormat,2)}</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[0],state.settings.numberFormat)} on 1st S-Reset</>),
        getBoostText2: (state)=>(<>x={formatNumber(state.formulaGodScores[0],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[0] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[0] > 1,
        lockText: "UNLOCKS AT x=20",
    },
    "x'": {
        id: "x'",
        durationStart: differentialTargets[1] * 10,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[1]*state.formulaGodScores[1],
        getBonusText: (level)=>("x' produces " + Math.pow(1.01, level || 0).toFixed(2) + " times as fast"),
        getBonusText2: ()=>("x' produces 100B times as fast"),
        // getBonusText: (level,state)=>(<>x' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[1],state.settings.numberFormat)} on 2nd S-Reset</>),
        getBoostText2: (state)=>(<>x'={formatNumber(state.formulaGodScores[1],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[1] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[1] > 1,
        lockText: "UNLOCKS AT x'=20",
    },
    "x''": {
        id: "x''",
        durationStart: differentialTargets[2] * 10,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[2]*state.formulaGodScores[2],
        getBonusText: (level)=>("x'' produces " + Math.pow(1.01, level || 0).toFixed(2) + " times as fast"),
        getBonusText2: ()=>("x'' produces 100B times as fast"),
        // getBonusText: (level,state)=>(<>x'' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[2],state.settings.numberFormat)} on 3rd S-Reset</>),
        getBoostText2: (state)=>(<>x''={formatNumber(state.formulaGodScores[2],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[2] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[2] > 1,
        lockText: "UNLOCKS AT x''=20",
    },
    "x'''": {
        id: "x'''",
        durationStart: alphaTarget * 10,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[3]*state.formulaGodScores[3],
        getBonusText: (level)=>("x''' produces " + Math.pow(1.01, level || 0).toFixed(2) + " times as fast"),
        getBonusText2: ()=>("x''' produces 100B times as fast"),
        // getBonusText: (level,state)=>(<>x''' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[3],state.settings.numberFormat)} on &alpha;-Reset</>),
        getBoostText2: (state)=>(<>x'''={formatNumber(state.formulaGodScores[3],state.settings.numberFormat)} during Formula God</>),
        checkUnlock: (state)=>(state.xValue[3] >= 20),
        checkBoost2: (state)=>state.formulaGodScores[3] > 1,
        lockText: "UNLOCKS AT x'''=20",
    },

}

export default function AlphaResearchTab({state, updateState, setTotalClicks}) {
return (
    <div>{<>
        <h2>Research</h2>
        Research speed is boosted by your highscores but higher levels take longer.
        <br/><br/><AlphaResearchBar key="x" research={researchDictonary["x"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x'" research={researchDictonary["x'"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x''" research={researchDictonary["x''"]} state={state} updateState={updateState}/>
        <br/><br/><AlphaResearchBar key="x'''" research={researchDictonary["x'''"]} state={state} updateState={updateState}/>
        {getMaxxedResearchBonus(state).count > 0 && <><br/><br/>Every maxxed Research Bar doubles your Formula Efficiency (x{getMaxxedResearchBonus(state).bonus}).</>}
        {/* {getMaxxedResearchBonus(state).count > 0 && <><br/><br/>Every maxxed Research Bar doubles Formula Efficiency and Production Speed (x{getMaxxedResearchBonus(state).bonus}).
        <br/>Their individual bonus also gets rounded up generously on the last level.</>} */}
        </>}
    </div>)
}