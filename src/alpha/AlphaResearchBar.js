import {secondsToHms} from '../utilities'

//TODO Account for offline progress being disabled
export default function AlphaResearchBar({state, research, updateState}) {
    const startTime = state.researchStartTime[research.id]
    const deltaMilliSeconds = startTime ? Date.now() - startTime : 0
    const progressMultiplier = research.getMultiplier(state)
    const progress = progressMultiplier * deltaMilliSeconds / 1000
    const goal = research.durationStart * Math.pow(research.durationBase, state.researchLevel[research.id] || 0)
    const remainingTime = Math.max(1, (goal - progress) / progressMultiplier)
    const percentage = Math.min(deltaMilliSeconds / research.minimumDuration, progress / goal)
    const isDone = (!state.researchLevel[research.id] || percentage >= 1)
    const bulkAmount = isDone ? Math.max(1,Math.floor(Math.log10(progressMultiplier / goal) + 1)) : 0
    const progressBarWidth = isDone ? "100%" : Math.min(100 * percentage,99).toFixed(2) + "%"
    
    const clickResearchBar = ()=>{
      if (isDone)
        updateState({name: "startResearch", research: research, bulkAmount: bulkAmount})
    }

    if (!state.researchLevel[research.id] && !research.checkUnlock(state))
      return <div style={{position: "relative", color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",width:"80%", maxWidth:"320px"}}>
        <div style={{userSelect:"none",whiteSpace:"nowrap",position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>{research.lockText}</b>
      </div></div>
    else if (!state.researchLevel[research.id]) 
    return <div onClick={clickResearchBar} style={{position: "relative", color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",width:"80%", maxWidth:"320px"}}>
      <div style={{userSelect:"none",whiteSpace:"nowrap",position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>CLICK TO UNLOCK</b>
    </div></div>


    return (
      <>
        <div onClick={clickResearchBar} style={{position: "relative", color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",width:"80%", maxWidth:"320px"}}>
          <div style={{backgroundColor:"#ff9999", border:"0px", height:"20px", width:progressBarWidth}}>
            <div style={{userSelect:"none",whiteSpace:"nowrap",position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>{isDone ? <>RESEARCH {research.id}{bulkAmount > 1 && <>&nbsp;(+{bulkAmount})</>}</> : secondsToHms(Math.ceil(remainingTime))}</b></div>
          </div>
        </div>
        <div>Level: {state.researchLevel[research.id]}</div>
        <div>Bonus: {research.getBonusText(state.researchLevel[research.id],state)}</div>
        <div>Boost: {research.getBoostText(state)}</div>
        {research.checkBoost2(state) && <div>Special: {research.getBoostText2(state)}</div>}
        {/* <div>Bonus: x' produces {Math.pow(research.rewardBase, state.researchLevel[research.id] || 0).toFixed(2)} times faster</div> */}
        {/* <div>Duration: {Math.max(1,goal / progressMultiplier).toFixed(2)}</div> */}
      </>
    )
}