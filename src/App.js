import React, { useState, useEffect, useReducer} from 'react'

import './App.css';
import {saveReducer, getSaveGame} from './savestate'
import {spaces} from './utilities'
import TabContent from './TabContent'
import FormulaScreen from './FormulaScreen'
import OptionScreen from './OptionScreen'
import AchievementScreen from './AchievementScreen'
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
      updateState({name: "idle", popup:popup})
  },[playTime, popup])

  const selectTab = (tabKey)=>{
    updateState({name: "selectTab", tabKey: tabKey})
    setTotalClicks((x)=>x+1)
  }

  // const onSliderChange = (e)=>{
  //   updateState({name: "cheat", idleMultiplier: e.target.valueAsNumber})
  //   setTotalClicks((x)=>x+1)
  // }

  // const cheat = ()=>{
  //   updateState({name: "cheat"})
  //   setTotalClicks((x)=>x+1)
  // }

  return (<>
    <AutoSave saveState={state}/>
    <PopupDialog popupState={popupState} setPopupState={setPopupState}/>
    <TabContent selectedTabKey={state.selectedTabKey}>
      <FormulaScreen tabKey="FormulaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <OptionScreen tabKey="OptionScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AchievementScreen tabKey="AchievementScreen" state={state}/>
    </TabContent>
    <p>&nbsp;</p>
    <footer><p></p>
    {spaces()}<button onClick={()=>selectTab("FormulaScreen")}>Formulas</button>
    {spaces()}<button onClick={()=>selectTab("AchievementScreen")}>Milestones</button>
    {spaces()}<button onClick={()=>selectTab("OptionScreen")}>Options</button>
    {/* {spaces()}<button onClick={cheat}>Cheat</button>
    {spaces()}<input type="range" onChange={onSliderChange} id="idleMult" name="idleMult" min="1" max="20" value="1"/>&nbsp;{state.idleMultiplier}
    {spaces()}{Math.floor(playTime / 10)}{spaces()} */}
    <p></p></footer>
  </>);
}

export default App;
