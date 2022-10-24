export default function MultiOptionButton({state, updateState, settingName, description, statusList, visible=true, tooltip, tooltipList}) {
    if (!visible) return undefined

    const currentStatus = state.settings[settingName]
    const currentIndex = statusList.indexOf(currentStatus)
    const nextIndex = (currentIndex + 1) % statusList.length
    const nextStatus = statusList[nextIndex]
    const changeSetting = ()=>{
        updateState({name:"changeSetting", settingName: settingName, nextStatus})
    }
    return (
        <button title={tooltip + ((currentStatus && tooltipList[currentIndex]) ? "\n" + currentStatus + ": " + tooltipList[currentIndex] : "")} onClick={changeSetting}>{description}: {currentStatus}</button>
    )
}