import { storageService } from "~/src/services/container"
import { ILocalStorageService } from "~/src/services/ILocalStorageService"

export const useLocalStorageService = (): ILocalStorageService => {
    return storageService
}
