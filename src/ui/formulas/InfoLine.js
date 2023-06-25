import { useContext } from 'react'
import '../App.css'
import { AppContext } from '../App'

export default function InfoLine({actionName, parameters={}, visible, condition, children}) {
  const context = useContext(AppContext)
  
  if (arguments[0].hasOwnProperty("visible") && !visible)
    return undefined

  let shallRender = true
  if (actionName) {
    const {visible, enabled, valid} = context.game.validate(actionName, parameters)
    
    switch (condition) {
      case "visible":
        shallRender = visible
        break;
      case "invisible":
        shallRender = !visible
        break;
      case "enabled":
        shallRender = visible && enabled
        break;
      case "disabled":
        shallRender = visible && !enabled
        break;
      case "valid":
        shallRender = valid
        break;
      case "invalid":
        shallRender = !valid
        break;
      default:
        shallRender = true
        break;
    }
  }

  if (!shallRender) return undefined

  return (<p>{children}</p>)
}