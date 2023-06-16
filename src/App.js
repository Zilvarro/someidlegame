import React, { useState, useEffect, useReducer} from 'react'

import './App.css';
import {saveReducer, getSaveGame} from './savestate'
import {formatNumber, notify} from './utilities'
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
import { checkForUpdates, schedulePeriodicUpdateChecks } from './serviceWorkerRegistration';
import { FormulaNumber } from './game/FormulaNumber';
import { describeFormula, evaluateFormula } from './game/formulaBuilder';

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

  const [nums, updateNums] = useState([new FormulaNumber(0), new FormulaNumber(0), new FormulaNumber(0), new FormulaNumber(0), new FormulaNumber(2), new FormulaNumber(0)])
  const varnames = ["hand", "x","y","z", "c", "result"]
  const setnum = (index, value)=>{
    let newnums = [...nums]
    newnums[index] = value
    updateNums(newnums)
  }
  return <>
    Hello World<br/>
    Formula: {describeFormula([2,3,4,"*","+"])}<br/>
    Result: {evaluateFormula([2,3,4,"*","+"], {}).print()}<br/>
    {nums.map((number, index)=><p key={index}>{varnames[index]} = {number.print()}</p>)}
    <button onClick={()=>{setnum(0, nums[1])}}>Take x</button>
    <button onClick={()=>{setnum(1, nums[0])}}>Put x</button>
    <button onClick={()=>{setnum(0, nums[2])}}>Take y</button>
    <button onClick={()=>{setnum(2, nums[0])}}>Put y</button>
    <button onClick={()=>{setnum(0, nums[3])}}>Take z</button>
    <button onClick={()=>{setnum(3, nums[0])}}>Put z</button>
    <button onClick={()=>{setnum(0, nums[4])}}>Take c</button>
    <button onClick={()=>{setnum(0, nums[5])}}>Take Result</button>
    <br/>
    <button onClick={()=>{setnum(0, nums[0].add(new FormulaNumber(1)))}}>Increment</button>
    <button onClick={()=>{setnum(0, nums[0].sub(new FormulaNumber(1)))}}>Decrement</button>
    <button onClick={()=>{setnum(0, nums[0].neg())}}>Negate</button>
    <button onClick={()=>{setnum(0, nums[0].abs())}}>Make positive</button>
    <button onClick={()=>{setnum(0, nums[0].exp(2))}}>Square</button>
    <button onClick={()=>{setnum(0, nums[0].exp(0.5))}}>Take square root</button>
    <button onClick={()=>{setnum(0, nums[0].logC(2))}}>Take log2</button>
    <br/>
    <button onClick={()=>{setnum(5, nums[2].add(nums[3]))}}>Add y and z</button>
    <button onClick={()=>{setnum(5, nums[2].mult(nums[3]))}}>Multiply y and z</button>
    <button onClick={()=>{setnum(5, nums[2].div(nums[3]))}}>Divide y by z</button>
    {/* <button onClick={()=>{setnum(5, nums[2].exp(nums[4].factor))}}>Raise y to the c</button>
    <button onClick={()=>{setnum(5, nums[2].logC(nums[4].factor))}}>Take logC of y</button> */}
    <button onClick={()=>{setnum(5, nums[3].expand(1,1))}}>Raise Infinity by z</button>
    <button onClick={()=>{setnum(5, nums[3].collapse())}}>Reduce Infinities of z</button>
  </>

/*
  useEffect(()=>{
    setTimer((t)=>{
      schedulePeriodicUpdateChecks(10,()=>{console.log("Attempt Update Check")},()=>{console.log("Update Check Completed")})
    })
  },[])

  useEffect(()=>{
    if (playTime > 0)
      updateState({name: "idle", popup:popup, playTime:playTime})
  },[playTime, popup])

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
    const filenames = ["IconNeutral.png", "IconFormulas.png", "IconAlpha.png", "IconDestiny.png"]
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
    <PopupDialog popupState={popupState} setPopupState={setPopupState}/>
    <KeyBoardHandler state={state} updateState={updateState} popup={popup}/>
    <h1 style={{fontSize: "40px", marginLeft: "20px", marginBottom: "10px", textAlign:"left"}}>x&nbsp;=&nbsp;{formatNumber(state.xValue[0], state.settings.numberFormat, 6, false, false)}</h1>
    <TabContent selectedTabKey={state.selectedTabKey}>
      <FormulaScreen tabKey="FormulaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <AlphaScreen tabKey="AlphaScreen" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
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
      {state.progressionLayer >=1 && <button style={{backgroundColor: "#ff7777", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("AlphaScreen")}>Alpha</button>}
      {(state.progressionLayer >=2 || state.destinyStars > 0) && <button style={{backgroundColor: "#ffff88", border:"2px solid", padding:"5px", margin:"5px", fontWeight:"bold"}} onClick={()=>selectTab("DestinyScreen")}>Destiny</button>}
    </span>
    <span style={{display:"inline-block"}}>
      <button style={{margin:"5px"}} onClick={()=>selectTab("AchievementScreen")}>Milestones</button>
      {state.mailsList.length > 0 && <button style={{margin:"5px", fontWeight: hasNewMail ? "700" : undefined, background: hasNewMail ? "#FFAA66" : undefined}} onClick={()=>selectTab("MailScreen")}>Mails</button>}
      <button style={{margin:"5px"}} onClick={()=>selectTab("OptionScreen")}>Options</button>
    </span>
    </footer>
  </>);
  */
}

export default App;
