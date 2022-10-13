import { Buffer } from "buffer";

import {save} from './savestate'
import {spaces, notify} from './utilities'

export default function OptionScreen({state, updateState, setTotalClicks}) {
  const saveGame = ()=>{
    save(state)
    notify.success("Game Saved")
  }
  
  const load = ()=>{
    if (window.confirm("This loads your last saved game, your current progress will be lost. Proceed?")) {
      updateState({name: "load"})
      setTotalClicks((x)=>x+1)
      notify.success("Game Loaded")
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

  const cheat = ()=>{
    updateState({name: "cheat"})
    setTotalClicks((x)=>x+1)
    notify.warning("Cheated!!!")
  }
  return (<div style={{padding: "10px"}}>
    <h1>Options</h1>
      <p>
        {spaces()}<button onClick={saveGame}>Save Game</button>
        {spaces()}<button onClick={load}>Load</button>
        {spaces()}<button onClick={resetSave}>Hard Reset</button>
        {spaces()}<button onClick={cheat}>Cheat</button>
      </p>
      <p>
        {spaces()}<button onClick={exportGame}>Export</button>
        {spaces()}<button onClick={importGame}>Import</button>
      </p>
  </div>)
}