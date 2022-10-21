import React from "react";

import {save} from './savestate'

//Tries to save the game right before the tab is closed
class AutoSave extends React.Component{
  constructor({saveState}){
    super();
    this.saveState = saveState
    this.onUnload = this.onUnload.bind(this)
    this.save = save
  }

  onUnload(e){
    if (this.saveState.settings.autoSave === "ON" && this.saveState.mileStoneCount > 0) {
      this.save(this.saveState)
    }
  }

  render(){
    return undefined
  }

  componentDidMount(){
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.onUnload);
  }
}
 
export default AutoSave;