import React from "react"
import { useParams } from "react-router-dom"
import { WatchItem } from "~/src/components/blocks/WatchItem"
import { Mode } from "~/src/types/Mode"
import { useMainSelector } from "~/src/components/contexts/watches/useMainSelector"

const WatchDetailPage: React.FC = () => {
    const { uuid } = useParams()
    const [getWatch] = useMainSelector()
    const watch = getWatch(uuid)

    return <div>{watch && <WatchItem watch={watch} mode={Mode.SHOW} />}</div>
}

export default WatchDetailPage
