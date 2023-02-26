export default function Mail({state, mail, popup, updateState, mailid}) {
    if (!mail)
        debugger
    return (
        <details style={{paddingTop: "10px"}}>
            <summary>
                {mail.title}
            </summary>
            <p style={{paddingLeft: "30px"}}>
                {mail.content}
            </p>
        </details>
    )
}