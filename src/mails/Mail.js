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
            updateState({name: "completeMail", mailid: mailid, reply})
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
            {state.mailsCompleted[mailid] === undefined ?
                <p style={{paddingLeft: "30px"}}>
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