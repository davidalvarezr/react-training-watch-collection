import React, { useContext, useEffect, useState } from "react"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { LoadingOutlined } from "@ant-design/icons"
import { WatchesContext } from "~/src/components/contexts/watches/WatchesContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"

export const SettingsPage: React.FC = () => {
    const {
        watches: { uploading, uploadError, downloading, downloadError },
        dispatch,
    } = useContext(WatchesContext)

    // Unique ID state and effect ---------------
    const [uniqueId] = useUniqueId()
    const [downloadInput, setDownloadInput] = useState(uniqueId)
    useEffect(() => {
        setDownloadInput(uniqueId)
    }, [uniqueId])

    const upload = () => {
        dispatch({ type: WatchesAction.UPLOAD })
    }

    const download = (id: string) => {
        dispatch({ type: WatchesAction.DOWNLOAD, payload: id })
    }

    return (
        <div>
            <p>Your code: {uniqueId}</p>

            {/*UPLOAD -------------------------------------------------------*/}

            <LoadWrapper
                isLoading={uploading}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Uploading watches..."
                errorMessage={uploadError}
            >
                <button onClick={upload}>upload</button>
            </LoadWrapper>

            {/*DOWNLOAD -----------------------------------------------------*/}

            <LoadWrapper
                isLoading={downloading || downloadInput === null}
                loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                loadingMessage="Downloading watches..."
                errorMessage={downloadError}
            >
                <DownloadWatch
                    id={downloadInput}
                    onDownload={download}
                    onChange={setDownloadInput}
                />
            </LoadWrapper>
        </div>
    )
}
