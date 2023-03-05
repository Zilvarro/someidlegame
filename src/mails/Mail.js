import React, { useState } from 'react'

export default function Mail({state, mail, popup, updateState, mailid}) {

    const [ isUnread ] = useState(state.mailsUnread[mailid] || !state.mailsReceived[mailid])

    if (!mail)
        debugger
    if (!state.mailsReceived[mailid]) 
        return undefined

    const markAsRead = ()=>{
        if (state.mailsUnread[mailid])
            updateState({name: "markAsRead", mailid: mailid})
    }

    const completeMail = (reply)=>{
        if (state.mailsCompleted[mailid] === undefined)
            updateState({name: "completeMail", mailid, reply})
    }

    const selectAnswer = (eindex, aindex)=>{
        if (mail.exercises[eindex].correct === aindex) {
            updateState({name: "progressMail", mailid, path: eindex, subpath:aindex, value: true})
            //Check if mail is completed
            let correctCount = 0
            let totalCount = 0
            let sheetCount = 0
            for(let i = 0; i < mail.exercises.length; i++) {
                let exercise = mail.exercises[i]
                let answersheet = state.mailsProgress[mailid][i]
                for (let j = 0; j < answersheet.length; j++) {
                    sheetCount++
                    if (answersheet[j]) {
                        totalCount++
                        if (exercise.correct === j)
                            correctCount++
                    }
                }
            }
            if (correctCount + 1 === mail.exercises.length) { //correctCount + 1 since state is not updated yet
                const mistakes = totalCount - correctCount
                if (mistakes === 0)
                    updateState({name: "completeMail", mailid, reply: 0}) //Flawless
                else if (mistakes === 1)
                    updateState({name: "completeMail", mailid, reply: 1}) //Good
                else if (totalCount < sheetCount)
                    updateState({name: "completeMail", mailid, reply: 2})
                else
                    updateState({name: "completeMail", mailid, reply: 3}) //Terrible
            }
        } else {
            updateState({name: "progressMail", mailid, path: eindex, subpath: aindex, value: true})
            popup.alert("That was incorrect. Try again!")
        }
    }

    let displayColor = undefined //white
    if (state.mailsCompleted[mailid] !== undefined || !mail.afterComplete)
        displayColor = "#666666" //grey
    if (isUnread) displayColor = "#FFAA66" //orange

    return (
        <details style={{paddingTop: "10px", color: displayColor}}>
            <summary onClick={markAsRead}>
                [{mail.sender}]&nbsp;{mail.title}
            </summary>
            <p style={{paddingLeft: "30px"}}>
                {mail.content}
            </p>

            {mail.exercises &&
                mail.exercises.map((exercise, eindex)=><p style={{paddingLeft: "50px", fontWeight: exercise.important ? 900 : undefined}} key={eindex}>
                    {exercise.question}&nbsp;=&nbsp;{state.mailsProgress[mailid][eindex][exercise.correct] ? exercise.answers[exercise.correct] : "?"}&nbsp;
                    {!state.mailsProgress[mailid][eindex][exercise.correct] && <span style={{display:"inline-block"}}>{exercise.answers.map((answer, aindex)=><button key={aindex} disabled={state.mailsProgress[mailid][eindex][aindex]} onClick={()=>selectAnswer(eindex,aindex)} style={{marginLeft: "10px"}}>
                        {answer}
                    </button>)}</span>}
                </p>)
            }

            {state.mailsCompleted[mailid] === undefined ?
                !mail.getProgress && <p style={{paddingLeft: "30px"}}>
                    {mail.responses?.map((response, index)=><button key={index} onClick={()=>completeMail(index)} style={{marginRight:"20px"}}>{response}</button>)}
                </p>
            :
                <p style={{paddingLeft: "30px"}}>
                    &raquo;&nbsp;{mail.responses[state.mailsCompleted[mailid]]}
                </p>
            }
            
        </details>
    )
}