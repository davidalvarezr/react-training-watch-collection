import IWatchService from "~/src/services/IWatchService";
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";
import {WATCH_LIST} from "~/src/const/localStorageLabels";
import { v4 as uuidv4 } from 'uuid';

function getWatchList(): TWatchItem[] {
    return JSON.parse(localStorage.getItem(WATCH_LIST) ?? '[]')
}

const WatchService: IWatchService = {
    getWatchList(): TWatchItem[] {
        return getWatchList()
    },

    addWatch(watch: TWatchItem): void {
        const watchList = getWatchList()
        const newWatchList = [{...watch, uuid: uuidv4()}, ...watchList]
        localStorage.setItem(WATCH_LIST, JSON.stringify(newWatchList))
    },

    updateWatch(uuid: string, watch: TWatchItem) {
        const watchList = getWatchList()
        const updatedWatchList = watchList.map(
            aWatch => aWatch.uuid === uuid ? ({...watch, uuid: uuid}) : aWatch
        )
        localStorage.setItem(WATCH_LIST, JSON.stringify(updatedWatchList))
    },

    clearList() {
        localStorage.removeItem(WATCH_LIST)
    },

    getWatch(uuid: string): TWatchItem | undefined {
        const watchList = getWatchList()
        return watchList.find(watch => watch.uuid === uuid)
    },

    removeWatch(uuid: string): void {
        const watchList = getWatchList()
        const filteredWatchList = watchList.filter(watch => watch.uuid !== uuid)
        localStorage.setItem(WATCH_LIST, JSON.stringify(filteredWatchList))
    },

    // TODO: get the list from the API
    downloadList(): Promise<TWatchItem[]> {
        return Promise.resolve([]);
    },

    // TODO: send the list to the API
    uploadList(watches: TWatchItem[]): Promise<void> {
        return Promise.resolve();
    }
}

export default WatchService