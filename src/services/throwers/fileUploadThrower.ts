import { DropboxResponseError } from "dropbox"
import { DropboxError } from "~/src/config/dropboxConfig"
import { consoleService } from "~/src/services/container"

/**
 * Throws custom exception according to exception thrown.
 * Use in in a catch block
 * @param responseError
 */
export const fileUploadThrower = (responseError: DropboxResponseError<any>) => {
    if (
        responseError.error ===
        'Error in call to API function "files/upload": The given OAuth 2 access token is malformed.'
    ) {
        throw DropboxError.TOKEN_MALFORMED
    }

    const { error_summary } = responseError.error

    consoleService.error("Error summary")
    consoleService.log(error_summary)

    switch (error_summary) {
        case "invalid_access_token/":
        case "invalid_access_token/.":
        case "invalid_access_token/..":
        case "invalid_access_token/...":
            throw DropboxError.INVALID_ACCESS_TOKEN
        default:
            throw responseError
    }
}
