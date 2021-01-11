import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";

export default interface IWatchService {
    addWatch(watch: TWatchItem)
    clearList()
    getWatchList(): TWatchItem[]
    getWatch(uuid: string): TWatchItem
    removeWatch(uuid: string)
    updateWatch(uuid: string, watch: TWatchItem)
    uploadList(watches: TWatchItem[]): Promise<void>
    downloadList(): Promise<TWatchItem[]>
}