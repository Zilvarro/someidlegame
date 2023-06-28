import './App.css'

import { createContext, useState } from 'react';
import { deepAssign, load, save } from '../utilities/saveload';
import { Game } from '../game/Game';
import { getSaveStructure, newSave } from '../game/saveTemplates';
import MainScreen from './MainScreen';
import { PopupDialog, makeShowPopup } from './components/PopupDialog';
import { useObjectReducer } from './components/AppContext';
import { FILENAME } from '../game/constants';
import BeforeUnload from './components/BeforeUnload';

export const AppContext = createContext({})

const initializer=()=>{
  const loadedSave = load(FILENAME) || {}
  const save = deepAssign(newSave(), getSaveStructure(), loadedSave)
  return new Game(save)
}

const reducer=(game, action)=>{
  if (document.hidden) 
    return game.managedRelease()
  else if (action.name === "tick")
    return game.managedWait()
  else if (action.name === "hold")
    return game.managedHold(action.holdActionName, action.holdParameters)
  else if (action.name === "release")
    return game.managedRelease()
  else
    return game.managedPerform(action.name, action)
}

export default function App() {
  const [ game, updateGame ] = useObjectReducer(reducer, initializer, 25, {name:"tick"})
  const [ popupState , setPopupState ] = useState({text: "", options: [], visible:false})
  const popup = makeShowPopup(popupState, setPopupState)
  const context = {
    game: game,
    perform: (actionName, parameters={})=>{parameters.name=actionName; updateGame(parameters)},
    popup,
    save:game.save,
    settings: game.save.settings,
    general: game.save.general,
    maingame: game.save.maingame,
    formulas: game.save.maingame.formulas,
    alpha: game.save.maingame.alpha,
    world: game.save.maingame.world,
    void: game.save.maingame.void,
    destiny: game.save.destiny,
    derived: game.derived,
  }

  return <>
    <AppContext.Provider value={context}>
      {/* <PeriodicTask task={myTask} interval={1000}/> */}
      <BeforeUnload unloadHandler={()=>{if (context.save.general.mileStoneCount > 0) save(FILENAME, context.save)}}/>
      <PopupDialog popupState={popupState} setPopupState={setPopupState} discardable={true/*state.settings.hotkeyDiscardPopup === "ON" TODO*/}/>
      <MainScreen/>
    </AppContext.Provider>
  </>
}