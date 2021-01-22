import React, { useContext, useState } from "react"
import { Modal } from "antd"
import { WatchHavingTimeRun } from "~/src/types/Watch"
import { accuracyModalChooseTimeRun } from "~/src/components/blocks/accuracy-modal/accuracyModalChooseTimeRun"
import { accuracyModalCreateTimeRun } from "~/src/components/blocks/accuracy-modal/accuracyModalCreateTimeRun"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"

export type PropTypes = {
    visible: boolean
    handleCancel: () => void
    watch: WatchHavingTimeRun
}

export enum AccuracyModalStep {
    CHOOSE_TIME_RUN,
    CREATE_TIME_RUN,
}

export const AccuracyModal: React.FC<PropTypes> = ({ visible, handleCancel, watch }: PropTypes) => {
    const { dispatch } = useContext(MainContext)
    const [step, setStep] = useState<AccuracyModalStep>(AccuracyModalStep.CHOOSE_TIME_RUN)

    const createTimeRun = () => {
        // TODO dispatch action that creates the time run
        dispatch({
            type: WatchesAction.CREATE_TIME_RUN,
            payload: { uuid: watch.uuid, title: Date.now().toString() },
        })
    }

    const getBodyAndFooter = (): JSX.Element[] => {
        switch (step) {
            case AccuracyModalStep.CHOOSE_TIME_RUN:
                return accuracyModalChooseTimeRun({ watch, onAddTimeRun: createTimeRun })
            case AccuracyModalStep.CREATE_TIME_RUN:
                return accuracyModalCreateTimeRun({ setStep, createTimeRun })
        }
    }

    const [body, footer] = getBodyAndFooter()

    return (
        <Modal
            visible={visible}
            title={"Choose a time run"}
            onCancel={handleCancel}
            footer={footer}
        >
            {body}
        </Modal>
    )
}
