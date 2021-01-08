import WatchForm from "~/src/components/blocks/WatchCollectionForm/WatchForm";
import React from "react";
import {useRouteMatch} from "react-router-dom"

function AddWatchPage() {

    const {path, url} = useRouteMatch()

    console.log('path', path)
    console.log('url', url)

    return (
        <WatchForm mode={"add"}/>
    )
}

export default AddWatchPage