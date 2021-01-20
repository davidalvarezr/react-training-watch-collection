import { Dropbox } from "dropbox"
import { dropboxConfig } from "~/src/config/dropboxConfig"
import { WatchService } from "~/src/services/WatchService"
import { LocalStorageService } from "~/src/services/LocalStorageService"
import { UNIQUE_ID, WATCH_LIST } from "~/src/config/labels"
import { FileService } from "~/src/services/FileService"
import { ConsoleService } from "~/src/services/ConsoleService"
import { consoleConfig } from "~/src/config/consoleService"

const DIRECTORY = "/"
const EXTENSION = ".json"

export const consoleService = new ConsoleService(consoleConfig)

const dbx = new Dropbox({ accessToken: dropboxConfig.ACCESS_TOKEN })

export const storageService = new LocalStorageService(localStorage)
export const fileService = new FileService(EXTENSION, storageService, UNIQUE_ID)
export const watchService = new WatchService(
    dbx,
    DIRECTORY,
    WATCH_LIST,
    storageService,
    fileService
)
