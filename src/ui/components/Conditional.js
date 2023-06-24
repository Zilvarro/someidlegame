import '../App.css'

export default function Conditional({visible=true, hidden=false, children}) {
  if (!visible) return undefined

  return (
    <div className={hidden ? "hidden" : ""}>
      {children}
    </div>
  )
}