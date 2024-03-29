import React, { useState, useEffect, useReducer} from 'react'

import './App.css';
import {saveReducer, getSaveGame} from './savestate'
import {formatNumber, spaces} from './utilities'
import TabContent from './TabContent'
import FormulaScreen from './formulas/FormulaScreen'
import OptionScreen from './OptionScreen'
import AchievementScreen from './AchievementScreen'
import AlphaScreen from './alpha/AlphaScreen'
import DestinyScreen from './destiny/DestinyScreen'
import MailScreen from './mails/MailScreen'
import MainEndingTab from './endings/EndingBarScreen'
import AutoSave from './AutoSave'
import {PopupDialog, makeShowPopup} from './PopupDialog'
import EndingSelectionScreen from './endings/EndingSelectionScreen';
import KeyBoardHandler from './KeyBoardHandler';
import { schedulePeriodicUpdateChecks } from './serviceWorkerRegistration';
import WorldScreen from './world/WorldScreen';
import VoidScreen from './void/VoidScreen';

function App() {
  const [ playTime, setPlayTime ] = useState(0)
  const [ , setTimer ] = useState()
  const [ , setTotalClicks ] = useState(0) 
  const [ popupState , setPopupState ] = useState({text: "", options: [], visible:false}) 
  const [ iconState , setIconState ] = useState(0) 
  
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

  //Checks for updates once per hour if online
  useEffect(()=>{
    setTimer((t)=>{
      schedulePeriodicUpdateChecks(3600,()=>{console.log("Attempt Update Check")},()=>{console.log("Update Check Completed")})
    })
  },[])

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    let link2 = document.querySelector("link[rel~='apple-touch-icon']");
    if (!link2) {
      link2 = document.createElement('link');
      link2.rel = 'apple-touch-icon';
      document.getElementsByTagName('head')[0].appendChild(link2);
    }
    const filenames = ["IconNeutral.png", "IconFormulas.png", "IconAlpha.png", "IconWorld.png", "IconVoid.png", "IconDestiny.png"]
    link.href = window.location.href + "/" + filenames[iconState]
    link2.href = window.location.href + "/" + filenames[iconState]
  }, [iconState]);

  const selectTab = (tabKey)=>{
    updateState({name: "selectTab", tabKey: tabKey})
    window.scrollTo(0,0)
    setTotalClicks((x)=>x+1)
  }

  if (iconState !== state.progressionLayer + 1) {
    setIconState(state.progressionLayer + 1)
  }

  if (state.currentEnding === "worldselect") {
    return <EndingSelectionScreen state={state} popup={popup} updateState={updateState}/>
  } else if (state.currentEnding) {
    return <MainEndingTab state={state} updateState={updateState}/>
  }

  const hasNewMail = Object.keys(state.mailsUnread).length > 0

  return (<>
    <AutoSave saveState={state}/>
    <KeyBoardHandler state={state} updateState={updateState} popup={popup}/>
    <PopupDialog popupState={popupState} setPopupState={setPopupState} discardable={state.settings.hotkeyDiscardPopup === "ON"}/>
    {state.settings.headerDisplay === "VERTICAL" && <div style={{fontSize: "32px", fontWeight:"bold", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>
      <div>x&nbsp;=&nbsp;{formatNumber(state.xValue[0], state.settings.numberFormat, 6, false, false)}</div>
      {state.progressionLayer >= 1 && <div>&alpha;&nbsp;=&nbsp;{formatNumber(state.alpha, state.settings.numberFormat, 6, false, false)}</div>}
      {state.progressionLayer >= 2 && <div>&omega;&nbsp;=&nbsp;{formatNumber(state.essence, state.settings.numberFormat, 6, false, false)}</div>}
      {state.progressionLayer >= 3 && <div>&Psi;&nbsp;=&nbsp;{formatNumber(state.energy, state.settings.numberFormat, 6, false, false)}</div>}
      {state.destinyStars >= 1 && <div>&lambda;&nbsp;=&nbsp;{formatNumber(state.starLight, state.settings.numberFormat, 6, false, false)}</div>}
      {state.destinyStars >= 1 && <div style={{marginTop:"-4px"}}>&#9733;&nbsp;=&nbsp;{formatNumber(state.destinyStars, state.settings.numberFormat, 6, false, false)}</div>}
    </div>}
    {state.settings.headerDisplay === "HORIZONTAL" && <div style={{fontSize: "36px", fontWeight:"bold", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>
      <span>x&nbsp;=&nbsp;{formatNumber(state.xValue[0], state.settings.numberFormat, 6, false, false)}{spaces()}</span>
      {state.progressionLayer >= 1 && <span>&alpha;&nbsp;=&nbsp;{formatNumber(state.alpha, state.settings.numberFormat, 6, false, false)}{spaces()}</span>}
      {state.progressionLayer >= 2 && <span>&omega;&nbsp;=&nbsp;{formatNumber(state.essence, state.settings.numberFormat, 6, false, false)}{spaces()}</span>}
      {state.progressionLayer >= 3 && <span>&Psi;&nbsp;=&nbsp;{formatNumber(state.energy, state.settings.numberFormat, 6, false, false)}{spaces()}</span>}
      {state.destinyStars >= 1 && <span>&lambda;&nbsp;=&nbsp;{formatNumber(state.starLight, state.settings.numberFormat, 6, false, false)}{spaces()}</span>}
      {state.destinyStars >= 1 && <span style={{marginTop:"-4px"}}>&#9733;&nbsp;=&nbsp;{formatNumber(state.destinyStars, state.settings.numberFormat, 6, false, false)}{spaces()}</span>}
    </div>}
    {state.settings.headerDisplay === "X" && <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>x&nbsp;=&nbsp;{formatNumber(state.xValue[0], state.settings.numberFormat, 6, false, false)}</h1>}
    {state.settings.headerDisplay === "ALPHA" && <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>&alpha;&nbsp;=&nbsp;{formatNumber(state.alpha, state.settings.numberFormat, 6, false, false)}</h1>}
    {state.settings.headerDisplay === "ESSENCE" && <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>&omega;&nbsp;=&nbsp;{formatNumber(state.essence, state.settings.numberFormat, 6, false, false)}</h1>}
    {state.settings.headerDisplay === "ENERGY" && <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>&Psi;&nbsp;=&nbsp;{formatNumber(state.energay, state.settings.numberFormat, 6, false, false)}</h1>}
    {state.settings.headerDisplay === "STARS" && <h1 style={{fontSize: "40px", marginLeft: "20px",marginBottom: "10px", textAlign:"left"}}>&#9733;&nbsp;=&nbsp;{formatNumber(state.destinyStars, state.settings.numberFormat, 6, false, false)}</h1>}
    {state.settings.headerDisplay === "STARLIGHT" && <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>&lambda;&nbsp;=&nbsp;{formatNumber(state.starLight, state.settings.numberFormat, 6, false, false)}</h1>}
    <TabContent selectedTabKey={state.selectedTabKey}>
      <FormulaScreen tabKey="FormulaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AlphaScreen tabKey="AlphaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <WorldScreen tabKey="WorldScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <VoidScreen tabKey="VoidScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <DestinyScreen tabKey="DestinyScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AchievementScreen tabKey="AchievementScreen" state={state}/>
      <MailScreen tabKey="MailScreen" popup={popup} state={state} updateState={updateState}/>
      <OptionScreen tabKey="OptionScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
    </TabContent>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <footer>
    <span style={{display:"inline-block"}}>
      <button style={{backgroundColor: "#99FF99", border:"2px solid", padding:"5px", margin:"5px", marginLeft:"10px", fontWeight:"bold"}} onClick={()=>selectTab("FormulaScreen")}>Formulas</button>
      {state.progressionLayer >=1 && <button style={{backgroundColor: "#FF7777", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("AlphaScreen")}>Alpha</button>}
      {state.progressionLayer >=2 && <button style={{backgroundColor: "#44FFCC", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("WorldScreen")}>World</button>}
      {state.progressionLayer >=3 && <button style={{backgroundColor: "#AA55AA", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("VoidScreen")}>Void</button>}
      {(state.progressionLayer >=4 || state.destinyStars > 0) && <button style={{backgroundColor: "#FFFF88", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("DestinyScreen")}>Destiny</button>}
    </span>
    <span style={{display:"inline-block"}}>
      <button style={{margin:"5px"}} onClick={()=>selectTab("AchievementScreen")}>Milestones</button>
      {state.mailsList.length > 0 && <button style={{margin:"5px", fontWeight: hasNewMail ? "700" : undefined, background: hasNewMail ? "#FFAA66" : undefined}} onClick={()=>selectTab("MailScreen")}>Mails</button>}
      <button style={{margin:"5px"}} onClick={()=>selectTab("OptionScreen")}>Options</button>
    </span>
    </footer>
  </>);
}

export default App;
