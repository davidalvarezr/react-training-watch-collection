import React, {CSSProperties} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem"
import {Card} from "antd"

// The display of one watch item in the list

function WatchItem(props: PropsType) {

    const {brand, description, model, priceBought} = props.watch

    return <Card style={style}>
        <h2>{brand}</h2>
        <h3>{model}</h3>
        <p>{description}</p>
    </Card>
}


type PropsType = {
    watch: TWatchItem
}

const style: CSSProperties = {
    width: "500px",
}

export default WatchItem