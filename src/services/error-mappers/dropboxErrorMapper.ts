import { DropboxResponseError } from "dropbox"
import { ValueOf } from "~/src/types/helpers"

const TOKEN_MALFORMED_DOWNLOAD =
    'Error in call to API function "files/download": The given OAuth 2 access token is malformed.'
const TOKEN_MALFORMED_UPLOAD =
    'Error in call to API function "files/upload": The given OAuth 2 access token is malformed.'

const dropboxErrors = {
    INVALID_ACCESS_TOKEN: "Invalid access token :/",
    FILE_TOO_BIG: "File too big :'(",
    NOT_FOUND: "File not found :(",
    TOKEN_MALFORMED: "Token malformed :/",
    UNKNOWN_ERROR: "Unknown error :(",
}

export type DropboxErrorFinalMessage = ValueOf<typeof dropboxErrors>

type ErrorWithSummary = { error_summary: string }

export type DropboxError = string | ErrorWithSummary

export const dropboxErrorMapper = (
    responseError: DropboxResponseError<DropboxError>
): DropboxErrorFinalMessage => {
    switch (responseError.error as string) {
        case TOKEN_MALFORMED_DOWNLOAD:
        case TOKEN_MALFORMED_UPLOAD:
            return dropboxErrors.TOKEN_MALFORMED
    }

    switch ((responseError.error as ErrorWithSummary).error_summary) {
        case "invalid_access_token/":
        case "invalid_access_token/.":
        case "invalid_access_token/..":
        case "invalid_access_token/...":
            return dropboxErrors.INVALID_ACCESS_TOKEN

        case "path/not_found/":
        case "path/not_found/.":
        case "path/not_found/..":
        case "path/not_found/...":
            return dropboxErrors.NOT_FOUND

        default:
            return dropboxErrors.UNKNOWN_ERROR
    }
}
