import './App.css';
import React, { useState, useEffect, useReducer} from 'react'
import {saveReducer, getSaveGame, save, getTapLevelCost, getIdleLevelCost} from './savestate'
import HatButton from './HatButton'
import {spaces} from './utilities'

function App() {
  const [ playTime, setPlayTime ] = useState(0)
  const [ , setTimer ] = useState()
  const [ , setTotalClicks ] = useState(0) 
  const [ state, updateState] = useReducer(saveReducer, playTime === 0 && getSaveGame())

  const onFishingClick = ()=>{
    updateState({name: "tap"})
    setTotalClicks((x)=>x+1)
  }

  const upgradeTapLevel = ()=>{
    updateState({name: "taplevel"})
    setTotalClicks((x)=>x+1)
  }

  const upgradeIdleLevel = ()=>{
    updateState({name: "idlelevel"})
    setTotalClicks((x)=>x+1)
  }

  const unlockFishology = ()=>{
    updateState({name: "unlockfishology"})
    setTotalClicks((x)=>x+1)
  }

  const resetSave = ()=>{
    updateState({name: "reset"})
    setTotalClicks((x)=>x+1)
  }

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

  return (<>
    <div>
      <h2>Fishing Deluxe</h2>
      <p>{spaces()}<button onClick={onFishingClick}>Fishing</button>{state.flags.fishtext && <>{spaces()} You have {state.fishCount} fish{state.holyFish > 0 && <> and {state.holyFish} holy fish</>}!</>}</p>
      <p>{state.flags.taplevel && <>{spaces()}<button disabled={state.fishCount<getTapLevelCost(state)} onClick={upgradeTapLevel}>Improve Fishing Rod</button>{spaces()}Cost: {getTapLevelCost(state)} Fish{spaces()}Rod Level: {state.tapLevel}</>}</p>
      <p>{state.flags.idlelevel && <>{spaces()}<button disabled={state.fishCount<getIdleLevelCost(state)} onClick={upgradeIdleLevel}>Hire Fishing Buddy</button>{spaces()}Cost: {getIdleLevelCost(state)} Fish{spaces()}Buddies: {state.idleLevel}</>}</p>
      <HatButton state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
      <p>{state.flags.fishology && !state.spells[0] && <>{spaces()}<button disabled={state.holyFish < 5} onClick={unlockFishology}>Unlock Fishology</button>Cost: Requires 5 Holy Fish</>}</p>
      <p>{state.spells[0] && <>{spaces()}Fishology has yet to be implemented. Sorry!</>}</p>
      {state.flags.idlelevel && <footer>{spaces()}<button onClick={()=>save(state)}>Save Game</button>{spaces()}<button onClick={resetSave}>Reset Game</button></footer>}
    </div>
    </>);
}

export default App;
