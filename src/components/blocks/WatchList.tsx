import React, { Fragment } from "react"
import { Watch } from "~/src/types/Watch"
import { WatchItem } from "~/src/components/blocks/WatchItem"
import { Space } from "antd"
import { Mode } from "~/src/types/Mode"

export const WatchList = (props: PropsType) => {
    const watches = props.watches.map((watch) => (
        <WatchItem key={watch.uuid} watch={watch} mode={Mode.SHOW} />
    ))

    return (
        <Fragment>
            <Space direction="vertical">{watches}</Space>
        </Fragment>
    )
}

type PropsType = {
    watches: Watch[]
}
