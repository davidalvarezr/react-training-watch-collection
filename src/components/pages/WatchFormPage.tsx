import { WatchForm } from "~/src/components/blocks/WatchForm"
import React, { ReactElement, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Watch } from "~/src/types/Watch"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"
import { Mode } from "~/src/types/Mode"

/**
 * Add or edit a watch
 * @constructor
 */
export const WatchFormPage = (): ReactElement => {
    const watchService = useWatchService()
    const consoleService = useConsoleService()
    const { uuid } = useParams()
    const mode: Mode = uuid === "undefined" ? Mode.ADD : Mode.EDIT
    const [watch, setWatch] = useState<Watch>(null)

    consoleService.log("uuid", uuid)

    useEffect(() => {
        const fillStateFromStorage = async () => {
            setWatch(await watchService.getWatch(uuid))
        }

        fillStateFromStorage()
    }, [uuid, watchService])

    return mode === Mode.ADD ? <WatchForm /> : watch && <WatchForm watch={watch} />
}
