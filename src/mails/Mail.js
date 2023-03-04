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
        if (!state.mailsCompleted[mailid])
            updateState({name: "completeMail", mailid: mailid, reply})
    }

    return (
        <details style={{paddingTop: "10px", color: isUnread ? "#FFAA66" : undefined}}>
            <summary onClick={markAsRead}>
                {mail.title}
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