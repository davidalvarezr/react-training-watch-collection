import IWatchService from "~/src/services/IWatchService"
import { watchService } from "~/src/services/container"

export const useWatchService = (): IWatchService => {
    return watchService
}
