import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { DropboxErrorFinalMessage } from "~/src/services/error-mappers/dropboxErrorMapper"

export type State = {
    watches: Watch[]
    initializing: boolean
    localStorageRetrieveError?: ErrorMessage
    initialized: boolean
    uploading: boolean
    uploadError?: DropboxErrorFinalMessage
    downloading: boolean
    downloadError?: DropboxErrorFinalMessage
}

export const initialState: State = {
    watches: [],
    initializing: false, // FIXME: rename to "initializing"
    initialized: false,
    uploading: false,
    downloading: false,
}
