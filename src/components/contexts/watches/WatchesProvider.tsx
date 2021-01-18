import React, { ReactNode, useReducer } from "react"
import { reducer, Reducer } from "./reducer"
import { WatchesContext } from "./WatchesContext"

type PropTypes = { children: ReactNode }

export const WatchesProvider: React.FC<PropTypes> = ({ children }: PropTypes) => {
    const [watches, dispatch] = useReducer<Reducer>(reducer, [])

    return (
        <WatchesContext.Provider value={{ watches, dispatch }}>{children}</WatchesContext.Provider>
    )
}
