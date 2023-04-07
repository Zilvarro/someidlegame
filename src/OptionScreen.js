import { Buffer } from "buffer";

import {productive, save, version} from './savestate'
import {spaces, notify} from './utilities'
import MultiOptionButton from './MultiOptionButton'

export default function OptionScreen({state, popup, updateState, setTotalClicks}) {
  const saveGame = ()=>{
    save(state)
    notify.success("Game Saved")
  }
  
  // const load = ()=>{
  //   if (state.mileStoneCount < 2) {
  //     updateState({name: "load"})
  //     setTotalClicks((x)=>x+1)
  //   } else {
  //     popup.confirm("This loads your last saved game, your current progress will be lost. Proceed?",()=>{
  //       updateState({name: "load"})
  //       setTotalClicks((x)=>x+1)
  //     })
  //   }
  // }

  const exportGame = ()=>{
    const encodedState = Buffer.from(JSON.stringify(state)).toString("base64");
    navigator.clipboard.writeText(encodedState);
    notify.success("Copied to Clipboard")
  }

  const importGame = ()=>{
    const encodedState = window.prompt("Paste your save here:");
    if (encodedState && (!state.mileStoneCount || window.confirm("This will overwrite your current save! Are you sure?"))){
      const decodedState = JSON.parse(Buffer.from(encodedState,"base64").toString())
      updateState({name: "load", state: decodedState})
      setTotalClicks((x)=>x+1)
      notify.success("Save Imported")
    }
  }

  const resetSave = ()=>{
    popup.confirm("This resets everything and you do not get anything in return. Are you really sure?",()=>{
      popup.confirm("Are you really really sure?",()=>{
        popup.confirm("Are you totally absolutely enthusiastically sure?",()=>{
          updateState({name: "hardreset"})
          setTotalClicks((x)=>x+1)
          notify.warning("Game Reset")
        })
      })
    })
  }

  const cheat = ()=>{
    updateState({name: "cheat"})
    notify.warning("CHEATER", "You cheated not only the game, but yourself!")
  }

  const chapterJump = ()=>{
    const password = window.prompt("Enter Password:");
    updateState({name: "chapterJump", password: password})
  }

  return (<div style={{marginLeft: "20px"}}>
    <h1>Options</h1>
      <p>
        {spaces()}<button onClick={saveGame} disabled={state.mileStoneCount < 1}>Manual Save</button>
        {spaces()}<button onClick={exportGame} disabled={state.mileStoneCount < 1}>Export</button>
        {spaces()}<button onClick={importGame}>Import</button>
        {/* {spaces()}<MultiOptionButton settingName="autoSave" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Auto Save" tooltip="Controls whether the game saves automatically" tooltipList={["Saves automatically every 10 seconds and tries to save (depends on browser) before closing tab","Game is not saved automatically"]}/> */}
      </p><p> 
        {/* {spaces()}<button onClick={load}>Load Game</button> */}
        
        {/* {spaces()}<MultiOptionButton settingName="autoLoad" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Auto Load" tooltip="Controls whether the saved game is loaded automatically with the site" tooltipList={["Game is loaded automatically","Game is not loaded automatically"]}/> */}
      </p><p>
        {/* {spaces()}<MultiOptionButton settingName="offlineProgress" statusList={["ON","ACTIVE","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Offline Progress" tooltip="Controls whether the game calculates progress for offline/inactive time" tooltipList={["Always get offline progress","No offline progress upon load, but inactive periods (minimized tab etc) are considered", "No offline progress, not even after inactive (minimized tab etc) periods of 2+ minutes"]}/> */}
      </p><p>
        {spaces()}<MultiOptionButton settingName="numberFormat" statusList={["LETTER","SCIENTIFIC","AMBIGUOUS"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Number Format" tooltip="Controls how numbers are displayed" tooltipList={["Use letters for thousands: K,M,B,T,Q,P,S,V,O,N,D","Use scientific notation", "Use ambigous notation"]}/>
      </p><p>
        {spaces()}<MultiOptionButton settingName="shopPrices" statusList={["OFF","ON"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Shop Price Labels" tooltip="Controls how formula prices and additional info are shown in Shop" tooltipList={["Shop Prices are only shown in Tooltips","Shop Prices are shown in Label."]}/>
      </p><p>
        {spaces()}<MultiOptionButton settingName="shopScroll" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Shop Scrollbar" tooltip="Controls whether the formula shop has a separate scroll bar" tooltipList={["Shop has a scroll bar","Shop does not have a scroll bar."]}/>
      </p><p>
           {/* {spaces()}<MultiOptionButton settingName="showHints" statusList={["ON", "OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Show Hints" tooltip="Controls whether hints are shown" tooltipList={["Hints are shown", "Hints are not shown"]}/>
        {spaces()}<MultiOptionButton settingName="hotKeys" statusList={["ON", "OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Hotkeys" tooltip="Controls whether hotkeys are enabled" tooltipList={["Hotkeys are enabled", "Hints are disabled"]}/> */}
      </p>
      <p>
        {spaces()}<button onClick={resetSave}>Hard Reset</button>
      </p>
      {false && !productive && <p>
        {spaces()}<button onClick={cheat}>Cheat</button>
      </p>}
      <details>
        <summary>Pop-Up-Settings</summary>
        <p>
          {spaces()}<MultiOptionButton settingName="offlineProgressPopup" statusList={["ON","LAUNCH","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Offline Progress Pop-Up" tooltip="Controls whether the offline progress popup is shown" tooltipList={["Shown at launch and after inactive periods","Only shown at launch/loading", "Never shown"]}/>
        </p>
        {/* <p>
        {spaces()}<MultiOptionButton settingName="valueReduction" statusList={["CONFIRM","WARNING","PREVENT","NEVER","APPLY"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Decreasing Formula" tooltip="Controls behavior when trying to apply a formula that reduces the value" tooltipList={["Show confirmation popup that can be skipped by holding Shift","Apply when Shift is held, show warning otherwise.", "Prevent formula application unless Shift is held", "Never apply", "Always apply"]}/>
        </p> */}
        <p>
        {spaces()}<MultiOptionButton settingName="valueReduction" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Decreasing Formula Pop-Up" tooltip="Controls whether the confirmation popup for decreasing an X-Value is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>
        <p>
          {spaces()}<MultiOptionButton settingName="xResetPopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Basic Reset Pop-Up" tooltip="Controls whether the confirmation popup for Basic Resets is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="shopResetPopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="x-Reset Pop-Up" tooltip="Controls whether the confirmation popup for x-Resets is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="alphaResetPopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Alpha-Reset Pop-Up" tooltip="Controls whether the confirmation popup for Alpha-Resets is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="alphaAbortPopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Abort Alpha Pop-Up" tooltip="Controls whether the confirmation popup for aborting an Alpha run is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="alphaUpgradePopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Alpha Upgrade Pop-Up" tooltip="Controls whether the confirmation popup for buying an Alpha Upgrade is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
        {(state.destinyStars > 1 || state.alphaUpgrades.MEEQ === true) && <p>
          {spaces()}<MultiOptionButton settingName="memorizePopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Memorize Pop-Up" tooltip="Controls whether the confirmation popup for memorizing Formula loadouts is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
        {(state.mailsCompleted["Challenges"] || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="exitChallengePopup" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Exit Challenge Pop-Up" tooltip="Controls whether the confirmation popup for exiting Challenges is shown" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
      </details>
      <br/>
      <details>
        <summary>Hotkey-Settings</summary>
        <p>
          {spaces()}<MultiOptionButton settingName="hotkeyApplyFormula" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Apply Formula Hotkeys [1/2/3]" tooltip="Controls whether number keys can be used to apply formulas" tooltipList={["Hotkeys Enabled", "Hotkeys Disabled"]}/>
        </p>
        <p>
        {spaces()}<MultiOptionButton settingName="hotkeyBasicReset" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="Basic Reset Hotkey [B]" tooltip="Controls whether the B Key can be pressed to perform a Basic Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
        </p>
        <p>
        {spaces()}<MultiOptionButton settingName="hotkeyXReset" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
          description="x-Reset Hotkey [X]" tooltip="Controls whether the X Key can be pressed to perform an x-Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
        </p>
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="hotkeyAlphaReset" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Alpha-Reset Hotkey [A]" tooltip="Controls whether the A Key can be pressed to perform an Alpha-Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
        </p>}
        {(state.destinyStars > 1 || state.alphaUpgrades.SAPP) && <p>
          {spaces()}<MultiOptionButton settingName="hotkeyToggleAuto" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Toggle Auto Hotkey [T]" tooltip="Controls whether the T Key can be used to toggle Auto Appliers" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
        </p>}
        {(state.destinyStars > 1 || state.progressionLayer > 0) && <p>
          {spaces()}<MultiOptionButton settingName="hotkeyAbortRun" statusList={["ON","OFF"]} state={state} updateState={updateState} setTotalClicks={setTotalClicks}
            description="Abort Hotkey [C]" tooltip="Controls whether the C Key can be used to abort the current run" tooltipList={["Show popup","Do not show popup"]}/>
        </p>}
      </details>


      {state.xValue[0] === 0 && state.mileStoneCount === 0 && (window.location.href.split("/").pop() === "?newgame") &&<p>
        {spaces()}<button onClick={chapterJump}>Chapter Jump</button>
      </p>}
      <br/>
      <p>Version {version}{!productive && <>&nbsp;&nbsp;[Development Build]</>}</p>
  </div>)
}