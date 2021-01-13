import {BaseError} from "~/src/types/dropbox-errors/BaseError";
import {ValueOf} from "~/src/types/helpers";

export const FileDownloadError = {
    ...BaseError,
    NOT_FOUND: 'NOT_FOUND',
} as const

export type FileDownloadErrorType = ValueOf<typeof FileDownloadError>

