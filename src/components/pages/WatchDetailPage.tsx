import React from "react"
import {useParams} from "react-router-dom"
import WatchItem from "~/src/components/blocks/WatchItem/WatchItem";
import WatchService from "~/src/services/WatchService";

function WatchDetailPage(props) {
    // Get uuid from props or route ?
    const {uuid} = useParams()
    const watch = WatchService.getWatch(uuid)

    return <div>
        <WatchItem watch={watch} deletable />
    </div>
}


type PropsType = {
    uuid: string
}

export default  WatchDetailPage