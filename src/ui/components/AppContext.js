import { useEffect, useReducer, useState } from 'react';

//Wrap Reducer so you can mutate the Object and it will always rerender except when null is returned
//reducer: Handler for state-changes, accepts previous state and one custom parameter
//initializer: Handler with no arguments that determines the initial state
//tickInterval: If set, a periodic event is fired every tickInterval milliseconds (cannot be changed later)
//tickAction: Parameter used for the periodic event (cannot be changed later)
//returns [state, dispatch] the current state and a function that accepts the custom parameter and can be used to trigger updates
export function useObjectReducer(reducer, initializer, tickInterval, tickAction) {

  const wrappedReducer = (wrappedState, action)=>{
    const state = wrappedState[0]
    const reducerResult = reducer(state, action)
    return reducerResult === null ? wrappedState : [state]
  }
  
  const wrappedInitializer = ()=>{return [initializer()]}

  const [ wrappedState, updateWrappedState ] = useReducer(wrappedReducer,[{}], wrappedInitializer)

  const [realTickInterval, ] = useState(tickInterval)
  const [realTickAction, ] = useState(tickAction)

  useEffect(() => {
    if (!realTickInterval) return
    const timer = setInterval(() => {
      updateWrappedState(realTickAction);
    }, realTickInterval);
    return () => clearInterval(timer);
  }, [realTickInterval, realTickAction]);

  return [wrappedState[0], updateWrappedState]
}
