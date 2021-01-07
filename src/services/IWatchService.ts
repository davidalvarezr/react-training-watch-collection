import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";

export default interface IWatchService {
    addWatch(watch: TWatchItem): void
    clearList(): void
    getWatchList(): TWatchItem[]
    getWatch(uuid: string): TWatchItem
    removeWatch(uuid: string): void

    uploadList(watches: TWatchItem[]): Promise<void>
    downloadList(): Promise<TWatchItem[]>
}
