import {spaces} from './utilities'
import {getHolyFishChance} from './savestate'

export default function HatButton({state, updateState, setTotalClicks}) {
    const buyFisherHat = ()=>{
        updateState({name: "hatbutton"})
        setTotalClicks((x)=>x+1)
    }

    if (!state.flags.hatbutton)
        return;
    else if (state.holyFish < 0)
        return (
            <p>
                {state.flags.hatbutton && <>{spaces()}
                <button 
                    disabled={state.fishCount<100000} 
                    onClick={()=>buyFisherHat()}>
                    Buy Magical Fisherman's Hat
                </button>
                {spaces()}Cost: 100000 Fish
                {spaces()}It looks mesmerizing!</>}
            </p>
        )
    else {
        var holyFishChance = getHolyFishChance(state);
        var hattext;
        if (holyFishChance <= 0.001)
            hattext = "You are wearing the Magical Fisherman's hat."
        else if (holyFishChance <= 0.01)
            hattext = "Your Magical Fisherman's hat is shimmering."
        else if (holyFishChance <= 0.1)
            hattext = "Your Magical Fisherman's hat is glowing mysteriously."
        else
            hattext = "Your Magical Fisherman's hat is shining brightly."
        return (
            <p>
                {spaces()}{hattext}
            </p>
        )
    }
    
}