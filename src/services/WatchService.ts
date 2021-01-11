import IWatchService from "~/src/services/IWatchService";
import {TWatchItem} from "~/src/types/TWatchItem";
import {WATCH_LIST} from "~/src/const/localStorageLabels";
import { v4 as uuidv4 } from 'uuid';
import {Dropbox, files, Error, DropboxResponse} from "dropbox";
import {dropbox as dropboxConfig} from "~/src/config/dropbox";

function getWatchList(): TWatchItem[] {
    return JSON.parse(localStorage.getItem(WATCH_LIST) ?? '[]')
}

const dbx = new Dropbox({accessToken: dropboxConfig.ACCESS_TOKEN})

export const WatchService: IWatchService = {

    getWatchList: (): TWatchItem[] => {
        return getWatchList()
    },

    addWatch: (watch: TWatchItem): void  =>{
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

    // TODO: get the list from the API
    downloadList(): Promise<TWatchItem[]> {
        return Promise.resolve([]);
    },

    // TODO: send the list to the API
    uploadList(watches: TWatchItem[]): Promise<DropboxResponse<files.FileMetadata>> {
        return new Promise(async(resolve, reject) => {
            try {
                const blob = new Blob([JSON.stringify(watches)], {type: "octet/stream"})
                const dbxUploadResponse = await dbx.filesUpload({path: '/test.json', contents: blob})
                resolve(dbxUploadResponse)
            } catch (err: any) {
                reject(err)
            }
        })
    }
}
