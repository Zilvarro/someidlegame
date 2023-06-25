import { useContext } from 'react'
import '../App.css'
import { AppContext } from '../App'
import BasicButton from './BasicButton'

export default function ActionButton({actionName, parameters={}, text, hide, tooltip, fullLine=false, children}) {
  const context = useContext(AppContext)
  const {visible, enabled} = context.game.validate(actionName, parameters)
  const perform = ()=>context.perform(actionName, parameters)

  return (
    <BasicButton text={text ? text : children} visible={visible} hide={hide} enabled={enabled} title={tooltip} onClick={perform} fullLine={fullLine}/>
  )
}