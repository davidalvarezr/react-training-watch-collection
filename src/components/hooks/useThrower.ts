import {ThrowersName} from "~/src/config/throwers";
import {fileDownloadThrower} from "~/src/services/throwers/fileDownloadThrower";

export const useThrower = (throwerName: ThrowersName) => {
    switch (throwerName) {
        case "fileDownload":
            return fileDownloadThrower
    }
}