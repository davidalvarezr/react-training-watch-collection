import {TWatchItem} from "~/src/types/TWatchItem";
import {DropboxResponse, files} from "dropbox";

export default interface IWatchService {
    addWatch(watch: TWatchItem)
    clearList()
    getWatchList(): TWatchItem[]
    getWatch(uuid: string): TWatchItem
    removeWatch(uuid: string)
    updateWatch(uuid: string, watch: TWatchItem)
    uploadList(watches: TWatchItem[]): Promise<DropboxResponse<files.FileMetadata>>
    downloadList(): Promise<TWatchItem[]>
}