import {ThrowersName} from "~/src/config/throwers";
import {fileDownloadThrower} from "~/src/services/throwers/fileDownloadThrower";
import {fileUploadThrower} from "~/src/services/throwers/fileUploadThrower";

export const useThrower = (throwerName: ThrowersName) => {
    switch (throwerName) {
        case "fileDownload":
            return fileDownloadThrower
        case "fileUpload":
            return fileUploadThrower
        default:
            throw new Error('Thrower not found')
    }
}