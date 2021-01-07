import React, {Fragment} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";
import WatchItem from "~/src/components/blocks/WatchItem/WatchItem";
import {Space} from "antd";

function WatchList(props: PropsType) {
    const watches = props.watches.map(watch =>
        <WatchItem watch={watch} key={watch.uuid} />
    )

    return <Fragment>
        <Space direction="vertical" >
            {watches}
        </Space>
    </Fragment>
}


type PropsType = {
    watches: TWatchItem[]
}


export default WatchList