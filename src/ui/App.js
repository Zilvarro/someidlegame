import './App.css'

import { createContext, useState } from 'react';
import { deepAssign, load } from '../engine/saveload';
import { Game } from '../game/Game';
import { getSaveStructure, newSave } from '../game/saveTemplates';
import MainScreen from './MainScreen';
import { PopupDialog, makeShowPopup } from './components/PopupDialog';
import { useObjectReducer } from '../AppContext';
import { FILENAME } from '../game/constants';

export const AppSuperContext = createContext({})

const initializer=()=>{
  const loadedSave = load(FILENAME) || {}
  const save = deepAssign(newSave(), getSaveStructure(), loadedSave)
  return new Game(save)
}

const reducer=(game, action)=>{
  game.perform(action.name, action)
  return game
}

export default function App() {
  const [ game, updateGame ] = useObjectReducer(reducer, initializer)
  const [ popupState , setPopupState ] = useState({text: "", options: [], visible:false})
  const popup = makeShowPopup(popupState, setPopupState)
  const context = {
    game: game,
    perform:updateGame,
    popup,
    save:game.save,
    settings: game.save.settings,
  }

  return <>
    <AppSuperContext.Provider value={context}>
      <PopupDialog popupState={popupState} setPopupState={setPopupState} discardable={true/*state.settings.hotkeyDiscardPopup === "ON" TODO*/}/>
      <MainScreen>Hello World! lulul</MainScreen>
    </AppSuperContext.Provider>
  </>
}