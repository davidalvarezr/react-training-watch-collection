import {FileService} from "~/src/services/FileService";
import {IFileService} from "~/src/services/IFileService";

export const useFileService = (): IFileService => {
    return FileService
}