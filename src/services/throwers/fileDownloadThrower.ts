import { DropboxResponseError } from "dropbox"
import { DropboxError } from "~/src/config/dropboxConfig"

/**
 * Throws custom exception according to exception thrown.
 * Use in in a catch block
 * @param responseError
 */
export const fileDownloadThrower = (responseError: DropboxResponseError<any>) => {
    if (
        responseError.error ===
        'Error in call to API function "files/download": The given OAuth 2 access token is malformed.'
    ) {
        throw DropboxError.TOKEN_MALFORMED
    }

    const { error_summary } = responseError.error

    switch (error_summary) {
        case "invalid_access_token/":
        case "invalid_access_token/.":
        case "invalid_access_token/..":
        case "invalid_access_token/...":
            throw DropboxError.INVALID_ACCESS_TOKEN
        case "path/not_found/":
        case "path/not_found/.":
        case "path/not_found/..":
        case "path/not_found/...":
            throw DropboxError.NOT_FOUND
        default:
            throw responseError
    }
}
