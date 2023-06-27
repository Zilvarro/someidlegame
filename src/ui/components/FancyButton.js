import { useContext } from 'react'
import './FancyButton.css'
import { AppContext } from '../App'

export default function FancyButton({actionName, parameters={}, color, inactiveColor, tooltip, holdable, children}) {
  const context = useContext(AppContext)
  const {visible, enabled} = context.game.validate(actionName, parameters)
  const perform = ()=>{
    if (!enabled) return
    context.perform(actionName, parameters)
  }
  const mouseHandler = (e)=>{
    if (!holdable || !enabled) return
    console.log(e)
    //context.perform("setHold", {actionName, parameters})
  }

  if (!visible) return undefined

  return (
    <div title={tooltip} className="fbutton" style={{backgroundColor: enabled ? color : inactiveColor}}
    onClick={perform} onMouseDown={mouseHandler} onMouseUp={mouseHandler} onMouseLeave={mouseHandler} onTouchStart={mouseHandler} onTouchEnd={mouseHandler}>
      {children}
    </div>
    )
}