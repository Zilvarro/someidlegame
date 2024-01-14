import {formatNumber} from '../utilities'
import TabContent from '../TabContent'
import WorldPerkTab from './WorldPerkTab'
import WorldCrystalTab from './WorldCrystalTab'
import WorldRitualTab from './WorldRitualTab'

export default function WorldScreen({state, popup, updateState, setTotalClicks}) {
      
const setWorldTab = (tabKey)=>{
    updateState({name: "selectWorldTab", tabKey: tabKey})
}

return (
    <div style={{color:"#44FFCC"}}>
        {<h3 style={{fontSize: "32px", marginLeft: "20px", marginTop:"10px", marginBottom:"20px", textAlign:"left"}}>&omega;&nbsp;=&nbsp;{formatNumber(state.essence, state.settings.numberFormat,3)}</h3>}
        <button style={{marginLeft: "20px"}} onClick={()=>setWorldTab("WorldPerkTab")}>Perks</button>&nbsp;
        {state.mailsCompleted["Crystals"] !== undefined && <><button onClick={()=>setWorldTab("WorldCrystalTab")}>Crystals</button>&nbsp;</>} 
        {state.mailsCompleted["Rituals"] !== undefined && <><button onClick={()=>setWorldTab("WorldRitualTab")}>Rituals</button>&nbsp;</>}
        <TabContent selectedTabKey={state.selectedWorldTabKey}>
          <WorldPerkTab tabKey="WorldPerkTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
          <WorldCrystalTab tabKey="WorldCrystalTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
          <WorldRitualTab tabKey="WorldRitualTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
        </TabContent>
    </div>)
}