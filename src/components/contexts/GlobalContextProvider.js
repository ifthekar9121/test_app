import React, {createContext} from 'react'
export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
  const BaseUrl = "http://localhost:8000"

  return (
    <GlobalContext.Provider 
    value={{ BaseUrl }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
