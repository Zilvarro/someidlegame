import React, { useState } from 'react'
import { getGlobalMultiplier } from '../savestate'
import {formatNumber} from '../utilities'

export default function Mail({state, mail, popup, updateState, mailid}) {

    const [ isUnread ] = useState(state.mailsUnread[mailid] || !state.mailsReceived[mailid])

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
            let correctCount = 1 //correctCount + 1 since state is not updated yet
            let totalCount = 1
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
            if (correctCount === mail.exercises.length) { 
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

    const changeRating = (delta)=>{
        const playerrating = state.mailsProgress[mailid]
        const newrating = playerrating + delta * getGlobalMultiplier(state)
        updateState({name: "progressMail", mailid, value: newrating})
    }

    const submitRating = ()=>{
        updateState({name: "completeMail", mailid, reply: 0})
    }

    const unlockMail = ()=>{
        if (state.alpha < mail.alphaCost) return
        updateState({name: "unlockMail", mailid})
    }

    const getAverageRating = ()=>{
        const playerrating = state.mailsProgress["Survey"]
        const aggregated = (183 + playerrating)/28
        return aggregated
    }

    let displayColor = undefined //white
    if (state.mailsCompleted[mailid] !== undefined || (!mail.afterComplete && !mail.responses))
        displayColor = "#666666" //grey
    if (isUnread) displayColor = "#FFAA66" //orange

    if (mail.alphaCost > 0 && !state.mailsUnlocked[mailid]) return (
        <details style={{paddingTop: "10px", color: displayColor}}>
            <summary onClick={markAsRead}>
                [{mail.sender}]&nbsp;{mail.title}
            </summary>
            <p style={{paddingLeft: "30px"}}>
                <button disabled={state.alpha < mail.alphaCost} onClick={unlockMail}>UNLOCK MAIL CONTENT</button>&nbsp;&nbsp;Cost: &alpha; = {formatNumber(mail.alphaCost, state.settings.numberFormat, 0)}
            </p>
        </details>
    )

    return (
        <details style={{paddingTop: "10px", color: displayColor}}>
            <summary onClick={markAsRead}>
                [{mail.sender}]&nbsp;{mail.title}
            </summary>
            <p style={{paddingLeft: "30px"}}>
                {mail.content}
            </p>

            {mail.rating && (state.mailsCompleted["Survey"] !== undefined? 
                <p style={{paddingLeft: "50px", fontWeight: 900 }}>
                    {state.mailsProgress[mailid]} / 5 Stars
                </p> 
            : 
                <p style={{paddingLeft: "50px", fontWeight: 900 }}>
                    <span className="fbutton" style={{width:"auto", backgroundColor:"#ffffff", paddingLeft:"12px", paddingRight: "12px"}} onClick={()=>changeRating(-1)}>&#8211;</span>&nbsp;&nbsp;
                    {state.mailsProgress[mailid]} / 5 Stars
                    &nbsp;&nbsp;<span className="fbutton" style={{width:"auto", backgroundColor:"#ffffff", paddingLeft:"12px", paddingRight: "12px"}} onClick={()=>changeRating(1)}>+</span><br/><br/>
                    <button onClick={submitRating} style={{marginLeft: "100px"}}>Submit</button>
                </p> 
            )}

            {mail.surveyresult &&
                <p style={{paddingLeft: "50px"}}>
                    Total submissions: 28<br/>
                    Your rating: {state.mailsProgress["Survey"].toFixed(0)} / 5 stars.<br/>
                    Average rating: {getAverageRating().toFixed(2)} / 5 stars.<br/><br/>
                    {getAverageRating() >= 10 && <>This gotta be the best game of the world!<br/></>}
                    {getAverageRating() >= 4 && <>I am very happy with that!<br/></>}
                    {getAverageRating() > 1 && getAverageRating() < 4 && <>I was hoping it would score a little better!<br/></>}
                    {getAverageRating() <= 1 && <>Oh no, my game is horrible!<br/></>}
                    Thank you for your participation.
                </p>
            }

            {mail.exercises &&
                mail.exercises.map((exercise, eindex)=><p style={{paddingLeft: "50px", fontWeight: exercise.important ? 900 : undefined}} key={eindex}>
                    {exercise.question}&nbsp;=&nbsp;{state.mailsProgress[mailid][eindex][exercise.correct] ? exercise.answers[exercise.correct] : "?"}&nbsp;
                    {!state.mailsProgress[mailid][eindex][exercise.correct] && <span style={{display:"inline-block"}}>{exercise.answers.map((answer, aindex)=><button key={aindex} disabled={state.mailsProgress[mailid][eindex][aindex]} onClick={()=>selectAnswer(eindex,aindex)} style={{marginLeft: "10px"}}>
                        {answer}
                    </button>)}</span>}
                </p>)
            }

            {mail.transfer && (state.mailsCompleted["Transfer"] === undefined ? 
                <p style={{paddingLeft: "50px", fontWeight: 900 }}>
                    <span className="fbutton" style={{width:"auto", backgroundColor:"#ffffff"}} onClick={()=>changeRating(+1)}>Transfer 1$</span>
                    {state.mailsProgress["Transfer"] > 0 && <><br/><br/>${state.mailsProgress["Transfer"]} Transferred</>}
                </p> 
            : 
                <p style={{paddingLeft: "50px", fontWeight: 900 }}>
                    {state.mailsProgress["Transfer"] > 0 && <>${state.mailsProgress["Transfer"]} Transferred</>}
                </p> 
            )}

            {state.mailsCompleted[mailid] === undefined ?
                !mail.getProgress && <p style={{paddingLeft: "30px"}}>
                    {mail.responses?.slice(0, mail.responses.length - (mail.hiddenResponses || 0)).map((response, index)=><button key={index} onClick={()=>completeMail(index)} style={{marginRight:"20px"}}>{response}</button>)}
                </p>
            :
                <p style={{paddingLeft: "30px"}}>
                    &raquo;&nbsp;{mail.responses[state.mailsCompleted[mailid]]}
                </p>
            }
        </details>
    )
}