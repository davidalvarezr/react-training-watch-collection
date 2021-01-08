import React from "react"
import {useParams} from "react-router-dom"

function WatchDetailPage(props) {
    // Get uuid from props or route ?
    const {uuid} = useParams()

    return <div>
        {uuid}
    </div>
}


type PropsType = {
    uuid: string
}

export default  WatchDetailPage