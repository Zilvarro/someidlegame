import {getStartingX} from './savestate'
import {spaces} from './utilities'

export default function AlphaScreen({state, updateState, setTotalClicks}) {
      
const buyAlphaUpgrade = (id)=>{
    updateState({name: "alphaUpgrade", id: id})
    setTotalClicks((x)=>x+1)
}

return (<div>{state.maxAlpha > 0 && <><p>&nbsp;</p><h2>Alpha</h2>
        <p>&alpha; = {state.alpha}</p>
        <p>&alpha;<sub>max</sub> = {state.maxAlpha}</p>
        <p>Your Alpha Max lets you start with x={getStartingX(state)} after resets</p>
        <p><button disabled={state.alpha < 1 || state.boughtAlpha[0]} onClick={()=>{buyAlphaUpgrade(0)}}>Get an extra formula slot</button>{spaces()}{state.boughtAlpha[0] ? <>Already bought</>: <>Cost: &alpha; = 1</>}</p>
        <p><button disabled={state.alpha < 2 || state.boughtAlpha[1]} onClick={()=>{buyAlphaUpgrade(1)}}>Double all idle production</button>{spaces()}{state.boughtAlpha[1] ? <>Already bought</>: <>Cost: &alpha; = 2</>}</p></>}
    </div>)
}