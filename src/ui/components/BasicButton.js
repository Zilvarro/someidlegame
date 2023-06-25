import '../App.css'

export default function BasicButton({visible=true, enabled=true, hide, text, onClick, tooltip, fullLine=false}) {
  if (!visible && !hide) return undefined

  return (
    <button className={"smallMargin black pointer" + (fullLine ? " blocky" : " inlineblock") + (visible ? "" : " hidden") } disabled={!enabled} title={tooltip} onClick={onClick}>{text}</button>
  )
}