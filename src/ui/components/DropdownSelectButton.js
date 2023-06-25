export default function DropdownSelectButton({settingName, settings, statusList, updateStatus, visible=true, enabled=true, fullLine=false, tooltip, tooltipList, description}) {
  if (!visible) return undefined

  const currentStatus = settings[settingName]
  const currentIndex = statusList.indexOf(currentStatus)

  const onSelectionChange = (evt)=>{
      const selectedOption = evt.currentTarget.value
      updateStatus(settingName, selectedOption)
  }

  let fullToolTip = ""
  if (tooltipList)
      fullToolTip = tooltip + ((currentStatus && tooltipList[currentIndex]) ? "\n" + currentStatus + ": " + tooltipList[currentIndex] : "")
  else if (tooltip)
      fullToolTip = tooltip

  return (
      <>
          {description && <>{description}:&nbsp;&nbsp;</>}
          <select value={settings[settingName]} style={{color:"black"}} title={fullToolTip} disabled={!enabled} onChange={onSelectionChange}>
              {statusList.filter((status)=>status).map((status)=>
                  <option key={status} value={status}>{status}</option>
              )}
          </select>
      </>
  )
}