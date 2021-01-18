import React, { Dispatch, ReactNode, useReducer } from "react"
import { WatchesContext } from "./WatchesContext"
import { WatchAction, WatchesAction } from "./actions"
import { initialState, State } from "./state"
import { watchService } from "~/src/services/container"

export type Provider = {
    watches: State
    dispatch?: Dispatch<WatchAction>
}

type PropTypes = { children: ReactNode }
export type Reducer = (state: State, action: WatchAction) => State

export const WatchesProvider: React.FC<PropTypes> = ({ children }: PropTypes) => {
    const [watches, dispatch] = useReducer<Reducer>((state, action) => {
        switch (action.type) {
            case WatchesAction.LOAD_FROM_LOCAL_STORAGE:
                watchService
                    .getWatchList()
                    .then((watches) => {
                        dispatch({
                            type: WatchesAction.LOAD_FROM_LOCAL_STORAGE_SUCCESS,
                            payload: watches,
                        })
                    })
                    .catch((e) => {
                        dispatch({
                            type: WatchesAction.LOAD_FROM_LOCAL_STORAGE_FAILURE,
                            payload: e,
                        })
                    })
                return { ...state, localStorageRetrieveLoading: true }
            case WatchesAction.LOAD_FROM_LOCAL_STORAGE_SUCCESS:
                return { ...state, watches: action.payload, localStorageRetrieveLoading: false }
            case WatchesAction.LOAD_FROM_LOCAL_STORAGE_FAILURE:
                return {
                    ...state,
                    localStorageRetrieveLoading: false,
                    localStorageRetrieveError: action.payload,
                }
            default:
                return state
        }
    }, initialState)

    return (
        <WatchesContext.Provider value={{ watches, dispatch }}>{children}</WatchesContext.Provider>
    )
}
