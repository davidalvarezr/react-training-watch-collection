import { useContext } from "react"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { Watch } from "~/src/types/Watch"

export const useMainSelector = () => {
    const { state } = useContext(MainContext)

    const getWatch = (uuid: string): Watch => {
        return state.watches.find((watch) => watch.uuid === uuid)
    }

    return [getWatch]
}
