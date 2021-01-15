import IWatchService from "~/src/services/IWatchService"
import { Watch } from "~/src/types/Watch"
import { v4 as uuidv4 } from "uuid"
import { Dropbox, DropboxResponse, files } from "dropbox"
import { fileDownloadThrower } from "~/src/services/throwers/fileDownloadThrower"
import { fileUploadThrower } from "~/src/services/throwers/fileUploadThrower"
import { ILocalStorageService } from "~/src/services/ILocalStorageService"
import { IFileService } from "~/src/services/IFileService"

export class WatchService implements IWatchService {
    constructor(
        private dbx: Dropbox,
        private directory: string,
        private watchListLabel: string,
        private storageService: ILocalStorageService,
        private fileService: IFileService
    ) {}

    async isWatchListEmpty(): Promise<boolean> {
        return [null, "[]"].includes(await this.storageService.getItemAsString(this.watchListLabel))
    }

    getWatchList(): Promise<Watch[]> {
        return this.storageService.getItemAsArray<Watch>(this.watchListLabel)
    }

    setWatchList(watchList: Watch[]): Promise<Watch[]> {
        return this.storageService.setItem(this.watchListLabel, watchList)
    }

    async addWatch(watch: Watch): Promise<Watch[]> {
        const watchList = await this.getWatchList()
        const newWatchList = [{ ...watch, uuid: uuidv4() }, ...watchList]
        return this.setWatchList(newWatchList)
    }

    async updateWatch(uuid: string, watch: Watch): Promise<Watch[]> {
        const watchList = await this.getWatchList()
        const updatedWatchList = watchList.map((aWatch) =>
            aWatch.uuid === uuid ? { ...watch, uuid: uuid } : aWatch
        )
        return this.setWatchList(updatedWatchList)
    }

    async clearList(): Promise<Watch[]> {
        await this.storageService.removeItem(this.watchListLabel)
        return this.storageService.getItemAsArray(this.watchListLabel)
    }

    async getWatch(uuid: string): Promise<Watch> {
        const watchList = await this.getWatchList()
        return watchList.find((watch) => watch.uuid === uuid)
    }

    async removeWatch(uuid: string): Promise<Watch[]> {
        const watchList = await this.getWatchList()
        const filteredWatchList = watchList.filter((watch) => watch.uuid !== uuid)
        return this.setWatchList(filteredWatchList)
    }

    async persistWatchesFromCloud(filenameParam: string = null): Promise<Watch[]> {
        const filename =
            filenameParam === null
                ? await this.fileService.getFilenameFromCurrentUser()
                : filenameParam
        const watches = await this.downloadList(filename)
        return this.setWatchList(watches)
    }

    async sendListOnline(): Promise<Watch[]> {
        const watches = await this.getWatchList()
        const filename = await this.fileService.getFilenameFromCurrentUser()
        await this.uploadList(watches, filename)
        return watches
    }

    private async downloadList(filename: string): Promise<Watch[]> {
        try {
            const { result } = await this.dbx.filesDownload({
                path: `${this.directory}${filename}`,
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- return type seems not compatible with what it is actually returned...
            const fileAsString = await (result.fileBlob as Blob).text()
            return JSON.parse(fileAsString)
        } catch (e) {
            fileDownloadThrower(e)
        }
    }

    /**
     * Upload a file to Dropbox
     * @param watches the array of watches to upload
     * @param filename (with extension). Best if randomly generated so that a lot of users can find their own lists, and
     * uploading the list would not result in an overwrite of another user's list. The randomly generated filename
     * should be stored in the local storage of the user so he can retrieve/update (sync) it easily
     */
    private async uploadList(
        watches: Watch[],
        filename: string
    ): Promise<DropboxResponse<files.FileMetadata>> {
        try {
            const blob = new Blob([JSON.stringify(watches)], {
                type: "octet/stream",
            })
            return await this.dbx.filesUpload({
                path: `${this.directory}${filename}`,
                contents: blob,
                mode: { ".tag": "overwrite" },
            })
        } catch (e) {
            fileUploadThrower(e)
        }
    }
}
