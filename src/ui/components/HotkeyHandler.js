import Hotkeys from 'react-hot-keys';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function HotkeyHandler({keyName, settingName, holdable, actionName, parameters={}}) {
    const context = useContext(AppContext)

    const hotkeyDown = (keyName, e, handle) => {
        if (e.repeat) {
            if (!context.game.session.holdAction && !context.game.session.prepareHold)
              context.perform("hold", {holdActionName: actionName, holdParameters: parameters})
        } else {
          context.perform(actionName, parameters)
        }
    }

    const hotkeyUp = (keyName, e, handle) => {
        context.perform("release")
    }

    return <>
        <Hotkeys keyName={keyName} disabled={context.settings[settingName] === "OFF"} onKeyDown={hotkeyDown} onKeyUp={hotkeyUp} allowRepeat={holdable}/>
    </>
}