import { Dropbox } from "dropbox"
import { dropboxConfig } from "~/src/config/dropboxConfig"
import { WatchService } from "~/src/services/WatchService"
import { LocalStorageService } from "~/src/services/LocalStorageService"
import { WATCH_LIST } from "~/src/config/labels"
import { FileService } from "~/src/services/FileService"

const DIRECTORY = "/"

const dbx = new Dropbox({ accessToken: dropboxConfig.ACCESS_TOKEN })

export const localStorageService = new LocalStorageService(localStorage)
export const watchService = new WatchService(dbx, DIRECTORY, localStorageService, WATCH_LIST)
export const fileService = new FileService()
