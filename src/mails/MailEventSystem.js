import { getGlobalMultiplier } from '../savestate';
import { mailDictionary } from './MailDictionary';

//Mail Status:
//ForCheck: Will be sent out once certain criteria are met
//Pending: Mail is sent out and will be received after a delay
//Received: Every mail that has been received
//Unread: Mail is received but not yet read
//Completed: Mail is responded by user
//Status changes are able to set follow up mails into ForCheck status

export const checkNewMails = (state)=>{
    for (let i = state.mailsForCheck.length - 1; i >= 0; i--) {
        const mailid = state.mailsForCheck[i]
        const mail = mailDictionary[mailid]
        if (!mail.check || mail.check(state)) {
            state.mailsPending.push({mailid:mailid, sentTime:Date.now()})
            state.mailsForCheck.splice(i, 1)
            if (mail.afterCheck)
                state.mailsForCheck = state.mailsForCheck.concat(mail.afterCheck)
        }
    }
}

export const updatePendingMails = (state)=>{
    let gotNewMail = false
    for (let i = state.mailsPending.length - 1; i >= 0; i--) {
        const mailid = state.mailsPending[i].mailid
        const mail = mailDictionary[mailid]
        if (true || !mail.delay || Date.now() - state.mailsPending[i].sentTime > 1000 * mail.delay / getGlobalMultiplier(state)) {
            if (state.mailsReceived[mailid]) { //Safety Check to prevent duplicate Mails
                state.mailsPending.splice(i, 1)
                continue
            }
            gotNewMail = true
            state.mailsUnread[mailid] = true
            state.mailsReceived[mailid] = true
            state.mailsList.unshift(mailid)
            state.mailsPending.splice(i, 1)
            if (mail.afterReceive)
                state.mailsForCheck = state.mailsForCheck.concat(mail.afterReceive)
            if (mail.getProgress)
                state.mailsProgress[mailid] = mail.getProgress()
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
    if (mail.afterReadConditional)
        state.mailsForCheck.concat(mail.afterReadConditional(state))
    delete state.mailsUnread[mailid]
}

export const progressMail = (state, mailid, path, subpath, value)=>{
    if (subpath !== undefined)
        state.mailsProgress[mailid][path][subpath] = value
    else if (path !== undefined)
        state.mailsProgress[mailid][path] = value
    else
        state.mailsProgress[mailid] = value

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