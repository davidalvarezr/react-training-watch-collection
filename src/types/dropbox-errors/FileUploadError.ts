import { BaseError } from "~/src/types/dropbox-errors/BaseError"
import { ValueOf } from "~/src/types/helpers"

export const FileUploadError = {
    ...BaseError,
    FILE_TOO_BIG: "FILE_TOO_BIG",
} as const

export type FileUploadErrorType = ValueOf<typeof FileUploadError>
