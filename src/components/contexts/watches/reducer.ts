import React from "react"
import { WatchAction, WatchesAction } from "~/src/components/contexts/watches/actions"
import { Watch } from "~/src/types/Watch"
import { dropboxErrorMapper } from "~/src/services/error-mappers/dropboxErrorMapper"
import { consoleService, watchService } from "~/src/services/container"
import { State } from "~/src/components/contexts/watches/state"
import { v4 as uuidv4 } from "uuid"

type DispatchReturn = (action: WatchAction) => void
type DispatchMiddleware = (dispatch: React.Dispatch<WatchAction>) => DispatchReturn

export type Reducer = (state: State, action: WatchAction) => State

// Handles asynchronous actions
export const dispatchMiddleware: DispatchMiddleware = (dispatch) => {
    return (action) => {
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
                return dispatch(action)

            case WatchesAction.UPLOAD:
                watchService
                    .sendListOnline()
                    .then(() => dispatch({ type: WatchesAction.UPLOAD_SUCCESS }))
                    .catch((e) => dispatch({ type: WatchesAction.UPLOAD_FAILURE, payload: e }))
                return dispatch(action)

            case WatchesAction.DOWNLOAD:
                watchService
                    .persistWatchesFromCloud(action.payload)
                    .then((watches) =>
                        dispatch({ type: WatchesAction.DOWNLOAD_SUCCESS, payload: watches })
                    )
                    .catch((e) => dispatch({ type: WatchesAction.DOWNLOAD_FAILURE, payload: e }))
                return dispatch(action)

            default:
                return dispatch(action)
        }
    }
}

export const reducer: Reducer = (state, action) => {
    consoleService.logAction(action, state)

    switch (action.type) {
        case WatchesAction.LOAD_FROM_LOCAL_STORAGE:
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
                initialized: true,
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
            const watches: Watch[] = state.watches.filter((watch) => watch.uuid !== action.payload)
            watchService.setWatchList(watches)
            return { ...state, watches }
        }

        case WatchesAction.UPDATE_WATCH: {
            const { uuid, watch } = action.payload
            const watches: Watch[] = state.watches.map((aWatch) =>
                aWatch.uuid === uuid ? { ...watch, uuid } : aWatch
            )
            watchService.setWatchList(watches)
            return { ...state, watches }
        }

        case WatchesAction.UPLOAD:
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
}
