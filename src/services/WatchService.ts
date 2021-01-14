import IWatchService from "~/src/services/IWatchService"
import { Watch } from "~/src/types/Watch"
import { v4 as uuidv4 } from "uuid"
import { Dropbox, DropboxResponse, files } from "dropbox"
import { fileDownloadThrower } from "~/src/services/throwers/fileDownloadThrower"
import { fileUploadThrower } from "~/src/services/throwers/fileUploadThrower"
import { ILocalStorageService } from "~/src/services/ILocalStorageService"

export class WatchService implements IWatchService {
    constructor(
        private dbx: Dropbox,
        private directory: string,
        private storageService: ILocalStorageService,
        private watchListLabel: string
    ) {}

    async isWatchListEmpty(): Promise<boolean> {
        return [null, "[]"].includes(await this.storageService.getItemAsString(this.watchListLabel))
    }

    async getWatchList(): Promise<Watch[]> {
        return await this.storageService.getItemAsArray<Watch>(this.watchListLabel)
    }

    async setWatchList(watchList): Promise<void> {
        return await this.storageService.setItem(this.watchListLabel, watchList)
    }

    async addWatch(watch: Watch): Promise<void> {
        const watchList = await this.getWatchList()
        const newWatchList = [{ ...watch, uuid: uuidv4() }, ...watchList]
        return await this.storageService.setItem(this.watchListLabel, newWatchList)
    }

    async updateWatch(uuid: string, watch: Watch): Promise<void> {
        const watchList = await this.getWatchList()
        const updatedWatchList = watchList.map((aWatch) =>
            aWatch.uuid === uuid ? { ...watch, uuid: uuid } : aWatch
        )
        return await this.storageService.setItem(this.watchListLabel, updatedWatchList)
    }

    async clearList() {
        return await this.storageService.removeItem(this.watchListLabel)
    }

    async getWatch(uuid: string): Promise<Watch> {
        const watchList = await this.getWatchList()
        return watchList.find((watch) => watch.uuid === uuid)
    }

    async removeWatch(uuid: string): Promise<void> {
        const watchList = await this.getWatchList()
        const filteredWatchList = watchList.filter((watch) => watch.uuid !== uuid)
        return this.storageService.setItem(this.watchListLabel, filteredWatchList)
    }

    async downloadList(filename: string): Promise<Watch[]> {
        try {
            const { result } = await this.dbx.filesDownload({
                path: `${this.directory}${filename}`,
            })
            // @ts-ignore -- return type seems not compatible with what it is actually returned...
            const fileAsString = await (result.fileBlob as Blob).text()
            return JSON.parse(fileAsString)
        } catch (e) {
            fileDownloadThrower(e)
        }
    }

    async uploadList(
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
