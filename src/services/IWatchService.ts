import { Watch } from "~/src/types/Watch"
import { DropboxResponse, files } from "dropbox"
import DownloadError = files.DownloadError

export default interface IWatchService {
    addWatch(watch: Watch): Promise<Watch[]>

    /**
     * Clears the watch list and returns it
     */
    clearList(): Promise<Watch[]>

    /**
     * Get the watch list from the local storage
     */
    getWatchList(): Promise<Watch[]>

    /**
     * Set/replaces the watchList and returns it
     * @param watchList
     */
    setWatchList(watchList: Watch[]): Promise<Watch[]>

    /**
     * Get a watch from the list
     * @param uuid the uuid of the watch
     */
    getWatch(uuid: string): Promise<Watch>

    /**
     * Removes the watch from the list and returns the new watch list
     * @param uuid the uuid of the watch
     */
    removeWatch(uuid: string): Promise<Watch[]>

    /**
     * Updates a watch and return the watch list
     * @param uuid the uuid of the watch
     * @param watch the new watch
     */
    updateWatch(uuid: string, watch: Watch): Promise<Watch[]>

    /**
     * Upload a file to Dropbox
     * @param watches the array of watches to upload
     * @param filename (with extension). Best if randomly generated so that a lot of users can find their own lists, and
     * uploading the list would not result in an overwrite of another user's list. The randomly generated filename
     * should be stored in the local storage of the user so he can retrieve/update (sync) it easily
     */
    uploadList(watches: Watch[], filename: string): Promise<DropboxResponse<files.FileMetadata>>

    /**
     * Fetches watches form the cloud and store it in local storage
     * @param filename
     * @return the watches that have been fetched and stored
     */
    persistWatchesFromCloud(filename: string): Promise<Watch[]>

    isWatchListEmpty(): Promise<boolean>
}
