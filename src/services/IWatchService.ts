import { Watch } from "~/src/types/Watch"
import { DropboxResponse, files } from "dropbox"
import DownloadError = files.DownloadError

export default interface IWatchService {
    addWatch(watch: Watch)
    clearList()

    /**
     * Get the watch list from the local storage
     */
    getWatchList(): Promise<Watch[]>

    /**
     * Replaces the watchList
     * @param watchList
     */
    setWatchList(watchList: Watch[])
    getWatch(uuid: string): Promise<Watch>
    removeWatch(uuid: string): Promise<void>
    updateWatch(uuid: string, watch: Watch)

    /**
     * Upload a file to Dropbox
     * @param watches the array of watches to upload
     * @param filename (with extension). Best if randomly generated so that a lot of users can find their own lists, and
     * uploading the list would not result in an overwrite of another user's list. The randomly generated filename
     * should be stored in the local storage of the user so he can retrieve/update (sync) it easily
     */
    uploadList(watches: Watch[], filename: string): Promise<DropboxResponse<files.FileMetadata>>
    downloadList(filename: string): Promise<Watch[]>

    isWatchListEmpty(): Promise<boolean>
}
