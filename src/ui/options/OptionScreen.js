import { useContext } from "react";
import { AppContext } from "../App";
import { exportToClipBoard, exportToFile, importFromString, save } from "../../utilities/saveload";
import { DOWNLOADNAME, FILENAME, INVITIATION, MAJORVERSION, MINORVERSION, PRODUCTIVE } from "../../game/constants";

import '../App.css'
import ToggleSelectButton from "../components/ToggleSelectButton";
import BasicButton from "../components/BasicButton";
import Conditional from "../components/Conditional";
import { secondsToHms } from "../../utilities/formatter";
import DropdownSelectButton from "../components/DropdownSelectButton";

export default function OptionScreen() {
  const context = useContext(AppContext)
  const settings = context.settings
  const mileStoneCount = context.save.general.mileStoneCount
  const maingame = context.save.maingame
  const destiny = context.save.destiny
  const general = context.save.general
  const updateStatus = (settingName, newStatus)=>{
    context.perform("changeSetting", {settingName, newStatus})
  }

  return (<div style={{marginLeft: "5px"}}>
    <h1>Options</h1>
      <BasicButton text="Manual Save" title={"Perform a manual save. The game also automatically saves every 10 seconds"} fullLine={true} onClick={()=>save(FILENAME, context.save)}/>
      <div className="ltrList">
        <BasicButton text="Export" title={"Exports the current game state as a text string to the clipboard"} onClick={()=>exportToClipBoard(context.save)}/>
        <BasicButton text="Export as File" title={"Exports the current game state as a downloadable text file"} onClick={()=>exportToFile(DOWNLOADNAME, context.save)}/>
        <BasicButton text="Import" title={"Imports a previously exported text string and restores its game state"} onClick={()=>importFromString(undefined)}/>
      </div>
      <BasicButton text="Install as Web-App" visible={!!window.installPromptPWAevent} fullLine={true} onClick={()=>{window.installPromptPWAevent.prompt(); window.installPromptPWAevent = null; context.popup.alert(<>IMPORTANT NOTE:<br/><br/>The game data is still stored in the browser even when using the app.<br/>Therefore deleting the browser cache also resets the app including your save.</>)}}/>
      <DropdownSelectButton visible={true || destiny.stars > 1 || maingame.progressionLayer > 0} settingName="headerDisplay" statusList={["X","ALPHA",destiny.stars > 1 && "STARS",destiny.stars > 1 && "STARLIGHT", "VERTICAL", "HORIZONTAL", "OFF"].filter((x)=>x)} settings={settings} updateStatus={updateStatus} fullLine={true}
          description="Header Display" tooltip="Controls display at the top of the site"/>
      <ToggleSelectButton settingName="numberFormat" statusList={["LETTER","SCIENTIFIC","AMBIGUOUS"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
        description="Number Format" tooltip="Controls how numbers are displayed" tooltipList={["Use letters for thousands: K,M,B,T,Q,P,S,V,O,N,D","Use scientific notation", "Use ambigous notation"]}/>
      <ToggleSelectButton settingName="shopPrices" statusList={["OFF","ON"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
        description="Shop Price Labels" tooltip="Controls how formula prices and additional info are shown in Shop" tooltipList={["Shop Prices are only shown in Tooltips","Shop Prices are shown in Label."]}/>
      <ToggleSelectButton settingName="shopScroll" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
        description="Shop Scrollbar" tooltip="Controls whether the formula shop has a separate scroll bar" tooltipList={["Shop has a scroll bar","Shop does not have a scroll bar."]}/>
      <ToggleSelectButton settingName="challengeTabSwitch" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
        description="Challenge Tab Switch" tooltip="Controls whether automatic tab switch occurs when starting or finishing a challenge" tooltipList={["Tab is switched automatically","Tab is not switched automatically."]}/>
      <BasicButton text="Hard Reset" title={"Starts a new game. This will overwrite your current save file."} fullLine={true} onClick={()=>{/*TODO*/}}/>

      <details className="topMargin pointer">
        <summary>Pop-Up-Settings</summary>
        <ToggleSelectButton settingName="offlineProgressPopup" statusList={["ON","LAUNCH","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Offline Progress Pop-Up" tooltip="Controls whether the offline progress popup is shown" tooltipList={["Shown at launch and after inactive periods","Only shown at launch/loading", "Never shown"]}/>
        <ToggleSelectButton settingName="valueReduction" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Decreasing Formula Pop-Up" tooltip="Controls whether the confirmation popup for decreasing an X-Value is shown" tooltipList={["Show popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="xResetPopup" statusList={["ON","OFF","SMART","SAFE"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Basic Reset Pop-Up" tooltip="Controls whether the confirmation popup for Basic Resets is shown" tooltipList={["Show popup","Do not show popup","Only show popup when formula unlocks etc possible","Shows two popups when formula unlocks etc possible"]}/>
        <ToggleSelectButton settingName="shopResetPopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="x-Reset Pop-Up" tooltip="Controls whether the confirmation popup for x-Resets is shown" tooltipList={["Show popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="alphaResetPopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Alpha-Reset Pop-Up" tooltip="Controls whether the confirmation popup for Alpha-Resets is shown" tooltipList={["Show popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="alphaAbortPopup" statusList={["DOUBLE", "ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Abort Alpha Pop-Up" tooltip="Controls whether the confirmation popup for aborting an Alpha run is shown" tooltipList={["Show two popups", "Show one popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="alphaUpgradePopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Alpha Upgrade Pop-Up" tooltip="Controls whether the confirmation popup for buying an Alpha Upgrade is shown" tooltipList={["Show popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="memorizePopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Memorize Pop-Up" tooltip="Controls whether the confirmation popup for memorizing Formula loadouts is shown" tooltipList={["Show popup","Do not show popup"]}/>
        <ToggleSelectButton settingName="exitChallengePopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
          description="Exit Challenge Pop-Up" tooltip="Controls whether the confirmation popup for exiting Challenges is shown" tooltipList={["Show popup","Do not show popup"]}/>
      </details>

      <details className="topMargin pointer">
        <summary>Hotkey-Settings</summary>
          <ToggleSelectButton settingName="hotkeyApplyFormula" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Apply Formula Hotkeys [1/2/3]" tooltip="Controls whether number keys can be used to apply formulas" tooltipList={["Hotkeys Enabled", "Hotkeys Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyBasicReset" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Basic Reset Hotkey [B]" tooltip="Controls whether the B Key can be pressed to perform a Basic Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyXReset" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="x-Reset Hotkey [X]" tooltip="Controls whether the X Key can be pressed to perform an x-Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyDiscardPopup" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Dismiss Popup [Escape]" tooltip="Controls whether the Escape Key can be pressed to close Popups" tooltipList={["Hotkeys Enabled", "Hotkeys Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyAlphaReset" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Alpha-Reset Hotkey [A]" tooltip="Controls whether the A Key can be pressed to perform an Alpha-Reset" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyToggleAuto" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Toggle Auto Hotkey [T]" tooltip="Controls whether the T Key can be used to toggle Auto Appliers" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyAbortRun" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Abort Hotkey [C]" tooltip="Controls whether the C Key can be used to abort the current run" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
          <ToggleSelectButton settingName="hotkeyResearchAll" statusList={["ON","OFF"]} settings={settings} updateStatus={updateStatus} fullLine={true} 
            description="Research All Hotkey [R]" tooltip="Controls whether the R Key to start all available Research" tooltipList={["Hotkey Enabled", "Hotkey Disabled"]}/>
      </details>

      {/*Playtime Maingame */}
      <Conditional visible={maingame.playtime > 0 && maingame.isFinished}>Playtime:&nbsp;&nbsp;{secondsToHms(maingame.playtime/1000)}&nbsp;&nbsp;[Game Finished!]</Conditional> 
      <Conditional visible={maingame.playtime > 0 && !maingame.isFinished}>Playtime:&nbsp;&nbsp;{secondsToHms(maingame.playtime/1000)}</Conditional>

      {/*Best Time Maingame*/}
      <Conditional visible={destiny.stars > 1 && general.destinyRecordMillis <= 30*86400*1000}><br/>Record:&nbsp;&nbsp;{secondsToHms(general.destinyRecordMillis/1000)}</Conditional>
      
      {/*Playtime Starlight*/}
      <Conditional visible={destiny.starlightRun.playTime > 0 && destiny.starlightRun.starlight >= Infinity}><br/>Starlight Age:&nbsp;&nbsp;{secondsToHms(destiny.starlightRun.playTime/1000)}&nbsp;&nbsp;[Infinite Starlight!]</Conditional> 
      <Conditional visible={destiny.starlightRun.playTime > 0 && destiny.starlightRun.starlight < Infinity}><br/>Starlight Age:&nbsp;&nbsp;{secondsToHms(destiny.starlightRun.playTime/1000)}</Conditional>

      {/*About Section*/}
      <p>Version:&nbsp;&nbsp;{MAJORVERSION + "." + MINORVERSION.toString().padStart(2,"0") + (PRODUCTIVE ? "":"d [Development Build]")}</p>
      <p>This game is created by Zilvarro.</p>
      <Conditional visible={mileStoneCount >= 3}><a href={"https://discord.gg/" + INVITIATION} target="_blank" rel="noopener noreferrer">Join the Discord Community</a></Conditional>
      <Conditional visible={mileStoneCount < 3}><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Must have 3 Milestones to join the Discord &#9785;</a></Conditional>
  </div>)
}