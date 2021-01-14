import { WatchService } from "~/src/services/WatchService"
import IWatchService from "~/src/services/IWatchService"

export const useWatchService = (): IWatchService => {
    return WatchService
}
