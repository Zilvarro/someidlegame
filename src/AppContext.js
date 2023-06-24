import { useReducer } from 'react';

//Wrap Reducer so you can mutate the Object and it will always rerender except when null is returned
export function useObjectReducer(reducer, initializer) {

  const wrappedReducer = (wrappedState, action)=>{
    const state = wrappedState[0]
    const reducerResult = reducer(state, action)
    return reducerResult === null ? wrappedState : [state]
  }
  
  const wrappedInitializer = ()=>{return [initializer()]}

  const [ wrappedState, updateWrappedState ] = useReducer(wrappedReducer,[{}], wrappedInitializer)
  return [wrappedState[0], updateWrappedState]
}
