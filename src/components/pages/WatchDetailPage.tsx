import React from "react"
import { useParams } from "react-router-dom"
import { WatchItem } from "~/src/components/blocks/WatchItem"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Mode } from "~/src/types/Mode"

function WatchDetailPage() {
    const watchService = useWatchService()
    const { uuid } = useParams()
    const watch = watchService.getWatch(uuid)

    return (
        <div>
            <WatchItem watch={watch} mode={Mode.Edit} />
        </div>
    )
}

export default WatchDetailPage
