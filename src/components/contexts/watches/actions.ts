import { Watch } from "~/src/types/Watch"

enum ActionLabel {
    ADD_WATCH = "ADD_WATCH",
    REMOVE_WATCH = "REMOVE_WATCH",
    UPDATE_WATCH = "UPDATE_WATCH",
}

interface Action {
    type: ActionLabel
    payload: unknown
}

interface AddWatch extends Action {
    type: ActionLabel.ADD_WATCH
    payload: Watch
}

interface RemoveWatch extends Action {
    type: ActionLabel.REMOVE_WATCH
    payload: string // uuid
}

interface UpdateWatch extends Action {
    type: ActionLabel.UPDATE_WATCH
    payload: Watch[]
}

export type WatchAction = AddWatch | RemoveWatch | UpdateWatch
