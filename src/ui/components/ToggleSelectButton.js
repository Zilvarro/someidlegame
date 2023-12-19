import '../App.css'
import BasicButton from './BasicButton'

export default function ToggleSelectButton({settingName, settings, statusList, updateStatus, validateStatus, visible=true, enabled=true, fullLine=false, tooltip, tooltipList, description}) {
  const currentStatus = settings[settingName]
  const currentIndex = statusList.indexOf(currentStatus) || 0
  const nextIndex = (currentIndex + 1) % statusList.length
  const nextStatus = statusList[nextIndex]
  const changeSetting = ()=>{
    updateStatus(settingName, nextStatus)
  }
  const validation = validateStatus ? validateStatus(settingName, nextStatus) : {visible: visible, enabled: enabled}

  let fullToolTip = ""
  if (tooltipList)
    fullToolTip = tooltip + ((currentStatus && tooltipList[currentIndex]) ? "\n" + currentStatus + ": " + tooltipList[currentIndex] : "")
  else if (tooltip)
    fullToolTip = tooltip

  return (
    <BasicButton visible={validation.visible} enabled={validation.enabled} text={<>{description}: {currentStatus}</>} tooltip={fullToolTip} onClick={changeSetting} fullLine={fullLine}/>
  )
}