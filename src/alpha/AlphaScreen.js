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
        <button onClick={()=>setAlphaTab("AlphaUpgradeTab")}>Upgrades</button>&nbsp;
        <button onClick={()=>setAlphaTab("AlphaResearchTab")}>Research</button>&nbsp;
        <button onClick={()=>setAlphaTab("AlphaChallengeTab")}>Challenges</button>&nbsp;
        <button onClick={()=>setAlphaTab("AlphaStonesTab")}>Stones</button>
        {<h3 style={{fontSize: "32px", marginLeft: "10px", marginTop:"10px", marginBottom:"20px", textAlign:"left"}}>&alpha;={formatNumber(state.alpha, state.settings.numberFormat, 8)}</h3>}
        <TabContent selectedTabKey={state.selectedAlphaTabKey}>
            <AlphaUpgradeTab tabKey="AlphaUpgradeTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaResearchTab tabKey="AlphaResearchTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaChallengeTab tabKey="AlphaChallengeTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
            <AlphaStonesTab tabKey="AlphaStonesTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
        </TabContent>
    </div>)
}