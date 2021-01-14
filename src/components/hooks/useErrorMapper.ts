import { FileDownloadErrorType } from "~/src/types/dropbox-errors/FileDownloadError"
import { FileUploadErrorType } from "~/src/types/dropbox-errors/FileUploadError"
import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

type DropboxError = FileDownloadErrorType | FileUploadErrorType
type Mapper = {
    [elt in DropboxError]: string
}
type MsgFromError = (err: DropboxError) => ErrorMessage
type UseErrorMapper = () => [MsgFromError]

const mapper: Mapper = {
    INVALID_ACCESS_TOKEN: "Invalid access token :/",
    FILE_TOO_BIG: "File too big :'(",
    NOT_FOUND: "File not found :(",
    TOKEN_MALFORMED: "Token malformed :/",
} as const

export const useErrorMapper: UseErrorMapper = () => {
    const msgFromError: MsgFromError = (err) => {
        // If the key does not exist, return the error itself
        return mapper[err] || err
    }

    return [msgFromError]
}
