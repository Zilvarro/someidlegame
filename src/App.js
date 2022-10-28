import React, { useState, useEffect, useReducer} from 'react'

import './App.css';
import {saveReducer, getSaveGame} from './savestate'
import TabContent from './TabContent'
import FormulaScreen from './FormulaScreen'
import OptionScreen from './OptionScreen'
import AchievementScreen from './AchievementScreen'
import AlphaScreen from './AlphaScreen'
import AutoSave from './AutoSave'
import {PopupDialog, makeShowPopup} from './PopupDialog'

function App() {
  const [ playTime, setPlayTime ] = useState(0)
  const [ , setTimer ] = useState()
  const [ , setTotalClicks ] = useState(0) 
  const [ popupState , setPopupState ] = useState({text: "", options: [], visible:false}) 
  
  const [ state, updateState] = useReducer(saveReducer, playTime === 0 && getSaveGame())

  const popup = makeShowPopup(popupState, setPopupState)
  
  useEffect(()=>{
    setTimer((t)=>{
      setInterval(()=>{
        setPlayTime((x)=>x + 1)
      }, 100)
    })
  },[])

  useEffect(()=>{
    if (playTime > 0)
      updateState({name: "idle", popup:popup, playTime:playTime})
  },[playTime, popup])

  const selectTab = (tabKey)=>{
    updateState({name: "selectTab", tabKey: tabKey})
    setTotalClicks((x)=>x+1)
  }

  return (<>
    <AutoSave saveState={state}/>
    <PopupDialog popupState={popupState} setPopupState={setPopupState}/>
    <TabContent selectedTabKey={state.selectedTabKey}>
      <FormulaScreen tabKey="FormulaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AlphaScreen tabKey="AlphaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <OptionScreen tabKey="OptionScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AchievementScreen tabKey="AchievementScreen" state={state}/>
    </TabContent>
    <p>&nbsp;</p>
    <footer>
    {state.mileStoneCount < 6 && <button style={{backgroundColor: "#FFFFFF", border:"2px solid", padding:"5px", margin:"5px", marginLeft:"10px", fontWeight:"bold"}} onClick={()=>selectTab("FormulaScreen")}>Formulas</button>}
    {state.mileStoneCount >= 6 && <button style={{backgroundColor: "#99FF99", border:"2px solid", padding:"5px", margin:"5px", marginLeft:"10px", fontWeight:"bold"}} onClick={()=>selectTab("FormulaScreen")}>Formulas</button>}
    {state.mileStoneCount >= 6 && <button style={{backgroundColor: "#ff7777", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("AlphaScreen")}>Alpha</button>}
    {/* {state.mileStoneCount >= 1 && <button style={{backgroundColor: "#55ffbb", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("WorldScreen")}>World</button>}
    {state.mileStoneCount >= 1 && <button style={{backgroundColor: "#663366", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("VoidScreen")}>Void</button>}
    {state.mileStoneCount >= 1 && <button style={{backgroundColor: "#ffff88", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("DestinyScreen")}>Destiny</button>} */}
    <button style={{margin:"5px"}} onClick={()=>selectTab("AchievementScreen")}>Milestones</button>
    <button style={{margin:"5px"}} onClick={()=>selectTab("OptionScreen")}>Options</button>
    {/* {spaces()}<button onClick={cheat}>Cheat</button>
    {spaces()}<input type="range" onChange={onSliderChange} id="idleMult" name="idleMult" min="1" max="20" value="1"/>&nbsp;{state.idleMultiplier}
    {spaces()}{Math.floor(playTime / 10)}{spaces()} */}
    </footer>
  </>);
}

export default App;
