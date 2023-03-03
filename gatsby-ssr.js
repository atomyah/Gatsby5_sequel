// コンテキストフックSearchContext設定用コード
import React from "react"
import { SearchContext, SearchContextProvider, useSearchContext } from "./src/context/SearchContext"

export const wrapRootElement = ({ element }) => (
  <SearchContextProvider>{element}</SearchContextProvider>
)