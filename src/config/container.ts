import { Dropbox } from "dropbox"
import { dropboxConfig } from "~/src/config/dropboxConfig"
import { WatchService } from "~/src/services/WatchService"

const DIRECTORY = "/"

const dbx = new Dropbox({ accessToken: dropboxConfig.ACCESS_TOKEN })
const watchService = new WatchService(dbx, DIRECTORY)
