import { DropboxResponseError } from "dropbox"
import { FileUploadError } from "~/src/types/dropbox-errors/FileUploadError"

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
        throw FileUploadError.TOKEN_MALFORMED
    }

    const { error_summary } = responseError.error

    console.error("Error summary")
    console.log(error_summary)

    switch (error_summary) {
        case "invalid_access_token/":
        case "invalid_access_token/.":
        case "invalid_access_token/..":
        case "invalid_access_token/...":
            throw FileUploadError.INVALID_ACCESS_TOKEN
        default:
            throw responseError
    }
}
