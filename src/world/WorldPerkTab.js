import { formatNumber, secondsToHms } from "../utilities"
import WorldPerkButton from "./WorldPerkButton"
import { worldPerkDeck, worldPerkDictionary } from "./WorldPerkDictionary"

export default function WorldPerkTab({state, updateState, popup}) {

  //Cards
  //Auto Upgrader (+Refund) => w=1
  //Auto Researcher (+Unlock)=> w=1
  //Challenge Helper (+Unlock)=> w=1
  //Formula Slot => w=2
  //Highscore Updater => w=3
  //Base Alpha Cap Remover => w=4
  //World Resetter => w=5 (Req Challenge Helper + Formula Slot)
  //Research Cap Remover => w=6
  //New Challenges: TRUEBETA & EVILROOT (Req Liberty Stones)

  //Not yet implemented
  //Alpha Based Essence (immediately available?)
  //New Starting Stone Effect
  //Liberty Stones
  //Advanced Research
  

  const resetWorld = ()=>{
    popup.confirm("Perform a World Reset?", ()=>{
      updateState({name: "worldReset"})
    }, state.settings.worldResetPopup === "OFF")
  }

  // const getAlpha = ()=>{
  //   updateState({name: "getAlpha", reward: 1})
  // }

  const drawCard = ()=>{
    updateState({name: "drawPerkCard"})
  }

  const baseEssenceMultiplier = Math.pow(3,state.baseEssenceLevel)
  const baseEssenceUpgradeCost = Math.pow(8,state.baseEssenceLevel + 1)
  const upgradeBaseEssence = ()=>{
    if (state.essence < baseEssenceUpgradeCost) return
    updateState({name:"upgradeBaseEssence"})
  }

  const remainingCards = worldPerkDeck.length-state.perkCardsDrawn

  return (
      <div style={{marginLeft:"10px"}}>
        <div className="row" style={{marginTop:"0px"}}><div className="column" style={{marginRight:"30px"}}>
          <h2>World Perks</h2>
          {state.canBuyPerk ? <>You can only activate one new Card during each World Reset.</> : <>Finish this World Reset successfully to activate another Card!</>}
          <br/><br/>
          There {remainingCards === 1 ? "is" : "are"} {remainingCards} Card{remainingCards !== 1 && "s"} in the deck.&nbsp;&nbsp;<button style={{color:"black"}} onClick={drawCard} disabled={!state.worldPerksAvailable.includes("NULL")}>Draw</button>
          <br/><br/>
          {state.worldPerksAvailable.map((upgrade,index)=><WorldPerkButton key={index} cardSlot={index} upgrade={worldPerkDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
          {state.worldPerksAvailable.some((id)=>state.worldPerks[id]) && <b><br/>Click on an activated card to add it to your collection!</b>}
          <br/><br/>
          </div><div className="smallcolumn">
          <h2>Info</h2>
          <p>You have {formatNumber(state.essence, state.settings.numberFormat,2)} World Essence!</p>
          {state.worldResetEnabled ? <>Reset for 1 World Essence <button onClick={resetWorld}>&omega;-Reset</button></>: <p>Reach x'''=Infinity to enable World Reset!</p>}
          <p>Time in current World run: {secondsToHms(state.currentWorldTime / 1000)}{state.isFullyIdleWorld && <> (Fully Idle)</>}</p>
          <p>Base &omega;-Reset Essence: {formatNumber(baseEssenceMultiplier,state.numberFormat,2)}&nbsp;&nbsp;<button style={{color:"black"}} disabled={state.essence < baseEssenceUpgradeCost} onClick={upgradeBaseEssence}>Triple for {formatNumber(baseEssenceUpgradeCost,state.numberFormat)} &omega;</button></p>
          {/* <p><button onClick={resetWorld}>World Reset</button></p> */}
          {/* <p><button onClick={getAlpha}>Get Alpha</button></p> */}
          </div><div className="smallcolumn">
          <h2>Perk Collection</h2>
          <div style={{maxWidth:"500px"}}>
            {worldPerkDeck.map((upgrade)=><WorldPerkButton key={upgrade} upgrade={worldPerkDictionary[upgrade]} state={state} popup={popup} updateState={updateState}/>)}
          </div>
        </div></div>
      </div>)
}