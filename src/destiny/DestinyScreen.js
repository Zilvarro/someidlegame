import {formatNumber} from '../utilities'
import DestinyWelcomeTab from './DestinyWelcomeTab'

export default function DestinyScreen({state, popup, updateState, setTotalClicks}) {

return (
    <div style={{color:"#ffff88"}}>
        {<h3 style={{fontSize: "32px", marginLeft: "10px", marginTop:"10px", marginBottom:"20px", textAlign:"left"}}>&#9733;&nbsp;=&nbsp;{formatNumber(state.destinyStars, state.settings.numberFormat, 8)}</h3>}
            <DestinyWelcomeTab tabKey="DestinyWelcomeTab" popup={popup} state={state} updateState={updateState} setTotalClicks={setTotalClicks}/>
    </div>)
}