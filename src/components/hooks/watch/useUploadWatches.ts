import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { useState } from "react"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"

export type UploadWatchesState = { isUploading: boolean; uploadError?: ErrorMessage }

type UploadWatches = () => Promise<void>

type UseUploadWatches = () => [UploadWatchesState, UploadWatches]

const initialState: UploadWatchesState = {
    isUploading: false,
}

export const useUploadWatches: UseUploadWatches = () => {
    const watchService = useWatchService()
    const [msgFromError] = useErrorMapper()
    const [state, setState] = useState<UploadWatchesState>(initialState)

    const uploadWatches: UploadWatches = async () => {
        setState({
            ...state,
            isUploading: true,
        })
        try {
            await watchService.sendListOnline()
        } catch (e) {
            setState({
                ...state,
                isUploading: false,
                uploadError: msgFromError(e),
            })
        }
        setState({
            ...state,
            isUploading: false,
        })
    }

    return [state, uploadWatches]
}
