import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import {Button, Space} from "antd"
import {WatchList} from "~/src/components/blocks/WatchList";
import {useWatchService} from "~/src/components/hooks/useWatchService";

export const WatchCollectionPage = () => {
    console.log("WatchCollectionPage is beeing redered")
    const watchService = useWatchService()

    useEffect(() => {
        console.log("inside useEffect of WatchCollectionPage ")
    })

    // const [watches, setWatches] = useState<TWatchItem[]>([])
    const watches = watchService.getWatchList()

    const clearList = () => {
        if (confirm("Do you really want to clear your list of watches ?")) {
            watchService.clearList()
        }
    }

    return (
        <div>
            <Space>
                <Button type="primary">
                    <Link to={`/watch-collection/add`}>Add a watch</Link>
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