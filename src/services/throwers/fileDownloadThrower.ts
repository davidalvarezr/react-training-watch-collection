import {DropboxResponseError} from "dropbox";
import {FileDownloadError} from "~/src/types/dropbox-errors/FileDownloadError";
import {FileUploadError} from "~/src/types/dropbox-errors/FileUploadError";

/**
 * Throws custom exception according to exception thrown.
 * Use in in a catch block
 * @param responseError
 */
export const fileDownloadThrower = (responseError: DropboxResponseError<any>) => {

    if (responseError.error === "Error in call to API function \"files/download\": The given OAuth 2 access token is malformed.") {
        throw FileUploadError.TOKEN_MALFORMED
    }

    const {error_summary} = responseError.error

    switch (error_summary) {
        case "invalid_access_token/":
        case "invalid_access_token/.":
        case "invalid_access_token/..":
        case "invalid_access_token/...":
            throw FileDownloadError.INVALID_ACCESS_TOKEN
        case "path/not_found/":
        case "path/not_found/.":
        case "path/not_found/..":
        case "path/not_found/...":
            throw FileDownloadError.NOT_FOUND
        default:
            throw responseError
    }
}