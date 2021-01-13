import {useState} from "react";
import {ErrorMessage} from "~/src/components/blocks/ErrorDisplayer";

// FIXME: is there a way to hold the state of this hook between renders ?
// FIXME: See commented lines

type BeginLoading = () => void
type FinishLoading = () => void
type ErrorWhileLoading = (err: ErrorMessage) => void

type UseLoading = (initVal: boolean) => [boolean, ErrorMessage, BeginLoading, FinishLoading, ErrorWhileLoading]

export const useLoading: UseLoading = (initVal: boolean = false) => {

    const [isLoading, setIsLoading] = useState(initVal)
    const [error, setError] = useState(null)

    const beginLoading: BeginLoading = () => {
        // if (isLoading === true) {
        //     throw new Error('Already loading...')
        // }
        setError(null)
        setIsLoading(true)
    }

    const finishLoading: FinishLoading = () => {
        // if (isLoading === false) {
        //     throw new Error('Already NOT loading...')
        // }
        setIsLoading(false)
    }

    const errorWhileLoading: ErrorWhileLoading = (error: any) => {
        setIsLoading(false)
        setError(error)
    }

    return [isLoading, error, beginLoading, finishLoading, errorWhileLoading]
}