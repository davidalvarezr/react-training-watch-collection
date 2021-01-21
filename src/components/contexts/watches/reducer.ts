import React from "react"
import { WatchAction, WatchesAction } from "~/src/components/contexts/watches/actions"
import { Watch } from "~/src/types/Watch"
import { dropboxErrorMapper } from "~/src/services/error-mappers/dropboxErrorMapper"
import { consoleService, userService, watchService } from "~/src/services/container"
import { State } from "~/src/components/contexts/watches/state"
import { v4 as uuidv4 } from "uuid"

type DispatchReturn = (action: WatchAction) => void
type DispatchMiddleware = (dispatch: React.Dispatch<WatchAction>) => DispatchReturn

export type Reducer = (state: State, action: WatchAction) => State

// Handles asynchronous actions
export const dispatchMiddleware: DispatchMiddleware = (dispatch) => {
    return (action) => {
        switch (action.type) {
            case WatchesAction.INITIALIZE:
                Promise.all([watchService.getWatchList(), userService.getUuid()])
                    .then(([watches, uuid]: [Watch[], string]) => {
                        dispatch({
                            type: WatchesAction.INITIALIZE_SUCCESS,
                            payload: { watches: watches, uuid: uuid },
                        })
                    })
                    .catch((e) => {
                        dispatch({
                            type: WatchesAction.INITIALIZE_FAILURE,
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
        case WatchesAction.INITIALIZE:
            return {
                ...state,
                initializing: true,
                initializeError: undefined,
            }
        case WatchesAction.INITIALIZE_SUCCESS: {
            const { watches, uuid } = action.payload
            return { ...state, watches, uuid, initializing: false }
        }
        case WatchesAction.INITIALIZE_FAILURE:
            return {
                ...state,
                initialized: true,
                initializing: false,
                initializeError: action.payload,
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
