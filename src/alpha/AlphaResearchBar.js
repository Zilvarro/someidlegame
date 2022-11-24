export default function AlphaResearchBar({state, research, updateState}) {
    const startTime = state.researchStartTime[research]
    const deltaMilliSeconds = startTime ? Date.now() - startTime : 0
    const progressBarWidth = Math.min(100 * deltaMilliSeconds / 100000,100).toFixed(2) + "%"
    
    const clickResearchBar = ()=>{
        // if (!startTime) {
            updateState({name: "startResearch", research: research})
        // }
    }

    return (
      <div onClick={clickResearchBar} style={{color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",width:"80%", maxWidth:"320px"}}>
        <div style={{backgroundColor:"#ff9999", border:"0px", height:"20px", width:progressBarWidth}}></div>
      </div>
    )
}
