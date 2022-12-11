import { getChallengeBonus } from "../savestate"

export default function AlphaChallengeButton({state, challenge, popup, updateState}) {
    
    const clickAlphaChallenge = ()=>{
        popup.confirm(<>Start the "{challenge.title}" Challenge?<br/>You will lose your current formula progress.</>,()=>{
            updateState({name: "enterChallenge", challenge: challenge})
        })
    }

    const disabled = state.insideChallenge
    let backgroundColor
    if (state.activeChallenges[challenge.id]) { //ACTIVE => RED
        backgroundColor = "#ff5555"
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

    //Locked
    if (challenge.requirement && challenge.requirement > getChallengeBonus(state).full) {
        return (
            <button disabled={true} style={buttonStyle}>{challenge.title}<br/><br/>Complete {challenge.requirement} Challenges to Unlock<br/><br/>Locked</button>
        )
    }

    //Normal
    return (
        <button disabled={disabled} onClick={clickAlphaChallenge} style={buttonStyle}>{challenge.title}<br/><br/>{challenge.description}<br/><br/>{state.challengeProgress[challenge.id] || 0}/4 Complete</button>
    )
}