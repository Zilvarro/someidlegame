export default function DestinyWelcomeTab({state, popup, updateState}) {
    const claimFirstStar = ()=>{
        updateState({name:"claimFirstStar"})
    }
    const performDestinyReset = ()=>{
        popup.confirm(<>DESTINY RESET<br/><br/>Reset the entire game for a Destiny Star. This includes Mails and you won't even be able to access the Destiny Tab again until you make it back here. Making a backup beforehand is highly recommended!<br/><br/>Also there are no new features, this is just a New Game Plus.<br/><br/>PERFORM DESTINY RESET?</>,()=>{
            popup.alert("This feature is not yet implemented :(")
        })
    }
    return (
        <div>{<>
            <h2>You finished the game!</h2>
                {state.destinyStars < 1 && <><p>Claim this Destiny Star as a reward!</p><br/><button onClick={claimFirstStar}><b>CLAIM DESTINY STAR</b></button></>}
                {state.destinyStars >= 1 && <>
                    <p>You have {state.destinyStars} Destiny Star{state.destinyStars !== 1 && "s"}.</p>
                    <p>Your Destiny Stars multiply the Overall Game Speed.</p><br/><br/><br/><br/><br/>
                    <button onClick={performDestinyReset} className="fbutton" style={{ backgroundColor:"#FFFF88", fontWeight:"bold", width:"280px"}} ><b>{"CHANGE YOUR DESTINY"}</b></button>
                </>}
            </>}
        </div>)
}