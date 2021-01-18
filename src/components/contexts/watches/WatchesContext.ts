import React from "react"
import { Provider } from "./types"

const initialState: Provider = { watches: [] }

export const WatchesContext = React.createContext<Provider>(initialState)
