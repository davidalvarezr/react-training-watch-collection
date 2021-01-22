import React from "react"
import { AccuracyModalStep } from "./AccuracyModal"
import { Button, Col, List, Row } from "antd"
import { TimePoint, TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import Item from "antd/es/list/Item"
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons"
import { Moment } from "moment"

type PropTypes = {
    // watch: WatchHavingTimeRun
    timeRun: TimeRun
    onCreateTimePoint: () => void
    onRemoveTimePoint: (timePointTitle: string, timePointRealTime: string) => void
}

export const accuracyModalChooseTimePoint = ({
    timeRun,
    onCreateTimePoint,
    onRemoveTimePoint,
}: PropTypes): [string, JSX.Element, JSX.Element] => {
    const renderTimePoints = (timePoint: TimePoint) => (
        <Item
            actions={[
                <Button
                    danger
                    key="delete"
                    type={"primary"}
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveTimePoint(timeRun.title, timePoint.realTime)}
                />,
                <Button key="choose" type={"primary"} icon={<ArrowRightOutlined />} />,
            ]}
        >
            <Item.Meta
                title={timeRun.title}
                description={`Time points: ${timeRun.timePoints.join(", ")}`}
            />
        </Item>
    )

    const body = <List dataSource={timeRun.timePoints} renderItem={renderTimePoints} />

    const footer = (
        <Button type={"primary"} onClick={onCreateTimePoint}>
            Create a time point
        </Button>
    )

    return ["Choose a time point", body, footer]
}
