import {useState} from "react";

// FIXME: is there a way to hold the state of this hook between renders ?
// FIXME: See commented lines

export const useLoading = (initVal: boolean = false) => {

    const [isLoading, setIsLoading] = useState(initVal)
    const [error, setError] = useState(null)

    const beginLoading = () => {
        // if (isLoading === true) {
        //     throw new Error('Already loading...')
        // }
        setError(null)
        setIsLoading(true)
    }

    const finishLoading = () => {
        // if (isLoading === false) {
        //     throw new Error('Already NOT loading...')
        // }
        setIsLoading(false)
    }

    const errorWhileLoading = (error: any) => {
        setIsLoading(false)
        setError(error)
    }

    return [isLoading, error, beginLoading, finishLoading, errorWhileLoading]
}