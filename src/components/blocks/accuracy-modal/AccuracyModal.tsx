import React, { useState } from "react"
import { Button, Col, List, Modal, Row, TimePicker } from "antd"
import { TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import { accuracyModalChooseTimeRun } from "~/src/components/blocks/accuracy-modal/accuracyModalChooseTimeRun"
import { accuracyModalCreateTimeRun } from "~/src/components/blocks/accuracy-modal/accuracyModalCreateTimeRun"

export type PropTypes = {
    visible: boolean
    handleCancel: () => void
    watch: WatchHavingTimeRun
}

export enum AccuracyModalStep {
    CHOOSE_TIME_RUN,
    CREATE_TIME_RUN,
}

export const AccuracyModal: React.FC<PropTypes> = (props: PropTypes) => {
    const [step, setStep] = useState<AccuracyModalStep>(AccuracyModalStep.CHOOSE_TIME_RUN)

    const createTimeRun = () => {
        // TODO dispatch action that creates the time run
    }

    const getBodyAndFooter = (): JSX.Element[] => {
        switch (step) {
            case AccuracyModalStep.CHOOSE_TIME_RUN:
                return accuracyModalChooseTimeRun({ ...props, setStep })
            case AccuracyModalStep.CREATE_TIME_RUN:
                return accuracyModalCreateTimeRun({ setStep, createTimeRun })
        }
    }

    const [body, footer] = getBodyAndFooter()

    return (
        <Modal
            visible={props.visible}
            title={"Choose a time run"}
            onCancel={props.handleCancel}
            footer={footer}
        >
            {body}
        </Modal>
    )
}
