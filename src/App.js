import React, { useState, useEffect, useReducer} from 'react'

import './App.css';
import {saveReducer, getSaveGame} from './savestate'
import {spaces} from './utilities'
import TabContent from './TabContent'
import FormulaScreen from './FormulaScreen'
import OptionScreen from './OptionScreen'
import AchievementScreen from './AchievementScreen'

function App() {
  const [ playTime, setPlayTime ] = useState(0)
  const [ , setTimer ] = useState()
  const [ , setTotalClicks ] = useState(0) 
  const [ state, updateState] = useReducer(saveReducer, playTime === 0 && getSaveGame())

  useEffect(()=>{
    setTimer((t)=>{
      setInterval(()=>{
        setPlayTime((x)=>x + 1)
      }, 100)
    })
  },[])

  useEffect(()=>{
    updateState({name: "idle"})
  },[playTime])

  const selectTab = (tabKey)=>{
    updateState({name: "selectTab", tabKey: tabKey})
    setTotalClicks((x)=>x+1)
  }

  return (<>
    <TabContent selectedTabKey={state.selectedTabKey}>
      <FormulaScreen tabKey="FormulaScreen" state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <OptionScreen tabKey="OptionScreen" state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AchievementScreen tabKey="AchievementScreen" state={state}/>
    </TabContent>
    <p>&nbsp;</p>
    <footer><p></p>
    {spaces()}<button onClick={()=>selectTab("FormulaScreen")}>Formulas</button>
    {spaces()}<button onClick={()=>selectTab("AchievementScreen")}>Milestones</button>
    {spaces()}<button onClick={()=>selectTab("OptionScreen")}>Options</button>
    {spaces()}{Math.floor(playTime / 10)}{spaces()}
    <p></p></footer>
  </>);
}

export default App;
