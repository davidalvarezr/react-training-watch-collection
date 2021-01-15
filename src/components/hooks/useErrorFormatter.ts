import { ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

const stringConstructor = "test".constructor
const arrayConstructor = [].constructor
const objectConstructor = {}.constructor

type FormatError = (msg: ErrorMessage) => string
type UseErrorFormatter = () => [FormatError]

export const useErrorFormatter: UseErrorFormatter = () => {
    const formatError: FormatError = (message) => {
        if (message === null) {
            return "null"
        }
        if (message === undefined) {
            return "undefined"
        }
        if (message.constructor === stringConstructor) {
            return message as string
        }
        if (message.constructor === arrayConstructor) {
            return JSON.stringify(message as Array<unknown>)
        }
        if (message.constructor === objectConstructor) {
            return JSON.stringify(message as Record<string, unknown>)
        }
        return (
            "Error is neither a String, Object or Array \n" + message.constructor + "\n" + message
        )
    }
    return [formatError]
}
