import {DropboxResponseError, Error} from "dropbox";
import {FileDownloadError} from "~/src/types/FileDownloadError";

/**
 * Throws custom exception according to exception thrown.
 * Use in in a catch block
 * @param responseError
 */
export const fileDownloadThrower = (responseError: DropboxResponseError<any>) => {
    const {error_summary} = responseError.error

    switch (error_summary) {
        case "path/not_found/":
            throw FileDownloadError.NOT_FOUND
        default:
            throw responseError
    }
}