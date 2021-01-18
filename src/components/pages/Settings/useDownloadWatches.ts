import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useState } from "react"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"

export type DownloadWatchesState = {
    isDownloading: boolean
    downloadError?: ErrorMessage
}

type DownloadWatches = (downloadCode: string) => Promise<void>

type UseDownloadWatches = () => [DownloadWatchesState, DownloadWatches]

const initialState: DownloadWatchesState = {
    isDownloading: false,
}

export const useDownloadWatches: UseDownloadWatches = () => {
    const watchService = useWatchService()
    const [msgFromError] = useErrorMapper()
    const [state, setState] = useState<DownloadWatchesState>(initialState)

    const downloadWatches = async (downloadCode: string) => {
        if (
            !(await watchService.isWatchListEmpty()) &&
            !confirm(
                "Downloading your list from the cloud will erase the one you actually have in the app"
            )
        ) {
            return
        }
        setState({
            ...state,
            isDownloading: true,
        })
        try {
            await watchService.persistWatchesFromCloud(downloadCode)
        } catch (e) {
            setState({
                ...state,
                isDownloading: false,
                downloadError: msgFromError(e),
            })
        }
        setState({
            ...state,
            isDownloading: false,
        })
    }

    return [state, downloadWatches]
}
