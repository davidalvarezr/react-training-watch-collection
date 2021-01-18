import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Space } from "antd"
import { WatchList } from "~/src/components/blocks/WatchList"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { Watch } from "~/src/types/Watch"
import { links } from "~/src/config/links"
import { WatchesProvider } from "~/src/components/contexts/watches/WatchesProvider"

export const WatchCollectionPage = () => {
    const watchService = useWatchService()
    const [watches, setWatches] = useState<Watch[]>([])

    useEffect(() => {
        const fillStateFromStorage = async () => {
            setWatches(await watchService.getWatchList())
        }
        fillStateFromStorage()
    }, [])

    const clearList = async () => {
        if (confirm("Do you really want to clear your list of watches ?")) {
            setWatches(await watchService.clearList())
        }
    }

    return (
        <WatchesProvider>
            <div>
                <Space>
                    <Button type="primary">
                        <Link to={links.watchAdd()}>Add a watch</Link>
                    </Button>
                    <Button type="primary" danger onClick={clearList}>
                        Clear the list
                    </Button>
                </Space>

                <div style={{ height: "10px" }} />

                <div>
                    <WatchList watches={watches} />
                </div>
            </div>
        </WatchesProvider>
    )
}
