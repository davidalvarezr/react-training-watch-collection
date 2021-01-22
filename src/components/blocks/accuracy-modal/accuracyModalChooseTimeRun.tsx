import React from "react"
import { AccuracyModalStep } from "./AccuracyModal"
import { Button, Col, List, Row } from "antd"
import { TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import Item from "antd/es/list/Item"
import { ArrowRightOutlined } from "@ant-design/icons"

type PropTypes = {
    watch: WatchHavingTimeRun
    onAddTimeRun: () => void
}

export const accuracyModalChooseTimeRun = ({ watch, onAddTimeRun }: PropTypes) => {
    const renderTimeRuns = (timeRun: TimeRun) => (
        <Item actions={[<Button key="btn" icon={<ArrowRightOutlined />} />]}>
            <Item.Meta
                title={timeRun.title}
                description={`Time points: ${timeRun.timePoints.join(", ")}`}
            />
        </Item>
    )

    const body = <List dataSource={watch.timeRuns} renderItem={renderTimeRuns} />

    const footer = (
        <Button type={"primary"} onClick={onAddTimeRun}>
            Add a time run
        </Button>
    )

    return [body, footer]
}
