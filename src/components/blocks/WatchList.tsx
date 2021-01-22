import React from "react"
import { Watch } from "~/src/types/Watch"
import { WatchItem } from "~/src/components/blocks/WatchItem"
import { Space } from "antd"
import { Mode } from "~/src/types/Mode"

type PropTypes = {
    watches: Watch[]
}

export const WatchList: React.FC<PropTypes> = (props: PropTypes) => {
    const watches = props.watches.map((watch) => (
        <WatchItem key={watch.uuid} watch={watch} mode={Mode.ITEM_LIST} />
    ))

    return <Space direction="vertical">{watches}</Space>
}
