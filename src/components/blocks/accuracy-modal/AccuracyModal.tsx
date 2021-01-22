import React, { useContext, useState } from "react"
import { Modal } from "antd"
import { TimePoint, TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import { accuracyModalChooseTimeRun } from "~/src/components/blocks/accuracy-modal/accuracyModalChooseTimeRun"
import { accuracyModalCreateTimePoint } from "~/src/components/blocks/accuracy-modal/accuracyModalCreateTimePoint"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { accuracyModalChooseTimePoint } from "~/src/components/blocks/accuracy-modal/accuracyModalChooseTimePoint"
import moment, { Moment } from "moment"

export type PropTypes = {
    visible: boolean
    handleCancel: () => void
    watch: WatchHavingTimeRun
}

export enum AccuracyModalStep {
    CHOOSE_TIME_RUN,
    CREATE_TIME_POINT,
    CHOOSE_TIME_POINT,
}

export const AccuracyModal: React.FC<PropTypes> = ({ visible, handleCancel, watch }: PropTypes) => {
    const { dispatch } = useContext(MainContext)
    const [step, setStep] = useState<AccuracyModalStep>(AccuracyModalStep.CHOOSE_TIME_RUN)
    const [currentTimeRun, setTimeRun] = useState<TimeRun>(null)
    const [currentTimePoint, setTimePoint] = useState<number>(null)
    const [timeInput, setTimeInput] = useState<Moment>(moment())

    const createTimeRun = () => {
        dispatch({
            type: WatchesAction.CREATE_TIME_RUN,
            payload: { uuid: watch.uuid, title: Date.now().toString() },
        })
    }

    const chooseTimeRun = (timeRun: TimeRun) => {
        setTimeRun(timeRun)
        setStep(AccuracyModalStep.CHOOSE_TIME_POINT)
    }

    const removeTimeRun = (title: string) => {
        dispatch({
            type: WatchesAction.REMOVE_TIME_RUN,
            payload: { uuid: watch.uuid, title },
        })
    }

    const createTimePoint = () => {
        setStep(AccuracyModalStep.CREATE_TIME_POINT)
    }

    // TODO: dispatch
    const storeTimePoint = () => {
        const timePoint: TimePoint = {
            realTime: moment().toString(),
            watchTime: timeInput.toString(),
        }
        console.log(timePoint)
    }

    // TODO: dispatch
    const removeTimePoint = () => {}

    const getBodyAndFooter = (): [string, JSX.Element, JSX.Element] => {
        switch (step) {
            case AccuracyModalStep.CHOOSE_TIME_RUN:
                return accuracyModalChooseTimeRun({
                    watch,
                    onCreateTimeRun: createTimeRun,
                    onRemoveTimeRun: removeTimeRun,
                    onChooseTimeRun: chooseTimeRun,
                })

            case AccuracyModalStep.CHOOSE_TIME_POINT:
                return accuracyModalChooseTimePoint({
                    onCreateTimePoint: createTimePoint,
                    timeRun: currentTimeRun,
                    onRemoveTimePoint: removeTimePoint,
                })

            case AccuracyModalStep.CREATE_TIME_POINT:
                return accuracyModalCreateTimePoint({
                    onBack: () => {
                        setStep(AccuracyModalStep.CHOOSE_TIME_POINT)
                    },
                    onStoreTimePoint: storeTimePoint,
                    onTimePickerChange: (date) => {
                        setTimeInput(date)
                    },
                    time: timeInput,
                })

            default:
                throw new Error("Step not found")
        }
    }

    const [title, body, footer] = getBodyAndFooter()

    return (
        <Modal visible={visible} title={title} onCancel={handleCancel} footer={footer}>
            {body}
        </Modal>
    )
}
