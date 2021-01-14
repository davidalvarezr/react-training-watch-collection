import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { WatchItem } from "~/src/components/blocks/WatchItem"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Mode } from "~/src/types/Mode"
import { Watch } from "~/src/types/Watch"

function WatchDetailPage() {
    const watchService = useWatchService()
    const { uuid } = useParams()

    const [watch, setWatch] = useState<Watch>(null)

    useEffect(() => {
        const fillStateFromStorage = async () => {
            setWatch(await watchService.getWatch(uuid))
        }

        fillStateFromStorage()
    }, [])

    return (
        <div>
            <WatchItem watch={watch} mode={Mode.EDIT} />
        </div>
    )
}

export default WatchDetailPage
