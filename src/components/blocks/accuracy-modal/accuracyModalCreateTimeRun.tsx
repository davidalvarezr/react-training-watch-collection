import React, { useMemo } from "react"
import { AccuracyModalStep, PropTypes as AccuracyModalPropTypes } from "./AccuracyModal"
import { Button, Col, List, Modal, Row, TimePicker } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import moment from "moment"

type PropTypes = {
    setStep: (AccuracyModalStep) => void
    createTimeRun: () => void
}

export const accuracyModalCreateTimeRun = ({ setStep, createTimeRun }: PropTypes) => {
    const onTimePickerChange = (...params) => {
        console.log(params)
    }

    const body = <TimePicker secondStep={5} defaultValue={moment()} onChange={onTimePickerChange} />

    const footer = (
        <Row justify={"space-between"}>
            <Col>
                <Button
                    key="back"
                    onClick={() => setStep(AccuracyModalStep.CHOOSE_TIME_RUN)}
                    icon={<ArrowLeftOutlined />}
                />
            </Col>
            <Col>
                <Button key="ok" type={"primary"} onClick={createTimeRun}>
                    Ok
                </Button>
            </Col>
        </Row>
    )

    return [body, footer]
}
