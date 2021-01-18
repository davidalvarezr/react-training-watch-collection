import { WatchAction } from "~/src/components/contexts/watches/actions"
import { State } from "~/src/components/contexts/watches/types"

export type Reducer = (state: State, action: WatchAction) => State

export const reducer: Reducer = (state, action) => {
    switch (action.type) {
        default:
            return []
    }
}
