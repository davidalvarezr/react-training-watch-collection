import { Watch } from "~/src/types/Watch"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

export type State = {
    watches: Watch[]
    localStorageRetrieveLoading: boolean
    localStorageRetrieveError?: ErrorMessage
}

export const initialState: State = {
    watches: [],
    localStorageRetrieveLoading: false,
}
