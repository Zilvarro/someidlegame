import { getStarLightRate } from "../progresscalculation"
import { formatNumber } from "../utilities"

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

    const adderCost = Math.floor(50*Math.pow(1.1,state.lightAdder))
    const doublerCost = Math.floor(200*Math.pow(10,state.lightDoubler))
    const raiserCost = Math.floor(1000*Math.pow(1000,state.lightRaiser))

    return (
        <div>{<>
            <h2>You finished the game!</h2>
                {state.destinyStars < 1 && <><p>Claim this Destiny Star as a reward!</p><br/><button onClick={claimFirstStar}><b>CLAIM DESTINY STAR</b></button></>}
                {state.destinyStars >= 1 && <>
                    <p>You have {state.destinyStars} Destiny Star{state.destinyStars !== 1 && "s"}.</p>
                    <p>Your Destiny Stars multiply the Overall Game Speed.</p><br/>
                    {!state.lightAdder&& state.starLight < 50 && <>A star shimmers at the night sky.<br/></>}
                    {!!state.lightAdder && <>Your Destiny Stars produce {formatNumber(getStarLightRate(state),state.settings.numberFormat,3)} Starlight per Second!<br/></>}
                    {!!state.starLight&& <>You have {formatNumber(state.starLight,state.settings.numberFormat,3)} Starlight!<br/></>}
                    {/* <button onClick={()=>buyLight("destinyStars",0)}>Star ({state.destinyStars})</button><br/> */}
                    <br/>
                    {!state.lightAdder && state.starLight < 50 && <><button onClick={()=>buyLight("starLight",0)}>Gaze at the night sky</button><br/></>}
                    <button onClick={()=>buyLight("lightAdder",adderCost)} disabled={state.lightAdder >= 10000 || state.starLight < adderCost}>Astral Glance ({state.lightAdder})</button> Cost: {formatNumber(adderCost,state.settings.numberFormat)} Starlight<br/>
                    <button onClick={()=>buyLight("lightDoubler",doublerCost)} disabled={state.lightDoubler >= 1000 || state.starLight < doublerCost}>Shooting Star ({state.lightDoubler})</button> Cost: {formatNumber(doublerCost,state.settings.numberFormat)} Starlight<br/>
                    <button onClick={()=>buyLight("lightRaiser",raiserCost)} disabled={state.lightRaiser >= 200 || state.starLight < raiserCost}>Glowing Moon ({state.lightRaiser})</button> Cost: {formatNumber(raiserCost,state.settings.numberFormat)} Starlight<br/><br/>
                    {state.progressionLayer >= 2 && <button onClick={performDestinyReset} className="fbutton" style={{ backgroundColor:"#FFFF88", fontWeight:"bold", width:"280px"}} ><b>{"CHANGE YOUR DESTINY"}</b></button>}
                </>}
            </>}
        </div>)
}