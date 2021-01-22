import React from "react"
import { Button, Col, Row, TimePicker, Typography } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import moment, { Moment } from "moment"

type PropTypes = {
    onStoreTimePoint: () => void
    onBack: () => void
    onTimePickerChange: (date: Moment, dateString: string) => void
    time: Moment
}

export const accuracyModalCreateTimePoint = ({
    onStoreTimePoint,
    onBack,
    onTimePickerChange,
    time,
}: PropTypes): [string, JSX.Element, JSX.Element] => {
    const body = (
        <>
            <TimePicker
                secondStep={5}
                defaultValue={moment()}
                value={time}
                onChange={onTimePickerChange}
            />
            <Typography>
                Click <Typography.Text code>Ok</Typography.Text> when your watch shows the time
            </Typography>
        </>
    )

    const footer = (
        <Row justify={"space-between"}>
            <Col>
                <Button key="back" onClick={onBack} icon={<ArrowLeftOutlined />} />
            </Col>
            <Col>
                <Button key="ok" type={"primary"} onClick={onStoreTimePoint}>
                    Ok
                </Button>
            </Col>
        </Row>
    )

    return ["Time point creation", body, footer]
}
