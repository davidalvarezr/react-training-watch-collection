import React, { useEffect, useState } from "react"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { LoadingOutlined } from "@ant-design/icons"
import {
    useUploadWatches,
    UploadWatchesState,
} from "~/src/components/pages/Settings/useUploadWatches"
import {
    DownloadWatchesState,
    useDownloadWatches,
} from "~/src/components/pages/Settings/useDownloadWatches"

export const SettingsPage: React.FC = () => {
    // Unique ID state and effect ---------------
    const [uniqueId] = useUniqueId()
    const [downloadInput, setDownloadInput] = useState(uniqueId)
    useEffect(() => {
        setDownloadInput(uniqueId)
    }, [uniqueId])

    // Upload state, behaviour and effect --------
    const [{ isUploading, uploadError }, setUploadState] = useState<UploadWatchesState>({
        isUploading: false,
    })
    const [uploadState, uploadWatches] = useUploadWatches()
    useEffect(() => {
        setUploadState(uploadState)
    }, [uploadState])

    // Download state, behaviour and effect -----
    const [{ isDownloading, downloadError }, setDownloadState] = useState<DownloadWatchesState>({
        isDownloading: false,
    })
    const [downloadState, downloadWatches] = useDownloadWatches()
    useEffect(() => {
        setDownloadState(downloadState)
    }, [downloadState])

    return (
        <div>
            <p>Your code: {uniqueId}</p>

            {/*UPLOAD -------------------------------------------------------*/}

            <LoadWrapper
                isLoading={isUploading}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Uploading watches..."
                errorMessage={uploadError}
            >
                <button onClick={uploadWatches}>upload</button>
            </LoadWrapper>

            {/*DOWNLOAD -----------------------------------------------------*/}

            <LoadWrapper
                isLoading={isDownloading || downloadInput === null}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Downloading watches..."
                errorMessage={downloadError}
            >
                <DownloadWatch
                    id={downloadInput}
                    onDownload={downloadWatches}
                    onChange={setDownloadInput}
                />
            </LoadWrapper>
        </div>
    )
}
