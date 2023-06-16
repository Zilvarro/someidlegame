import ReactDOMServer from 'react-dom/server'

export default function AlphaStartingStone({state, boundary,stone, popup, updateState}) {
   
    const isTurned = state.startingStoneTurned[stone.id] 
    const isMaxxed = state.startingStoneLevel[stone.id] >= 10
    const isBounded = !!state.startingStoneLevel[stone.id] && state.startingStoneLevel[stone.id] * (1 + Math.sqrt(state.startingStoneLevel[stone.id])) > 2 * boundary

    let disabled = false
    if ((!state.startingStoneLevel[stone.id] || state.startingStoneLevel[stone.id] <= 0) && state.startingStoneMode===-1)
        disabled = true
    if (isMaxxed && state.startingStoneMode===1)
        disabled = true
    if (isBounded && state.startingStoneMode===1)
        disabled = true
    if (!isTurned && state.startingStoneMode!==0)
        disabled = true
    let backgroundColor
    if (isMaxxed) { //MAXXED => RED
        backgroundColor = "#ff5555"
    } else if (isBounded) { //LEVELED => PINK
        backgroundColor = "#ff9999"
    } else if (!state.startingStoneTurned) {
        backgroundColor = "#444444"
    } else if (disabled) {
        backgroundColor = "#888888"
    } else {
        backgroundColor = undefined
    }

    const buttonStyle={
        margin:"2px",
        border:"0px", 
        padding:"10px", 
        fontFamily: "Monaco", 
        fontWeight: "bold",
        width:"100px", 
        height:"80px", 
        fontSize:"14px",
        backgroundColor: backgroundColor,
        color: "black",
        verticalAlign: "top",
    }

    const clickStartingStone = ()=>{
        switch (state.startingStoneMode) {
            case 1:
                if (!disabled) {
                    disabled = true
                    updateState({name: "incrementStone", stone: stone})
                }
                break;
            case -1:
                if (!disabled) {
                    disabled = true
                    updateState({name: "decrementStone", stone: stone})
                }
                break
            default:
                popup.alert(<>{stone.title}<br/><br/>{stone.description}</>,undefined,undefined,true)
                break;
        }
    }

    //Normal
    return (
        <button disabled={disabled} title={stone.tooltip || ReactDOMServer.renderToString(stone.description)} onClick={clickStartingStone} style={buttonStyle}>{stone.title}<br/>{state.startingStoneLevel[stone.id] || <>&nbsp;</>}</button>
    )
}