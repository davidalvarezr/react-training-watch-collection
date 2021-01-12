import React from "react"
import {useWatchService} from "~/src/components/hooks/useWatchService";
import {useUniqueId} from "~/src/components/hooks/useUniqueId";
import {useLoading} from "~/src/components/hooks/useLoading";

export const SettingsPage = () => {
    const watchService = useWatchService()
    const [uniqueId, isNew] = useUniqueId()
    const [isUploading, errorUpload, beginUpload, endUpload, errorWhileUploading] = useLoading(false)
    const [isDownloading, errorDownload, beginDownload, endDownload, errorWhileDownloading] = useLoading(false)

    const filename = `${uniqueId}.json`

    console.log('in SettingsPage filename:', filename, isNew)

    const uploadWatches = async () => {
        beginUpload()
        try {
            await watchService.uploadList(watchService.getWatchList(), filename)
        } catch (e) {
            errorWhileUploading(e)
        }
        endUpload()
    }

    const downloadWatches = async () => {
        if (!confirm("Downloading your list from the cloud will erase the one you actually have in the app"))
        beginDownload()
        try {
            const watchList = await watchService.downloadList(filename)
            watchService.setWatchList(watchList)
        } catch (e) {
            errorWhileDownloading(e)
        }
        endDownload()
    }

    return (
        <div>
            {!isUploading ?
                <button onClick={uploadWatches}>
                    upload
                </button> :
                <p>Your file is uploading...</p>
            }

            {errorUpload && <pre>
                {errorUpload}
            </pre>}


            {!isDownloading ?
                <button onClick={downloadWatches}>
                    download
                </button> :
                <p>Your file is downloading...</p>
            }

            {errorDownload && <pre>
                {errorDownload}
            </pre>}

        </div>
    )
}