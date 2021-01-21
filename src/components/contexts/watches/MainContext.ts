import React from "react"
import { Provider } from "./WatchesProvider"
import { initialState } from "./state"

const initialContextState: Provider = {
    state: initialState,
}

export const MainContext = React.createContext<Provider>(initialContextState)
