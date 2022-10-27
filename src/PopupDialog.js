import Modal from 'simple-react-modal'

export const makeShowPopup = (popupState, setPopupState) => {
    return {
        show: (text, options, callback)=>{
            setPopupState({text: text, options: options, callback: callback, visible: true})
        },
        alert: (text, callback)=>{
            setPopupState({text: text, options: ["OK"], callback: callback, visible: true})
        },
        confirm: (text, callback)=>{
            const mycallback = (option)=>(option==="YES" && callback(option))
            setPopupState({text: text, options: ["YES","NO"], callback: mycallback, visible: true})
        },
    } 
}

export function PopupDialog({popupState, setPopupState}) {
    const closePopup = (option) => {
        const callback = popupState.callback
        setPopupState({text: "", options: [], callback: ()=>true, visible:false})
        callback?.(option)
    }

    return (
        <Modal
            style={{}}
            containerStyle={{position: "absolute", left: "50%", top: "30%", transform: "translate(-50%, -50%)", background: 'lightgray', color: 'black', border: "4px solid #666666", textAlign: "center", fontWeight: "bold", width:"max-content", maxWidth:"80%"}}
            show={popupState.visible}>
            <p>{popupState.text}</p>
            {popupState.options.map(option=>
                <button key={option} onClick={()=>closePopup(option)} style={{padding:"2px 10px 2px 10px", margin:"10px", fontWeight:"bold"}}>{option}</button>
            )}
        </Modal>
    )
}