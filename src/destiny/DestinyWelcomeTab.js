import { getStarLightRate } from "../progresscalculation"
import { formatNumber } from "../utilities"
import { starConstellations, constellationList, constellationPrices} from "./DestinyConstellationDictionary"
import DestinyConstellationButton from "./DestinyConstellationButton"

export default function DestinyWelcomeTab({state, popup, updateState}) {
    
    const claimFirstStar = ()=>{
        updateState({name:"claimFirstStar"})
    }
    const performDestinyReset = ()=>{
        popup.confirm(<>DESTINY RESET<br/><br/>Reset the entire game for a Destiny Star. You lose everything that is not part of the Destiny Tab. Making a backup beforehand is highly recommended!<br/><br/>Also there are no new features, this is just a New Game Plus.<br/><br/>PERFORM DESTINY RESET?</>,()=>{
            updateState({name:"performDestinyReset"})
        })
    }

    const buyLight = (currency,cost)=>{
        if (state.starLight < cost)
            return
        updateState({name:"buyLightUpgrade", currency:currency, cost:cost})
    }

    // const passTime = (time)=>{
    //     updateState({name:"passTime", time:time*1000})
    // }

    const adderCost = Math.floor(100*Math.pow(1.15,state.lightAdder) * Math.pow(0.5, state.constellationCount))
    const doublerCost = Math.floor(1000*Math.pow(8,state.lightDoubler) * Math.pow(0.5, state.constellationCount))
    const raiserCost = Math.floor(10000*Math.pow(1000,state.lightRaiser))

    return (
        <div>{<>
            
                {state.destinyStars < 1 && <><h2>You finished the game!</h2><p>Claim this Destiny Star as a reward!</p><br/><button onClick={claimFirstStar}><b>CLAIM DESTINY STAR</b></button></>}
                {state.destinyStars >= 1 && <>
                    <h2>Destiny Stars</h2>
                    <p>You have {state.destinyStars} Destiny Star{state.destinyStars !== 1 && "s"}.<br/>They multiply the Overall Game Speed.<br/>You can get more Destiny stars by replaying the game.</p>
                    {state.progressionLayer >= 2 && <button onClick={performDestinyReset} className="fbutton" style={{ backgroundColor:"#FFFF88", fontWeight:"bold", width:"280px"}} ><b>{"CHANGE YOUR DESTINY"}</b></button>}
                    <br/><h2>Starlight</h2>
                    You get {formatNumber(getStarLightRate(state),state.settings.numberFormat,3)} Starlight per Second!<br/>
                    Starlight: {formatNumber(Math.floor(state.starLight),state.settings.numberFormat,3)}{constellationPrices[state.constellationCount] < Infinity && <> / {formatNumber(constellationPrices[state.constellationCount],state.numberFormat)}</>}<br/>
                    {/* <button onClick={()=>buyLight("destinyStars",0)}>+ 1 Star</button><br/>
                    <button onClick={()=>passTime(3600)}>+ 1 Hour</button><br/>
                    <button onClick={()=>passTime(24*3600)}>+ 1 Day</button><br/>
                    <div>Passed Time: {secondsToHms(state.passedTime / 1000)}</div> */}
                    <br/>
                    {!state.lightAdder && state.starLight < adderCost && <><button onClick={()=>buyLight("starLight",0)}>Gaze at the night sky</button><br/></>}
                    <button onClick={()=>buyLight("lightAdder",adderCost)} disabled={state.lightAdder >= 5000 || state.starLight < adderCost}>Astral Glance ({state.lightAdder})</button> Cost: {formatNumber(adderCost,state.settings.numberFormat)} Starlight<br/>
                    <button onClick={()=>buyLight("lightDoubler",doublerCost)} disabled={state.lightDoubler >= 1000 || state.starLight < doublerCost}>Shooting Star ({state.lightDoubler})</button> Cost: {formatNumber(doublerCost,state.settings.numberFormat)} Starlight<br/>
                    <button onClick={()=>buyLight("lightRaiser",raiserCost)} disabled={state.lightRaiser >= 200 || state.starLight < raiserCost}>Glowing Moon ({state.lightRaiser})</button> Cost: {formatNumber(raiserCost,state.settings.numberFormat)} Starlight<br/><br/>
                    <h2>Star Constellations</h2>
                    {state.constellationCount < 12 ? <>Max out Starlight and sacrifice all Starlight Upgrades to complete Star Constellations.<br/></> : <>All Star Constellations are complete. Congratulations!<br/></>}
                    Each completed Constellation cuts the prices of Astral Glances and Shooting Stars in half.<br/>
                    {constellationList.map((id)=><DestinyConstellationButton key={id} popup={popup} constellation={starConstellations[id]} state={state} updateState={updateState}/>)}<br/><br/>
                </>}
            </>}
        </div>)
}