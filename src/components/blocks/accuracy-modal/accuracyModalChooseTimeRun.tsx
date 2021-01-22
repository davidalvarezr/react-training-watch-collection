import React from "react"
import { AccuracyModalStep } from "./AccuracyModal"
import { Button, Col, List, Row } from "antd"
import { TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import Item from "antd/es/list/Item"
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons"

type PropTypes = {
    watch: WatchHavingTimeRun
    onCreateTimeRun: () => void
    onRemoveTimeRun: (title: string) => void
    onChooseTimeRun: (timeRun: TimeRun) => void
}

export const accuracyModalChooseTimeRun = ({
    watch,
    onCreateTimeRun,
    onRemoveTimeRun,
    onChooseTimeRun,
}: PropTypes): [string, JSX.Element, JSX.Element] => {
    const renderTimeRuns = (timeRun: TimeRun) => (
        <Item
            actions={[
                <Button
                    danger
                    key="delete"
                    type={"primary"}
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveTimeRun(timeRun.title)}
                />,
                <Button
                    key="choose"
                    type={"primary"}
                    icon={<ArrowRightOutlined />}
                    onClick={() => onChooseTimeRun(timeRun)}
                />,
            ]}
        >
            <Item.Meta
                title={timeRun.title}
                description={`Time points: ${timeRun.timePoints.join(", ")}`}
            />
        </Item>
    )

    const body = <List dataSource={watch.timeRuns} renderItem={renderTimeRuns} />

    const footer = (
        <Button type={"primary"} onClick={onCreateTimeRun}>
            Add a time run
        </Button>
    )

    return ["Choose a time run", body, footer]
}
