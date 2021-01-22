import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { DropboxResponseError } from "dropbox"
import { DropboxError } from "~/src/services/error-mappers/dropboxErrorMapper"

export enum WatchesAction {
    ADD_WATCH = "ADD_WATCH",
    REMOVE_WATCH = "REMOVE_WATCH",
    UPDATE_WATCH = "UPDATE_WATCH",
    CLEAR_LIST = "CLEAR_LIST",
    CREATE_TIME_RUN = "CREATE_TIME_RUN",
    INITIALIZE = "INITIALIZE",
    INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS",
    INITIALIZE_FAILURE = "INITIALIZE_FAILURE",
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

interface CreateTimeRun extends Action {
    type: WatchesAction.CREATE_TIME_RUN
    payload: { uuid: string; title: string }
}

interface initialize extends Action {
    type: WatchesAction.INITIALIZE
}

interface initializeSuccess extends Action {
    type: WatchesAction.INITIALIZE_SUCCESS
    payload: {
        watches: Watch[]
        uuid: string
    }
}

interface initializeFailure extends Action {
    type: WatchesAction.INITIALIZE_FAILURE
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
    | CreateTimeRun
    | initialize
    | initializeSuccess
    | initializeFailure
    | Upload
    | UploadSuccess
    | UploadFailure
    | Download
    | DownloadSuccess
    | DownloadFailure
