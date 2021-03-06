import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { DropboxErrorFinalMessage } from "~/src/services/error-mappers/dropboxErrorMapper"

export type State = {
    watches: Watch[]
    uuid?: string
    initializing: boolean
    initializeError?: ErrorMessage
    uploading: boolean
    uploadError?: DropboxErrorFinalMessage
    downloading: boolean
    downloadError?: DropboxErrorFinalMessage
}

export const initialState: State = {
    watches: [],
    initializing: true,
    uploading: false,
    downloading: false,
}
