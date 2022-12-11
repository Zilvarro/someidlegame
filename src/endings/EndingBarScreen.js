import { useState } from 'react'

import {endingList} from './EndingDictionary'
import EndingFinalScreen from './EndingFinalScreen'

export default function EndingBarScreen({state, popup, updateState}) {
    const [ oldEnding, updateOldEnding] = useState(0)
    const [ actionNumber , setActionNumber ] = useState(0)
    const ending = endingList[state.currentEnding]
    if (oldEnding !== state.currentEnding) {
        setActionNumber(0)
        updateOldEnding(state.currentEnding)
    }
    const currentAction = ending.actions[actionNumber] || ending.actions[0]
    const currencyAmount = 0
    const [ headerText , setHeaderText ] = useState(currentAction.headerText)
    const [ startTime , setStartTime ] = useState(0)

    const deltaMilliSeconds = startTime ? Date.now() - startTime : 0
    const goal = 100 * currentAction.durationSeconds //TODO Add a zero after debugging
    const percentage = deltaMilliSeconds / goal
    const isDone = (percentage >= 1)
    const progressBarWidth = isDone ? "100%" : Math.min(101 * percentage,100).toFixed(2) + "%"

    if (startTime && isDone){
        setStartTime(0)
        const newHeaderText = ending.actions[actionNumber + 1].headerText
        if (newHeaderText && newHeaderText !== headerText)
            setHeaderText(newHeaderText)
        setActionNumber(actionNumber + 1)

        //Trigger Special Effects Here
    }

    const clickProgressBar = ()=>{
        if (currentAction.finishOnClick) {
            updateState({name:"completeEnding", endingName:currentAction.endingName})
            return
        }
        if (!startTime)
            setStartTime(Date.now())
    }

    if (currentAction.final) {
        return <EndingFinalScreen state={state} action={currentAction} updateState={updateState} popup={popup}/>
    }
        
    return (
        <div style={{position:"absolute", margin:"auto", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center"}}>{<>
            <p><b>{headerText}</b></p><br/><br/>
            <p>{ending.currencyName}{ending.ascending ? Math.ceil(ending.currencyGoal - currencyAmount) : Math.floor(currencyAmount)}</p><br/>
            <div onClick={clickProgressBar} style={{position: "relative", margin:"auto", color: "#000000", backgroundColor:"#ffffff", border:"2px solid", height:"20px",maxWidth:"320px", minWidth:"260px"}}>
                <div style={{backgroundColor:currentAction.barColor || "#aaaaaa", border:"0px", height:"20px", width:progressBarWidth}}>
                    <div style={{userSelect:"none",whiteSpace:"nowrap",position:"absolute", left:"50%", transform:"translateX(-50%)"}}><b>{currentAction.title}</b></div>
                </div>
            </div><br/><br/>
            {ending.generators.map((generator)=>
                <div key={generator.title}>{generator.title}: 0<br/></div>
            )}
            Total KpS: {0}<br/>
            </>}
        </div>)
}