import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { DropboxResponseError } from "dropbox"
import { DropboxError } from "~/src/services/error-mappers/dropboxErrorMapper"

export enum WatchesAction {
    ADD_WATCH = "ADD_WATCH",
    REMOVE_WATCH = "REMOVE_WATCH",
    UPDATE_WATCH = "UPDATE_WATCH",
    CLEAR_LIST = "CLEAR_LIST",
    LOAD_FROM_LOCAL_STORAGE = "LOAD_FROM_LOCAL_STORAGE",
    LOAD_FROM_LOCAL_STORAGE_SUCCESS = "LOAD_FROM_LOCAL_STORAGE_SUCCESS",
    LOAD_FROM_LOCAL_STORAGE_FAILURE = "LOAD_FROM_LOCAL_STORAGE_FAILURE",
    UPLOAD = "UPLOAD",
    UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
    UPLOAD_FAILURE = "UPLOAD_FAILURE",
    DOWNLOAD = "DOWNLOAD",
    DOWNLOAD_SUCCESS = "DOWNLOAD_SUCCESS",
    DOWNLOAD_FAILURE = "DOWNLOAD_FAILURE",
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
    payload: {
        uuid: string
        watch: Watch
    }
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

interface Upload extends Action {
    type: WatchesAction.UPLOAD
}

interface UploadSuccess extends Action {
    type: WatchesAction.UPLOAD_SUCCESS
}

interface UploadFailure extends Action {
    type: WatchesAction.UPLOAD_FAILURE
    payload: DropboxResponseError<DropboxError>
}

interface Download extends Action {
    type: WatchesAction.DOWNLOAD
    payload: string // The unique id of the user
}

interface DownloadSuccess extends Action {
    type: WatchesAction.DOWNLOAD_SUCCESS
    payload: Watch[]
}

interface DownloadFailure extends Action {
    type: WatchesAction.DOWNLOAD_FAILURE
    payload: DropboxResponseError<DropboxError>
}

export type WatchAction =
    | AddWatch
    | RemoveWatch
    | UpdateWatch
    | ClearList
    | LoadFromLocalStorage
    | LoadFromLocalStorageSuccess
    | LoadFromLocalStorageFailure
    | Upload
    | UploadSuccess
    | UploadFailure
    | Download
    | DownloadSuccess
    | DownloadFailure
