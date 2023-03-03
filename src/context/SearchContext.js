//import { createContext, useState, useContext } from 'react';
import * as React from "react"

const defaultState = {
    infos: {},
    action: false
  }

const SearchContext = React.createContext(defaultState);

export const SearchContextProvider = ( {children} ) => {
  const [infos, setInfos] = React.useState(defaultState)
  const [action, setAction] = React.useState(defaultState)

  
  const contextValues = {
      infos: [infos, setInfos], 
      action: [action, setAction],
  }
  {/* ステート変数がinfos一つしかなければ以下の書き方.
  const contextValues = {
    infos,
    setInfos,
  }
  */}

  return <SearchContext.Provider value={contextValues}>{children}</SearchContext.Provider>
}

export const useSearchContext = () => {
  const context = React.useContext(SearchContext)
  if (context === undefined || context === null) {
    throw new Error(`useSimpleContext must be called within SimpleContextProvider`)
  }
  return context
}
