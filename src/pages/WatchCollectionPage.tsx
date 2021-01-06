import React from "react"
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"
import {Button} from "antd"
import AddWatchPage from "~/src/pages/AddWatchPage";

function WatchCollectionPage() {
    let {path, url} = useRouteMatch()

    return (
        <Switch>

            <Route exact path={url}>
                <Button type="primary">
                    <Link to={`${url}/add`}>Add a watch</Link>
                </Button>
            </Route>

            <Route exact path={`${url}/add`}>
                <AddWatchPage />
            </Route>

        </Switch>

    )
}

export default WatchCollectionPage