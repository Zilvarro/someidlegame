import {formatNumber} from '../utilities'
import AlphaUpgradeTab from './AlphaUpgradeTab'
import AlphaResearchTab from './AlphaResearchTab'
import AlphaChallengeTab from './AlphaChallengeTab'
import AlphaStonesTab from './AlphaStonesTab'
import TabContent from '../TabContent'

export default function AlphaScreen({state, popup, updateState, setTotalClicks}) {
      
const setAlphaTab = (tabKey)=>{
    updateState({name: "selectAlphaTab", tabKey: tabKey})
}


return (
    <div style={{color:"#ff7777"}}>
        {<h3 style={{fontSize: "32px", marginLeft: "10px", marginTop:"10px", marginBottom:"20px", textAlign:"left"}}>&alpha;&nbsp;=&nbsp;{formatNumber(state.alpha, state.settings.numberFormat)}</h3>}
        <button onClick={()=>setAlphaTab("AlphaUpgradeTab")}>Upgrades</button>&nbsp;
        {state.mileStoneCount >= 7 && <><button onClick={()=>setAlphaTab("AlphaResearchTab")}>Research</button>&nbsp;</>}
        {state.mileStoneCount >= 8 && <><button onClick={()=>setAlphaTab("AlphaChallengeTab")}>Challenges</button>&nbsp;</>}
        {Object.keys(state.startingStoneTurned).length > 0 && <button onClick={()=>setAlphaTab("AlphaStonesTab")}>Stones</button>}
        <TabContent selectedTabKey={state.selectedAlphaTabKey}>
            <AlphaUpgradeTab tabKey="AlphaUpgradeTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaResearchTab tabKey="AlphaResearchTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaChallengeTab tabKey="AlphaChallengeTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaStonesTab tabKey="AlphaStonesTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
        </TabContent>
    </div>)
}