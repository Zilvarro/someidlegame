export default function WorldPerkButton({state, popup, upgrade, updateState, cardSlot}) {
  
  const isCollection = cardSlot === undefined
  if (upgrade.fixed) return upgrade.fixed
  if (isCollection && (!state.worldPerks[upgrade.id] || state.worldPerksAvailable.includes(upgrade.id))) {
    return undefined
  }

  const clickWorldPerk = ()=>{
      if (cardSlot === undefined) {
          popup.alert(<>{upgrade.title}<br/><br/>{upgrade.description}</>, undefined, undefined, true)
      } else if (state.worldPerks[upgrade.id]) {
          updateState({name: "addToCollection", index: cardSlot})
      } else if (state.essence < upgrade.cost || !state.canBuyPerk) {
          popup.alert(<>{upgrade.title}<br/><br/>{upgrade.description}<br/><br/>Need: {upgrade.cost} &omega;</>, undefined, undefined, true)
      } else {
          popup.confirm(<>{upgrade.title}<br/><br/>{upgrade.description}<br/><br/>Activate this Card?</>,()=>{
              updateState({name: "worldPerk", upgrade: upgrade})
          }, state.settings.alphaUpgradePopup === "OFF", true)
      }
  }

  const disabled = upgrade.id === "NULL" || (upgrade.requires && !state.worldPerks[upgrade.requires])
  let backgroundColor
  if (state.worldPerks[upgrade.id]) {
      backgroundColor = "#44FFCC"
  } else if (disabled) {
      backgroundColor = "#444444"
  } else if (state.essence < upgrade.cost || !state.canBuyPerk) {
      backgroundColor = "#888888"
  } else {
      backgroundColor = undefined
  }

  const buttonStyle={
      margin: isCollection ? "5px" : "10px",
      border:"0px", 
      padding:"0px", 
      fontFamily: "Monaco", 
      fontWeight: "bold",
      width: isCollection ? "94px" : "160px", 
      height: isCollection ? "60px" : "180px",
      fontSize: isCollection ? "auto" :"16px",
      backgroundColor: backgroundColor,
      color: "black",
      verticalAlign: "top",
  }

  if (upgrade.id === "NULL") return (<button disabled={true} style={buttonStyle}></button>)

  return (
      <button title={disabled ? undefined : upgrade.description} disabled={disabled} onClick={clickWorldPerk} style={buttonStyle}>{upgrade.line1}<br/>{upgrade.line2}{!isCollection && <><br/><br/><br/>Need: {upgrade.cost} &omega;</>}</button>
  )

}