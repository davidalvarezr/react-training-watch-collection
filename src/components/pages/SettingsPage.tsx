import React, { useEffect, useState } from "react"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useLoading } from "~/src/components/hooks/useLoading"
import { ErrorDisplayer } from "~/src/components/blocks/ErrorDisplayer"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { LoadingOutlined } from "@ant-design/icons"

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

            <LoadWrapper
                isLoading={isUploading}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Uploading watches..."
                errorMessage={errorUpload}
            >
                <button onClick={uploadWatches}>upload</button>
            </LoadWrapper>

            <br />

            {/*DOWNLOAD ---------------------------------------------------------------------------------------------*/}

            <LoadWrapper
                isLoading={isDownloading || uniqueId === null}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Downloading watches..."
                errorMessage={errorDownload}
            >
                <DownloadWatch id={uniqueId} onDownload={downloadWatches} />
            </LoadWrapper>
        </div>
    )
}
