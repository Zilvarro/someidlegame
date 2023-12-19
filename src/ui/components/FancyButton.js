import { useContext } from 'react'
import './FancyButton.css'
import { AppContext } from '../App'

const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => 
    obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
)

export default function FancyButton({actionName, parameters={}, color, inactiveColor="#666666", tooltip, holdable, children}) {
  const context = useContext(AppContext)
  const {visible, enabled} = actionName ? context.game.validate(actionName, parameters) : {visible: true, enabled: false}
  const perform = ()=>{
    if (!enabled) return
    context.perform(actionName, parameters)
  }

  const mouseHandler = (e)=>{
    //console.log(e.type)
    if (!holdable || !enabled) return
    switch(e.type){
      case "mousedown":
        context.perform("hold", {holdActionName: actionName, holdParameters: parameters})
        break
      case "touchstart":
        context.perform("hold", {holdActionName: actionName, holdParameters: parameters})
        break
      case "mouseup":
      case "mouseleave":
      case "touchend":
      case "blur":
        const holdie = context.game.session.holdAction || context.game.session.prepareHold
        if (holdie && holdie.actionName === actionName && shallowCompare(holdie.parameters, parameters)) {
          context.perform("release")
        }
        break
      default:
          console.error("Unexpected mouse event " + e.type)
    }
  }

  if (!visible) return undefined

  return (
    <div title={tooltip} className="fbutton" style={{backgroundColor: enabled ? color : inactiveColor}} tabIndex="1"
    onClick={perform} onMouseDown={mouseHandler} onMouseUp={mouseHandler} onMouseLeave={mouseHandler} onTouchStart={mouseHandler} onTouchEnd={mouseHandler} onBlur={mouseHandler}>
      {children}
    </div>
    )
}