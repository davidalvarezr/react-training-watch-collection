import React from "react"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useLoading } from "~/src/components/hooks/useLoading"
import { ErrorDisplayer } from "~/src/components/blocks/ErrorDisplayer"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"

export const SettingsPage: React.FC = () => {
    const watchService = useWatchService()

    // Will get the unique id stored in the local storage
    const [uniqueId, isUniqueIdLoading] = useUniqueId()

    const [isUploading, errorUpload, beginUpload, endUpload, errorWhileUploading] = useLoading(
        false
    )
    const [
        isDownloading,
        errorDownload,
        beginDownload,
        endDownload,
        errorWhileDownloading,
    ] = useLoading(false)
    const [msgFromError] = useErrorMapper()

    const uploadWatches = async () => {
        beginUpload()
        try {
            await watchService.sendListOnline()
        } catch (e) {
            errorWhileUploading(msgFromError(e))
        }
        endUpload()
    }

    const downloadWatches = async (downloadCode: string) => {
        if (
            !(await watchService.isWatchListEmpty()) &&
            !confirm(
                "Downloading your list from the cloud will erase the one you actually have in the app"
            )
        ) {
            return
        }
        beginDownload()
        try {
            await watchService.persistWatchesFromCloud(downloadCode)
        } catch (e) {
            errorWhileDownloading(msgFromError(e))
        }
        endDownload()
    }

    return (
        <div>
            <p>Your code: {uniqueId}</p>

            {/*UPLOAD -----------------------------------------------------------------------------------------------*/}

            {!isUploading ? (
                <button onClick={uploadWatches}>upload</button>
            ) : (
                <p>Your file is uploading...</p>
            )}

            {errorUpload && <ErrorDisplayer message={errorUpload} />}

            <br />

            {/*DOWNLOAD ---------------------------------------------------------------------------------------------*/}

            {!isDownloading ? (
                !isUniqueIdLoading && <DownloadWatch id={uniqueId} onDownload={downloadWatches} />
            ) : (
                <p>Your file is downloading...</p>
            )}

            {errorDownload && <ErrorDisplayer message={errorDownload} />}
        </div>
    )
}
