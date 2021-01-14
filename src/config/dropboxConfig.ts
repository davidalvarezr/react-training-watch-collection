export const dropboxConfig = {
    ACCESS_TOKEN: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
}

export enum DropboxErrors {
    TOKEN_MALFORMED = "TOKEN_MALFORMED",
    INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
    NOT_FOUND = "INVALID_ACCESS_TOKEN",
    FILE_TOO_BIG = "FILE_TOO_BIG",
}

console.log("access token: ", dropboxConfig.ACCESS_TOKEN)