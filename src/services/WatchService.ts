import IWatchService from "~/src/services/IWatchService";
import {TWatchItem} from "~/src/types/TWatchItem";
import {WATCH_LIST} from "~/src/const/localStorageLabels";
import {v4 as uuidv4} from 'uuid';
import {Dropbox} from "dropbox";
import {dropbox as dropboxConfig} from "~/src/config/dropbox";
import {fileDownloadThrower} from "~/src/services/throwers/fileDownloadThrower";
import {fileUploadThrower} from "~/src/services/throwers/fileUploadThrower";


function getWatchList(): TWatchItem[] {
    return JSON.parse(localStorage.getItem(WATCH_LIST) ?? '[]')
}

const dbx = new Dropbox({accessToken: dropboxConfig.ACCESS_TOKEN})
const directory = '/'

export const WatchService: IWatchService = {

    isWatchListEmpty() {
        return [null, '[]'].includes(localStorage.getItem(WATCH_LIST))
    },

    getWatchList: (): TWatchItem[] => {
        return getWatchList()
    },

    setWatchList: (watchList) => {
        localStorage.setItem(WATCH_LIST, JSON.stringify(watchList))
    },

    addWatch: (watch: TWatchItem): void => {
        const watchList = getWatchList()
        const newWatchList = [{...watch, uuid: uuidv4()}, ...watchList]
        localStorage.setItem(WATCH_LIST, JSON.stringify(newWatchList))
    },

    updateWatch: (uuid: string, watch: TWatchItem) => {
        const watchList = getWatchList()
        const updatedWatchList = watchList.map(
            aWatch => aWatch.uuid === uuid ? ({...watch, uuid: uuid}) : aWatch
        )
        localStorage.setItem(WATCH_LIST, JSON.stringify(updatedWatchList))
    },

    clearList: () => {
        localStorage.removeItem(WATCH_LIST)
    },

    getWatch: (uuid: string): TWatchItem | undefined => {
        const watchList = getWatchList()
        return watchList.find(watch => watch.uuid === uuid)
    },

    removeWatch: (uuid: string) => {
        const watchList = getWatchList()
        const filteredWatchList = watchList.filter(watch => watch.uuid !== uuid)
        localStorage.setItem(WATCH_LIST, JSON.stringify(filteredWatchList))
    },

    downloadList: async (filename) => {
        try {
            const {result} = await dbx.filesDownload({
                path: `${directory}${filename}`
            })
            // @ts-ignore -- return type seems not compatible with what it is actually returned...
            const fileAsString = await (result.fileBlob as Blob).text()
            return JSON.parse(fileAsString)
        } catch (e) {
           fileDownloadThrower(e)
        }
    },

    uploadList: async (watches, filename) => {
        try {
            const blob = new Blob([JSON.stringify(watches)], {type: "octet/stream"})
            return await dbx.filesUpload({
                path: `${directory}${filename}`,
                contents: blob,
                mode: {".tag": 'overwrite'}
            })
        } catch (e) {
            fileUploadThrower(e)
        }
    }
}
