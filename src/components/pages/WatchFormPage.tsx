import { WatchForm } from "~/src/components/blocks/WatchForm"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Watch } from "~/src/types/Watch"

/**
 * Add or edit a watch
 * @constructor
 */
export const WatchFormPage = () => {
    const watchService = useWatchService()
    const { uuid } = useParams()
    const [watch, setWatch] = useState<Watch>(null)

    useEffect(() => {
        const fillStateFromStorage = async () => {
            setWatch(await watchService.getWatch(uuid))
        }

        fillStateFromStorage()
    }, [])

    return <WatchForm watch={watch} />
}
