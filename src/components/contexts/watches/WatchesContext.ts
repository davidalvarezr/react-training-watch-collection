import React from "react"
import { Provider } from "./WatchesProvider"
import { initialState } from "./state"

const initialContextState: Provider = {
    watches: initialState,
}

export const WatchesContext = React.createContext<Provider>(initialContextState)
