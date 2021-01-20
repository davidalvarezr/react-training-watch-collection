import React, { Dispatch, ReactNode, useReducer } from "react"
import { WatchesContext } from "./WatchesContext"
import { WatchAction, WatchesAction } from "./actions"
import { initialState, State } from "./state"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Watch } from "~/src/types/Watch"
import { v4 as uuidv4 } from "uuid"
import { dropboxErrorMapper } from "~/src/services/error-mappers/dropboxErrorMapper"

export type Provider = {
    watches: State
    dispatch?: Dispatch<WatchAction>
}

type PropTypes = { children: ReactNode }
export type Reducer = (state: State, action: WatchAction) => State

export const WatchesProvider: React.FC<PropTypes> = ({ children }: PropTypes) => {
    const watchService = useWatchService()

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
                return {
                    ...state,
                    localStorageRetrieveLoading: true,
                    localStorageRetrieveError: undefined,
                }
            case WatchesAction.LOAD_FROM_LOCAL_STORAGE_SUCCESS:
                return { ...state, watches: action.payload, localStorageRetrieveLoading: false }
            case WatchesAction.LOAD_FROM_LOCAL_STORAGE_FAILURE:
                return {
                    ...state,
                    localStorageRetrieveLoading: false,
                    localStorageRetrieveError: action.payload,
                }

            case WatchesAction.CLEAR_LIST: {
                const watches: Watch[] = []
                watchService.setWatchList(watches)
                return { ...state, watches }
            }

            case WatchesAction.ADD_WATCH: {
                const watches: Watch[] = [{ ...action.payload, uuid: uuidv4() }, ...state.watches]
                watchService.setWatchList(watches)
                return { ...state, watches }
            }

            case WatchesAction.REMOVE_WATCH: {
                const watches: Watch[] = state.watches.filter(
                    (watch) => watch.uuid !== action.payload
                )
                watchService.setWatchList(watches)
                return { ...state, watches }
            }

            case WatchesAction.UPDATE_WATCH: {
                const { uuid, watch } = action.payload
                const watches: Watch[] = state.watches.map((aWatch) =>
                    aWatch.uuid === uuid ? watch : aWatch
                )
                watchService.setWatchList(watches)
                return { ...state, watches }
            }

            case WatchesAction.UPLOAD:
                watchService
                    .sendListOnline()
                    .then(() => dispatch({ type: WatchesAction.UPLOAD_SUCCESS }))
                    .catch((e) => dispatch({ type: WatchesAction.UPLOAD_FAILURE, payload: e }))
                return { ...state, uploading: true, uploadError: undefined }
            case WatchesAction.UPLOAD_SUCCESS:
                return { ...state, uploading: false }
            case WatchesAction.UPLOAD_FAILURE:
                return {
                    ...state,
                    uploading: false,
                    uploadError: dropboxErrorMapper(action.payload),
                }

            case WatchesAction.DOWNLOAD:
                watchService
                    .persistWatchesFromCloud(action.payload)
                    .then((watches) =>
                        dispatch({ type: WatchesAction.DOWNLOAD_SUCCESS, payload: watches })
                    )
                    .catch((e) => dispatch({ type: WatchesAction.DOWNLOAD_FAILURE, payload: e }))
                return { ...state, downloading: true, downloadError: undefined }
            case WatchesAction.DOWNLOAD_SUCCESS:
                return { ...state, downloading: false, watches: action.payload }
            case WatchesAction.DOWNLOAD_FAILURE:
                return {
                    ...state,
                    downloading: false,
                    downloadError: dropboxErrorMapper(action.payload),
                }

            default:
                return state
        }
    }, initialState)

    return (
        <WatchesContext.Provider value={{ watches, dispatch }}>{children}</WatchesContext.Provider>
    )
}
