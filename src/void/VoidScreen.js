import {formatNumber} from '../utilities'
import TabContent from '../TabContent'
import VoidSkillTab from './VoidSkillTab'
import VoidKukkuriTab from './VoidKukkuriTab'

export default function VoidScreen({state, popup, updateState, setTotalClicks}) {
      
const setVoidTab = (tabKey)=>{
    updateState({name: "selectVoidTab", tabKey: tabKey})
}

return (
    <div style={{color:"#AA55AA"}}>
        {<h3 style={{fontSize: "32px", marginLeft: "20px", marginTop:"10px", marginBottom:"20px", textAlign:"left"}}>&Psi;&nbsp;=&nbsp;{formatNumber(state.energy, state.settings.numberFormat,3)}</h3>}
        <button style={{marginLeft: "20px"}} onClick={()=>setVoidTab("VoidSkillTab")}>Skills</button>&nbsp;
        <button onClick={()=>setVoidTab("VoidKukkuriTab")}>Kukkuri</button>&nbsp;
        <TabContent selectedTabKey={state.selectedVoidTabKey}>
          <VoidSkillTab tabKey="VoidSkillTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
          <VoidKukkuriTab tabKey="VoidKukkuriTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
        </TabContent>
    </div>)
}