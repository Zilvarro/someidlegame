import { getStarLightRate } from "../progresscalculation"
import { formatNumber } from "../utilities"
import { starConstellations, constellationList, constellationPrices} from "./DestinyConstellationDictionary"
import DestinyConstellationButton from "./DestinyConstellationButton"

const starlightDictionary = {
    single: {
        id: "single",
        title: "Gaze at the night sky",
        description: "A single ray of Starlight may strike your eye",
        currency: "starLight",
        costBase: 0,
        costMultiplier: 1,
        maxAmount: 1e6,
        className: undefined,
        hideAmount: true,
        useDefaultStyle: true,
    },
    adder: {
        id: "adder",
        title: "Astral Glance",
        description: "Each Astral Glance produces one Starlight per Second",
        currency: "lightAdder",
        costBase: 100,
        costMultiplier: 1.15,
        maxAmount: 1000,
        className: "fbutton",
    },
    doubler: {
        id: "doubler",
        title: "Shooting Star",
        description: "Each Shooting Star doubles Starlight gained from Astral Glances",
        currency: "lightDoubler",
        costBase: 10000,
        costMultiplier: 8,
        maxAmount: 1000,
        className: "fbutton",
    },
    raiser: {
        id: "raiser",
        title: "Luminous Moon",
        description: "Each Luminous Moon multiplies Starlight gain by the number of Destiny Stars",
        currency: "lightRaiser",
        costBase: 1000000,
        costMultiplier: 1000,
        maxAmount: 1000,
        className: "fbutton",
    },
}

export default function DestinyWelcomeTab({state, popup, updateState}) {
    
    const claimFirstStar = ()=>{
        updateState({name:"claimFirstStar"})
    }
    const performDestinyReset = ()=>{
        popup.confirm(<>DESTINY RESET<br/><br/>Reset the entire game for a Destiny Star. You lose everything that is not part of the Destiny Tab. Making a backup beforehand is highly recommended!<br/><br/>Also there are no new features, this is just a New Game Plus.<br/><br/>PERFORM DESTINY RESET?</>,()=>{
            updateState({name:"performDestinyReset"})
        })
    }

    // const passTime = (time)=>{
    //     updateState({name:"passTime", time:time*1000})
    // }

    // const buyLight = (currency,cost)=>{
    //     if (state.starLight < cost)
    //         return
    //     updateState({name:"buyLightUpgrade", currency:currency, cost:cost})
    // }

    return (
        <div>{<>
            
                {state.destinyStars < 1 && <><h2>You finished the game!</h2><p>Claim this Destiny Star as a reward!</p><br/><button onClick={claimFirstStar}><b>CLAIM DESTINY STAR</b></button></>}
                {state.destinyStars >= 1 && <>
                    <h2>Destiny Stars</h2>
                    <p>You have {state.destinyStars} Destiny Star{state.destinyStars !== 1 && "s"}.<br/>Destiny Stars multiply the speed of the previous layers.<br/>You can get Destiny Stars by replaying the game.</p>
                    {state.progressionLayer >= 2 && <button onClick={performDestinyReset} className="fbutton" style={{ backgroundColor:"#FFFF88", fontWeight:"bold", width:"280px"}} ><b>{"CHANGE YOUR DESTINY"}</b></button>}
                    <br/><h2>Starlight</h2>
                    <h3>&lambda; = {formatNumber(Math.floor(state.starLight),state.settings.numberFormat,3)}</h3>
                    You get {formatNumber(getStarLightRate(state),state.settings.numberFormat,3)} Starlight per Second!<br/>
                    {constellationPrices[state.constellationCount] < Infinity && <>The night sky can hold up to {formatNumber(constellationPrices[state.constellationCount],state.numberFormat)} Starlight.<br/></>}
                    {/* <button onClick={()=>buyLight("destinyStars",0)}>+ 1 Star</button><br/>
                    <button onClick={()=>passTime(3600)}>+ 1 Hour</button><br/>
                    <button onClick={()=>passTime(24*3600)}>+ 1 Day</button><br/>
                    <div>Passed Time: {secondsToHms(state.passedTime / 1000)}</div> */}
                    <br/>
                    <DestinyStarlightButton upgrade={starlightDictionary["adder"]} state={state} updateState={updateState}/>
                    <DestinyStarlightButton upgrade={starlightDictionary["doubler"]} state={state} updateState={updateState}/>
                    <DestinyStarlightButton upgrade={starlightDictionary["raiser"]} state={state} updateState={updateState}/><br/>
                    {getStarLightRate(state) < 20 && <><DestinyStarlightButton upgrade={starlightDictionary["single"]} state={state} updateState={updateState}/><br/></>}
                    {/* {getStarLightRate(state) < 20 && <><button onClick={()=>updateState({name:"buyLightUpgrade", currency:"starLight", cost:0})}>Gaze at the night sky</button><br/><br/></>} */}
                    <h2>Star Constellations</h2>
                    {state.constellationCount < 12 ? <>Fill the entire night sky with Starlight to complete Star Constellations.<br/></> : <>All Star Constellations are complete. Congratulations!<br/></>}
                    Each Constellation halves the prices of Starlight Upgrades and increases the Starlight cap tenfold.<br/>
                    {constellationList.map((id)=><DestinyConstellationButton key={id} popup={popup} constellation={starConstellations[id]} state={state} updateState={updateState}/>)}<br/><br/>
                </>}
            </>}
        </div>)
}

function DestinyStarlightButton({state, updateState, upgrade}) {
    const buyLight = (currency,cost)=>{
        if (state.starLight < cost)
            return
        updateState({name:"buyLightUpgrade", currency:currency, cost:cost})
    }
    const isMaxxed = state[upgrade.currency] >= upgrade.maxAmount
    const buttonStyle={
        margin:"2px",
        border:"0px", 
        padding:"0px", 
        fontWeight: "bold",
        width:"200px", 
        height:"50px", 
        fontSize:"16px",
        backgroundColor: isMaxxed ? "#ffff88" : undefined,
        color: "black",
    }
    //const buttonStyle = {width: "200px", backgroundColor: isMaxxed ? "#ffff00" : "#ffffff", fontWeight: "bolder"}
    const actualCost = Math.floor(upgrade.costBase*Math.pow(upgrade.costMultiplier, state[upgrade.currency]) * Math.pow(0.5, state.constellationCount))
    return <><button title={upgrade.description} style={upgrade.useDefaultStyle ? undefined : buttonStyle} onClick={()=>buyLight(upgrade.currency, actualCost)} disabled={isMaxxed || state.starLight < actualCost}>{upgrade.title}{!upgrade.hideAmount && <>&nbsp;({state[upgrade.currency]})</>}</button>{state[upgrade.currency] < 1000 && actualCost > 0 && <>&nbsp;&nbsp;Cost: &lambda;={formatNumber(actualCost,state.settings.numberFormat)}</>}<br/></>
                    
}