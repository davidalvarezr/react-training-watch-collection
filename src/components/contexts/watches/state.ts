import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

export type State = {
    watches: Watch[]
    localStorageRetrieveLoading: boolean
    localStorageRetrieveError?: ErrorMessage
    uploading: boolean
    uploadError?: ErrorMessage
    downloading: boolean
    downloadError?: ErrorMessage
}

export const initialState: State = {
    watches: [],
    localStorageRetrieveLoading: false,
    uploading: false,
    downloading: false,
}
