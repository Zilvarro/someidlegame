import './mails.css';
import { mailDictionary, mailList } from './MailDictionary';
import Mail from './Mail';

export default function MailScreen({state, updateState}) {
    const md = mailDictionary
    return (<div style={{padding: "10px", fontSize: "20px"}}>
        <h1>Mails</h1>
        <p>Under construction!</p>
        {mailList.map((mailid)=>{
            return <Mail key={mailid} state={state} updateState={updateState} mailid={mailid} mail={md[mailid]}/>
        }
        )}
    </div>)
}
