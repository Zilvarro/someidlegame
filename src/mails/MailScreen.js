import './mails.css';
import { mailDictionary } from './MailDictionary';
import Mail from './Mail';

export default function MailScreen({state, updateState, popup}) {
    return (<div style={{marginLeft: "20px", fontSize: "20px"}}>
        <h1>Mails</h1>
        {state.mailsList.map((mailid)=>{
            return <Mail key={mailid} state={state} updateState={updateState} popup={popup} mailid={mailid} mail={mailDictionary[mailid]}/>
        }
        )}
    </div>)
}
