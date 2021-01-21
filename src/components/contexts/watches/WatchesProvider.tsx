import React, { Dispatch, ReactNode, useReducer } from "react"
import { WatchesContext } from "./WatchesContext"
import { WatchAction } from "./actions"
import { initialState, State } from "./state"
import { dispatchMiddleware, reducer } from "~/src/components/contexts/watches/reducer"
import { Reducer } from "./reducer"

export type Provider = {
    state: State
    dispatch?: Dispatch<WatchAction>
}

type PropTypes = { children: ReactNode }

export const WatchesProvider: React.FC<PropTypes> = ({ children }: PropTypes) => {
    const [watches, dispatch] = useReducer<Reducer>(reducer, initialState)

    return (
        <WatchesContext.Provider value={{ state: watches, dispatch: dispatchMiddleware(dispatch) }}>
            {children}
        </WatchesContext.Provider>
    )
}
