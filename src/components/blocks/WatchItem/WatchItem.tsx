import React, {CSSProperties} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem"
import {Button, Card, Space} from "antd"
import {Link, useHistory} from "react-router-dom"
import {useWatchService} from "~/src/components/hooks/useWatchService";
import {links} from "~/src/config/links";
import { Mode } from "~/src/types/Mode";

// The display of one watch item in the list

export const WatchItem = (props: PropsType) => {
    const history = useHistory()
    const watchService = useWatchService()
    const {watch, mode} = props
    const {brand, description, model, priceBought, uuid} = watch

    function deleteWatch() {
        if (!confirm("Do you really want to delete this watch ?")) return
        watchService.removeWatch(uuid)
        history.push(links.watchCollection())
    }

    const showControls = (
        <Button>
            <Link to={links.watchShow(uuid)}>More info</Link>
        </Button>
    )

    const editControls = (
        <Space>
            <Button type="primary">
                <Link to={links.watchEdit(uuid)}>Edit</Link>
            </Button>

            <Button type="primary" danger onClick={deleteWatch}>
                Delete
            </Button>
        </Space>
    )

    const controls = () => {
        switch (mode) {
            case Mode.Show:
                return showControls
            case Mode.Edit:
                return editControls
            default:
                return 'ERROR'
        }
    }

    return <Card style={style}>
        <h2>{brand}</h2>
        <h3>{model}</h3>
        <p>{description}</p>
        <p>Bought at: {priceBought}</p>

        {controls()}
    </Card>
}


type PropsType = {
    watch: TWatchItem
    mode: Mode
}



const style: CSSProperties = {
    width: "500px",
}