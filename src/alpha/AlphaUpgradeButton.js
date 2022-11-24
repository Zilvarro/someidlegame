export default function AlphaUpgradeButton({state, popup, upgrade, updateState}) {
    
    if (upgrade.fixed) return upgrade.fixed

    const clickAlphaUpgrade = ()=>{
        if (state.alphaUpgrades[upgrade.id]) {
            popup.alert(<>{upgrade.title}<br/><br/>{upgrade.description}<br/><br/>BOUGHT!</>)
        } else if (state.alpha < upgrade.cost) {
            popup.alert(<>{upgrade.title}<br/><br/>{upgrade.description}<br/><br/>Cost: {upgrade.cost} &alpha;</>)
        } else {
            popup.confirm(<>{upgrade.title}<br/><br/>{upgrade.description}<br/><br/>Buy for {upgrade.cost} &alpha;?</>,()=>{
                updateState({name: "alphaUpgrade", upgrade: upgrade})
            })
        }
    }

    const disabled = upgrade.requires && !state.alphaUpgrades[upgrade.requires]
    let backgroundColor
    if (state.alphaUpgrades[upgrade.id]) {
        backgroundColor = "#ff9999"
    } else if (disabled) {
        backgroundColor = "#222222"
    } else if (state.alpha < upgrade.cost) {
        backgroundColor = "#888888"
    } else {
        backgroundColor = undefined
    }

    const buttonStyle={
        margin:"2px",
        border:"0px", 
        padding:"0px", 
        fontFamily: "Monaco", 
        fontWeight: "bold",
        width:"160px", 
        height:"100px", 
        fontSize:"16px",
        backgroundColor: backgroundColor,
        color: "black",
        verticalAlign: "top",
    }

    return (
        <button title={disabled ? undefined : upgrade.description} disabled={disabled} onClick={clickAlphaUpgrade} style={buttonStyle}>{upgrade.title}<br/>{upgrade.cost} &alpha;</button>
    )

}