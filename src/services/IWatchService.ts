import {TWatchItem} from "~/src/types/TWatchItem";
import {DropboxResponse, files} from "dropbox";

export default interface IWatchService {
    addWatch(watch: TWatchItem)
    clearList()

    /**
     * Get the watch list from the local storage
     */
    getWatchList(): TWatchItem[]
    setWatchList(watchList: TWatchItem[])
    getWatch(uuid: string): TWatchItem
    removeWatch(uuid: string)
    updateWatch(uuid: string, watch: TWatchItem)

    /**
     * Upload a file to Dropbox
     * @param watches the array of watches to upload
     * @param filename (with extension). Best if randomly generated so that a lot of users can find their own lists, and
     * uploading the list would not result in an overwrite of another user's list. The randomly generated filename
     * should be stored in the local storage of the user so he can retrieve/update (sync) it easily
     */
    uploadList(watches: TWatchItem[], filename: string): Promise<DropboxResponse<files.FileMetadata>>
    downloadList(filename: string): Promise<TWatchItem[]>
}