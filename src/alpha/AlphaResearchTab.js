import AlphaResearchBar from './AlphaResearchBar.js'
import {differentialTargets, alphaTarget} from '../savestate'
import {formatNumber} from '../utilities'

const researchDictonary = {
    "x": {
        id: "x",
        durationStart: differentialTargets[0] * 10,
        minimumDuration: 1000,
        durationBase: 1.05,
        rewardBase: 1.01,
        getMultiplier: (state)=>state.xHighScores[0]*state.formulaGodScores[0],
        getBonusText: (level)=>("Starting x is increased by " + Math.floor(100*Math.pow(1.01, level || 0) - 100)),
        // getBonusText: (level,state)=>(<>Starting x is increased by {formatNumber(Math.floor(100*Math.pow(1.01, level || 0) - 100), state.settings.numberFormat,2)}</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[0],state.settings.numberFormat)} on 1st S-Reset</>),
        getBoostText2: (state)=>(<>x={formatNumber(state.formulaGodScores[0],state.settings.numberFormat)} during Formula God Challenge</>),
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
        // getBonusText: (level,state)=>(<>x' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[1],state.settings.numberFormat)} on 2nd S-Reset</>),
        getBoostText2: (state)=>(<>x'={formatNumber(state.formulaGodScores[1],state.settings.numberFormat)} during Formula God Challenge</>),
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
        // getBonusText: (level,state)=>(<>x'' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[2],state.settings.numberFormat)} on 3rd S-Reset</>),
        getBoostText2: (state)=>(<>x'''={formatNumber(state.formulaGodScores[2],state.settings.numberFormat)} during Formula God Challenge</>),
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
        // getBonusText: (level,state)=>(<>x''' produces {formatNumber(Math.pow(1.01, level || 0), state.settings.numberFormat,2)} times as fast</>),
        getBoostText: (state)=>(<>x={formatNumber(state.xHighScores[3],state.settings.numberFormat)} on &alpha;-Reset</>),
        getBoostText2: (state)=>(<>x'''={formatNumber(state.formulaGodScores[3],state.settings.numberFormat)} during Formula God Challenge</>),
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
        <br/><br/><AlphaResearchBar key="x'''" research={researchDictonary["x'''"]} state={state} updateState={updateState}/><br/><br/>
        
        {/* <p>Starting x: 10
            <br/>&rarr;Unspent Alpha (x100)
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 1st S-Reset (x1.41)
        </p>
        <p>Production Speed x': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 2nd S-Reset (x1.41)
        </p>
        <p>Production Speed x'': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on 3rd S-Reset (x1.41)
        </p>
        <p>Production Speed x''': 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Highest score x=123.456 on &alpha;-Reset (x1.41)
        </p>
        <p>Formula Efficiency: 10
            <br/>&rarr;Alpha Upgrade (x16)
            <br/>&rarr;Fastest time 1h23m59s on &alpha;-Reset (x1.41)
        </p>
        <p>Passive Alpha: 1 every 1234s
            <br/>&rarr;Alpha Upgrade (10%)
            <br/>&rarr;Best &alpha; over time on &alpha;-Reset (12340s)
        </p> */}
        </>}
    </div>)
}