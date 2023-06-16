import './WarningHider'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { notify } from './utilities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
serviceWorkerRegistration.register({
    onSuccess: ()=>{notify.success("Ready for Offline Use")},
    onUpdate: (registration)=>{
        notify.warning("Update available", "Refresh page to apply update",true)
        registration.waiting.postMessage({type: 'SKIP_WAITING'})
    }
});


window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you'll need to trigger it later.
  window.installPromptPWAevent = e;
});