import React, {CSSProperties} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem"
import {Button, Card} from "antd"
import {Link, useHistory} from "react-router-dom"
import WatchService from "~/src/services/WatchService";

// The display of one watch item in the list

function WatchItem(props: PropsType) {
    const history = useHistory()
    const {watch, deletable} = props
    const {brand, description, model, priceBought, uuid} = watch

    function deleteWatch() {
        if (!confirm("Do you really want to delete this watch ?")) return
        WatchService.removeWatch(uuid)
        history.push("/watch-collection")
    }

    return <Card style={style}>
        <h2>{brand}</h2>
        <h3>{model}</h3>
        <p>{description}</p>
        <p>Bought at: {priceBought}</p>

        {!deletable && <Button>
            <Link to={`/watch-collection/${uuid}`}>More info</Link>
        </Button>}

        {deletable && <Button danger onClick={deleteWatch}>
            Delete
        </Button>}
    </Card>
}


type PropsType = {
    watch: TWatchItem
    deletable?: boolean
}

const style: CSSProperties = {
    width: "500px",
}

export default WatchItem