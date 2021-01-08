import React, {CSSProperties} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem"
import {Button, Card} from "antd"
import {Link, useRouteMatch} from "react-router-dom"

// The display of one watch item in the list

function WatchItem(props: PropsType) {

    const {path, url} = useRouteMatch()
    const {watch, deletable} = props
    const {brand, description, model, priceBought, uuid} = watch

    console.log('path', path)
    console.log('url', url)

    return <Card style={style}>
        <h2>{brand}</h2>
        <h3>{model}</h3>
        <p>{description}</p>
        <p>Bought at: {priceBought}</p>
        {!deletable && <Button>
            <Link to={`${url}/${uuid}`}>More info</Link>
        </Button>}
    </Card>
}


type PropsType = {
    watch: TWatchItem
    deletable?: boolean
}

const deleteButtonStyle: CSSProperties = {
    top: 0,
    right: 0,
}

const style: CSSProperties = {
    width: "500px",
}

export default WatchItem