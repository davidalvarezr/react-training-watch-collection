import { IFileService } from "~/src/services/IFileService"
import { fileService } from "~/src/services/container"

export const useFileService = (): IFileService => {
    return fileService
}
