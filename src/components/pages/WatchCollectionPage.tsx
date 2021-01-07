import React from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import {Button, Space} from "antd"
import AddWatchPage from "~/src/components/pages/AddWatchPage";
import WatchList from "~/src/components/blocks/WatchList";
import WatchService from "~/src/services/WatchService";

function WatchCollectionPage() {
    let {path, url} = useRouteMatch()

    const watches = WatchService.getWatchList()

    function clearList() {
        console.log('in clear list')
        if (confirm("Do you really want to clear your list of watches ?")) {
            WatchService.clearList()
        }
    }

    return (
        <Switch>

            <Route exact path={url}>

                <Space>
                    <Button type="primary">
                        <Link to={`${url}/add`}>Add a watch</Link>
                    </Button>
                    <Button type="primary" danger onClick={clearList}>
                        Clear the list
                    </Button>
                </Space>

                <div style={{height: '10px'}} />

                <div>
                    <WatchList watches={watches} />
                </div>

            </Route>

            <Route exact path={`${url}/add`}>
                <AddWatchPage/>
            </Route>

        </Switch>

    )
}

export default WatchCollectionPage