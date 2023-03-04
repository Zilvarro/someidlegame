import { mailDictionary } from './MailDictionary';

export const checkNewMails = (state)=>{
    let gotNewMail = false
    for (let i = state.mailsForCheck.length - 1; i >= 0; i--) {
        const mailid = state.mailsForCheck[i]
        const mail = mailDictionary[mailid]
        if (!mail.check || mail.check(state)) {
            gotNewMail = true
            state.mailsUnread[mailid] = true
            state.mailsReceived[mailid] = true
            state.mailsForCheck.splice(i, 1)
            if (mail.afterCheck)
            state.mailsForCheck = state.mailsForCheck.concat(mail.afterCheck)
        }
    }
    return gotNewMail
}

export const markAsRead = (state, mailid)=>{
    const mail = mailDictionary[mailid]
    if (!mail)
        debugger
    if (mail.afterRead)
        state.mailsForCheck = state.mailsForCheck.concat(mail.afterRead)
    delete state.mailsUnread[mailid]
}

export const completeMail = (state, mailid, reply)=>{
    const mail = mailDictionary[mailid]
    if (mail.afterComplete) {
        if (reply !== undefined)
            state.mailsForCheck = state.mailsForCheck.concat(mail.afterComplete[reply])
        else
            state.mailsForCheck = state.mailsForCheck.concat(mail.afterComplete)
    }
    state.mailsCompleted[mailid] = reply === undefined ? true : reply
    delete state.mailsUnread[mailid]
}