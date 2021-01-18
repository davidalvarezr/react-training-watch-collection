import { Watch } from "~/src/types/Watch"
import { Dispatch } from "react"
import { WatchAction } from "~/src/components/contexts/watches/actions"

export type State = Watch[]

export type Provider = {
    watches: State
    dispatch?: Dispatch<WatchAction>
}
