import { Buffer } from "buffer";

import {save} from './savestate'
import {spaces, notify} from './utilities'
import MultiOptionButton from './MultiOptionButton'

export default function OptionScreen({state, updateState, setTotalClicks}) {
  const saveGame = ()=>{
    save(state)
    notify.success("Game Saved")
  }
  
  const load = ()=>{
    if (state.mileStoneCount < 2 || window.confirm("This loads your last saved game, your current progress will be lost. Proceed?")) {
      updateState({name: "load"})
      setTotalClicks((x)=>x+1)
    }
  }

  const exportGame = ()=>{
    const encodedState = Buffer.from(JSON.stringify(state)).toString("base64");
    navigator.clipboard.writeText(encodedState);
    notify.success("Copied to Clipboard")
  }

  const importGame = ()=>{
    const encodedState = window.prompt("Paste your save here:");
    if (encodedState && (!state.mileStoneCount || window.comfirm("This will overwrite your current save! Are you sure?"))){
      const decodedState = JSON.parse(Buffer.from(encodedState,"base64").toString())
      debugger;
      updateState({name: "load", state: decodedState})
      setTotalClicks((x)=>x+1)
      notify.success("Save Imported")
    }
  }

  const resetSave = ()=>{
    if (window.confirm("This resets everything and you do not get anything in return. Are you really sure?")) {
      if (window.confirm("Are you really really sure?")) {
        if (window.confirm("Are you totally absolutely enthusiastically sure?")) {
          updateState({name: "reset"})
          setTotalClicks((x)=>x+1)
          notify.warning("Game Reset")
        }
      }
    }
  }


  return (<div style={{padding: "10px"}}>
    <h1>Options</h1>
      <p>
        {spaces()}<button onClick={saveGame}>Save Game</button>
        {spaces()}<button onClick={load}>Load</button>
        {spaces()}<button onClick={resetSave}>Hard Reset</button>
      </p>
      <p>
        {spaces()}<button onClick={exportGame}>Export</button>
        {spaces()}<button onClick={importGame}>Import</button>
      </p>
      <p>
        {spaces()}<MultiOptionButton settingName="valueReduction" statusList={["CONFIRM","WARNING","PREVENT","NEVER","APPLY"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Decreasing Formula" tooltip="Controls behavior when trying to apply a formula that reduces the value" tooltipList={["Show confirmation popup that can be skipped by holding Shift","Apply when Shift is held, show warning otherwise.", "Prevent formula application unless Shift is held", "Never apply", "Always apply"]}/>
        {spaces()}<MultiOptionButton settingName="autoSave" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Auto Save" tooltip="Controls whether the game saves automatically" tooltipList={["Saves automatically every 10 seconds and tries to save (depends on browser) before closing tab","Game is not saved automatically"]}/>
        {spaces()}<MultiOptionButton settingName="autoLoad" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Auto Load" tooltip="Controls whether the saved game is loaded automatically with the site" tooltipList={["Game is loaded automatically","Game is not loaded automatically"]}/>
        {spaces()}<MultiOptionButton settingName="offlineProgress" statusList={["ON","ACTIVE","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Offline Progress" tooltip="Controls whether the game calculates progress for offline/inactive time" tooltipList={["Always get offline progress","No offline progress upon load, but inactive periods (minimized tab etc) are considered", "No offline progress, not even after inactive (minimized tab etc) periods of 2+ minutes"]}/>
        {spaces()}<MultiOptionButton settingName="offlineProgressPopup" statusList={["ON","LAUNCH","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Offline Progress Pop-Up" tooltip="Controls whether the offline progress popup is shown" tooltipList={["Shown at launch and after inactive periods","Only shown at launch", "Never shown"]}/>
        {spaces()}<MultiOptionButton settingName="showHints" statusList={["ON", "OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Show Hints" tooltip="Controls whether hints are shown" tooltipList={["Hints are shown", "Hints are not shown"]}/>
        {spaces()}<MultiOptionButton settingName="hotKeys" statusList={["ON", "OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Hotkeys" tooltip="Controls whether hotkeys are enabled" tooltipList={["Hotkeys are enabled", "Hints are disabled"]}/>
      </p>
  </div>)
}