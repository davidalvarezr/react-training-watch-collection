import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

export enum WatchesAction {
    ADD_WATCH = "ADD_WATCH",
    REMOVE_WATCH = "REMOVE_WATCH",
    UPDATE_WATCH = "UPDATE_WATCH",
    CLEAR_LIST = "CLEAR_LIST",
    LOAD_FROM_LOCAL_STORAGE = "LOAD_FROM_LOCAL_STORAGE",
    LOAD_FROM_LOCAL_STORAGE_SUCCESS = "LOAD_FROM_LOCAL_STORAGE_SUCCESS",
    LOAD_FROM_LOCAL_STORAGE_FAILURE = "LOAD_FROM_LOCAL_STORAGE_FAILURE",
}

interface Action {
    type: WatchesAction
}

interface AddWatch extends Action {
    type: WatchesAction.ADD_WATCH
    payload: Watch
}

interface RemoveWatch extends Action {
    type: WatchesAction.REMOVE_WATCH
    payload: string // uuid
}

interface UpdateWatch extends Action {
    type: WatchesAction.UPDATE_WATCH
    payload: Watch[]
}

interface ClearList extends Action {
    type: WatchesAction.CLEAR_LIST
}

interface LoadFromLocalStorage extends Action {
    type: WatchesAction.LOAD_FROM_LOCAL_STORAGE
}

interface LoadFromLocalStorageSuccess extends Action {
    type: WatchesAction.LOAD_FROM_LOCAL_STORAGE_SUCCESS
    payload: Watch[]
}

interface LoadFromLocalStorageFailure extends Action {
    type: WatchesAction.LOAD_FROM_LOCAL_STORAGE_FAILURE
    payload: ErrorMessage
}

export type WatchAction =
    | AddWatch
    | RemoveWatch
    | UpdateWatch
    | ClearList
    | LoadFromLocalStorage
    | LoadFromLocalStorageSuccess
    | LoadFromLocalStorageFailure
