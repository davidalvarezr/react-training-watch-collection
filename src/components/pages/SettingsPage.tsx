import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { useLoading } from "~/src/components/hooks/useLoading"
import { ErrorDisplayer } from "~/src/components/blocks/ErrorDisplayer"
import { useErrorMapper } from "~/src/components/hooks/useErrorMapper"
import { UNIQUE_ID } from "~/src/config/labels"
import { useLocalStorageService } from "~/src/components/hooks/useLocalStorageService"
import { v4 as uuidv4 } from "uuid"

export const SettingsPage = () => {
    const watchService = useWatchService()
    const storage = useLocalStorageService()
    const [uniqueId, setUniqueId] = useState<string>(null)

    useEffect(() => {
        const loadUniqueId = async () => {
            const id = await storage.getItemAsString(UNIQUE_ID)
            if (id === null) {
                const newId = uuidv4()
                setUniqueId(newId)
                storage.setItem(UNIQUE_ID, id)
            } else {
                setUniqueId(id)
            }
        }

        loadUniqueId()
    })

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
            await watchService.persistWatchesFromCloud()
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
                uniqueId !== null ? (
                    <Fragment>
                        <button onClick={downloadWatches}>download</button>
                        <input
                            type="text"
                            placeholder="code"
                            onChange={handleInput}
                            value={uniqueId}
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
