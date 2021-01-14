import { ValueOf } from "~/src/types/helpers"

// Errors that can happen in all requests

export const BaseError = {
    TOKEN_MALFORMED: "TOKEN_MALFORMED",
    INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
} as const

export type BaseErrorType = ValueOf<typeof BaseError>
