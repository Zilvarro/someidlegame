export default function AlphaChallengeButton({state, challenge, popup, updateState}) {
    
    const clickAlphaChallenge = ()=>{
        popup.confirm(<>Start the "{challenge.title}" Challenge?<br/>This will perform an &alpha;-Reset.</>,()=>{
            updateState({name: "enterChallenge", challenge: challenge})
        })
    }

    const disabled = state.insideChallenge
    let backgroundColor
    if (state.activeChallenges[challenge.id]) { //ACTIVE => RED
        backgroundColor = "#ff6666"
    } else if (state.clearedChallenges[challenge.id]) { //FULLY CLEARED => PINK
        backgroundColor = "#ff9999"
    } else if (state.insideChallenge) {
        backgroundColor = "#888888"
    } else {
        backgroundColor = undefined
    }

    const buttonStyle={
        margin:"2px",
        border:"0px", 
        padding:"20px", 
        fontFamily: "Monaco", 
        fontWeight: "bold",
        width:"320px", 
        height:"200px", 
        fontSize:"16px",
        backgroundColor: backgroundColor,
        color: "black",
        verticalAlign: "top",
    }

    return (
        <button disabled={disabled} onClick={clickAlphaChallenge} style={buttonStyle}>{challenge.title}<br/><br/>{challenge.description}<br/><br/>0/4 Complete</button>
    )
}