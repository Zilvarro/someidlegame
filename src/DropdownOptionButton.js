export default function DropdownOptionButton({state, updateState, settingName, disabled, description, statusList, visible=true, tooltip, tooltipList}) {
    if (!visible) return undefined

    const currentStatus = state.settings[settingName]
    const currentIndex = statusList.indexOf(currentStatus)

    const onSelectionChange = (evt)=>{
        const selectedOption = evt.currentTarget.value
        updateState({name:"changeSetting", settingName: settingName, nextStatus: selectedOption})
    }

    let fullToolTip = ""
    if (tooltipList)
        fullToolTip = tooltip + ((currentStatus && tooltipList[currentIndex]) ? "\n" + currentStatus + ": " + tooltipList[currentIndex] : "")
    else if (tooltip)
        fullToolTip = tooltip

    return (
        <select value={state.settings.alphaThreshold} style={{color:"black"}} title={fullToolTip} disabled={disabled} onChange={onSelectionChange}>
            {statusList.map((status)=>
                <option key={status} value={status}>{status}</option>
            )}
        </select>
    )
}