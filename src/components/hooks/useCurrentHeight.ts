// https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
import { useState, useEffect } from "react"

const getHeight = () =>
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

export const useCurrentHeight = (debounce = 1000) => {
    // save current window width in the state object
    const [height, setHeight] = useState(getHeight())

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId)
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setHeight(getHeight()), debounce)
        }
        // set resize listener
        window.addEventListener("resize", resizeListener)

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener("resize", resizeListener)
        }
    }, [])

    return height
}
