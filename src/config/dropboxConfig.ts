import { consoleService } from "~/src/services/container"

export const dropboxConfig = {
    ACCESS_TOKEN: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
}

export enum DropboxError {
    TOKEN_MALFORMED = "TOKEN_MALFORMED",
    INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
    NOT_FOUND = "NOT_FOUND",
    FILE_TOO_BIG = "FILE_TOO_BIG",
}

consoleService.log("access token: ", dropboxConfig.ACCESS_TOKEN)
