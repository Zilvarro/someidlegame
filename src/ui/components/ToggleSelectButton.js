import '../App.css'
import BasicButton from './BasicButton'

export default function ToggleSelectButton({settingName, settings, statusList, updateStatus, visible=true, enabled=true, fullLine=false, tooltip, tooltipList, description}) {
  const currentStatus = settings[settingName]
  const currentIndex = statusList.indexOf(currentStatus) || 0
  const nextIndex = (currentIndex + 1) % statusList.length
  const nextStatus = statusList[nextIndex]
  const changeSetting = ()=>{
    updateStatus(settingName, nextStatus)
  }

  let fullToolTip = ""
  if (tooltipList)
    fullToolTip = tooltip + ((currentStatus && tooltipList[currentIndex]) ? "\n" + currentStatus + ": " + tooltipList[currentIndex] : "")
  else if (tooltip)
    fullToolTip = tooltip

  return (
    <BasicButton visible={visible} enabled={enabled} text={<>{description}: {currentStatus}</>} tooltip={fullToolTip} onClick={changeSetting} fullLine={fullLine}/>
  )
}