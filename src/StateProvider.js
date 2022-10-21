import React, { createContext, useContext, useReducer } from "react";
//this line of code basically prepares the data layer 
export const StateContext = createContext();
//wraps our app and provides data layer to every component of the app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//helps us pull info from the data layer 
export const useStateValue = () => useContext(StateContext);
export default StateProvider;
// react context api
//we always use this only by default remember this 