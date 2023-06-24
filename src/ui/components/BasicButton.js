import '../App.css'

export default function BasicButton({visible=true, enabled=true, text, onClick, tooltip, fullLine=false}) {
  if (!visible) return undefined

  return (
    <button className={"smallMargin black pointer" + (fullLine ? " block" : " inlineblock") } disabled={!enabled} title={tooltip} onClick={onClick}>{text}</button>
  )
}