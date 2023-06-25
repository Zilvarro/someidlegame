import '../App.css'

export default function Conditional({visible=false, hidden=false, children}) {
  if (!visible) return undefined

  return (
    <div className={hidden ? "hidden" : ""}>
      {children}
    </div>
  )
}