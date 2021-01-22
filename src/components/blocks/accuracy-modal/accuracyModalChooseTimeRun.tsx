import React from "react"
import { AccuracyModalStep } from "./AccuracyModal"
import { Button, List } from "antd"
import { TimeRun, WatchHavingTimeRun } from "~/src/types/Watch"
import Item from "antd/es/list/Item"

type PropTypes = {
    watch: WatchHavingTimeRun
    setStep: (AccuracyModalStep) => void
}

export const accuracyModalChooseTimeRun = ({ watch, setStep }: PropTypes) => {
    const renderTimeRuns = (timeRun: TimeRun) => <Item>Jean</Item>

    const body = <List dataSource={watch.timeRuns} renderItem={renderTimeRuns} />

    const footer = (
        <Button type={"primary"} onClick={() => setStep(AccuracyModalStep.CREATE_TIME_RUN)}>
            Add a time run
        </Button>
    )

    return [body, footer]
}
