import React, {useEffect, useMemo, useState} from "react"
import {Link} from "react-router-dom"
import {Button, Space} from "antd"
import {WatchList} from "~/src/components/blocks/WatchList";
import {useWatchService} from "~/src/components/hooks/useWatchService";
import {WATCH_COLLECTION} from "~/src/const/routeNames";
import {TWatchItem} from "~/src/types/TWatchItem";

export const WatchCollectionPage = () => {
    const watchService = useWatchService()
    const watcheList = watchService.getWatchList()

    const [watches, setWatches] = useState<TWatchItem[]>(watcheList)

    const clearList = () => {
        if (confirm("Do you really want to clear your list of watches ?")) {
            watchService.clearList()
            setWatches(watchService.getWatchList())
        }
    }

    return (
        <div>
            <Space>
                <Button type="primary">
                    <Link to={`/${WATCH_COLLECTION}/add`}>Add a watch</Link>
                </Button>
                <Button type="primary" danger onClick={clearList}>
                    Clear the list
                </Button>
            </Space>

            <div style={{height: '10px'}}/>

            <div>
                <WatchList watches={watches}/>
            </div>
        </div>
    )
}