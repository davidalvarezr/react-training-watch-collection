import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useLoading } from "~/src/components/hooks/useLoading"
import { ErrorDisplayer } from "~/src/components/blocks/ErrorDisplayer"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"
import { UNIQUE_ID } from "~/src/config/labels"
import { useLocalStorageService } from "~/src/components/hooks/useLocalStorageService"
import { v4 as uuidv4 } from "uuid"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"

export const SettingsPage = () => {
    const watchService = useWatchService()
    const storage = useLocalStorageService()
    const consoleService = useConsoleService()

    // Will get the unique id stored in the local storage
    const [uniqueId, setUniqueId] = useState<string>(null)

    // The current value of the input
    const [downloadCode, setDownloadCode] = useState<string>(uniqueId)

    useEffect(() => {
        consoleService.log("in SettingPage useEffect")
        const loadUniqueId = async () => {
            consoleService.log("in loadUniqueId")
            let id = await storage.getItemAsString(UNIQUE_ID)
            if (id === null) {
                id = uuidv4()
                await storage.setItem(UNIQUE_ID, id)
            }
            setUniqueId(id)
            setDownloadCode(id)
        }

        loadUniqueId()
    }, [])

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

    const downloadWatches = async () => {
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

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDownloadCode(e.target.value)
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
                downloadCode !== null ? (
                    <Fragment>
                        <button onClick={downloadWatches}>download</button>
                        <input
                            type="text"
                            placeholder="code"
                            onChange={handleInput}
                            value={downloadCode}
                            style={{ width: "300px", maxWidth: "100%" }}
                        />
                    </Fragment>
                ) : (
                    <p>waiting for code...</p>
                )
            ) : (
                <p>Your file is downloading...</p>
            )}

            {errorDownload && <ErrorDisplayer message={errorDownload} />}
        </div>
    )
}
