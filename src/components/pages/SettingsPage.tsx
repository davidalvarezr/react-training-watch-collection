import React from "react"
import {useWatchService} from "~/src/components/hooks/useWatchService";

export const SettingsPage = () => {

    const watchService = useWatchService()

    const uploadWatches = async() => {
        const res = watchService.uploadList(watchService.getWatchList())
    }

    return (
        <div>
            <button onClick={uploadWatches}>
                upload
            </button>
        </div>
    )
}