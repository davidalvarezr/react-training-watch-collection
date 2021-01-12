import React, {ChangeEvent, Fragment, useMemo, useState} from "react"
import {useWatchService} from "~/src/components/hooks/useWatchService";
import {useUniqueId} from "~/src/components/hooks/useUniqueId";
import {useLoading} from "~/src/components/hooks/useLoading";
import {FileDownloadError} from "~/src/types/FileDownloadError";

export const SettingsPage = () => {

    const watchService = useWatchService()

    // FIXME: is it correct to use useMemo here, because we don't want the function to execute at each update ?
    const [uniqueId] = useMemo(() => useUniqueId(), [])
    const [downloadCode, setDownloadCode] = useState(uniqueId)
    const [isUploading, errorUpload, beginUpload, endUpload, errorWhileUploading] = useLoading(false)
    const [isDownloading, errorDownload, beginDownload, endDownload, errorWhileDownloading] = useLoading(false)

    const filename = `${uniqueId}.json` // the filename to be uploaded
    const getFilename = (id) => `${id}.json` // the filename to be downloaded

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
        if (!watchService.isWatchListEmpty()
            && !confirm("Downloading your list from the cloud will erase the one you actually have in the app")) {
            return
        }
        beginDownload()
        try {
            const watchList = await watchService.downloadList(getFilename(downloadCode))
            watchService.setWatchList(watchList)
        } catch (e) {
            console.log('An error has occured when downloading', e)
            switch (e) {
                case FileDownloadError.NOT_FOUND:
                    errorWhileDownloading("Code not found on the cloud. Impossible to download the list :(")
                    break
                default:
                    errorWhileDownloading(e)
            }

        }
        endDownload()
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => { setDownloadCode(e.target.value) }

    return (
        <div>
            <p>Your code: {uniqueId}</p>

            {/*UPLOAD -----------------------------------------------------------------------------------------------*/}

            {!isUploading ?
                <button onClick={uploadWatches}>
                    upload
                </button> :
                <p>Your file is uploading...</p>
            }

            {errorUpload && <pre>
                {errorUpload}
            </pre>}

            <br/>

            {/*DOWNLOAD ---------------------------------------------------------------------------------------------*/}

            {!isDownloading ?
                (
                    <Fragment>
                        <button onClick={downloadWatches}>
                            download
                        </button>
                        <input
                            type="text"
                            placeholder="code"
                            onChange={handleInput}
                            value={downloadCode}
                            style={{width: '300px', maxWidth: '100%'}}
                        />
                    </Fragment>

                ) :
                <p>Your file is downloading...</p>
            }

            {errorDownload && }

        </div>
    )
}