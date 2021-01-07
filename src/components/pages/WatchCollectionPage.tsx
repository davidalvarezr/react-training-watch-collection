import React from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import {Button} from "antd"
import AddWatchPage from "~/src/components/pages/AddWatchPage";
import {WATCH_LIST} from "~/src/const/localStorageLabels";

function WatchCollectionPage() {
    let {path, url} = useRouteMatch()

    function clearList() {
        console.log('in clear list')
        if (confirm("Do you really want to clear your list of watches ?")) {
            localStorage.removeItem(WATCH_LIST)
        }
    }

    return (
        <Switch>

            <Route exact path={url}>
                <Button type="primary">
                    <Link to={`${url}/add`}>Add a watch</Link>
                </Button>
                <Button type="primary" danger onClick={clearList}>
                    Clear the list
                </Button>
            </Route>

            <Route exact path={`${url}/add`}>
                <AddWatchPage/>
            </Route>

        </Switch>

    )
}

export default WatchCollectionPage