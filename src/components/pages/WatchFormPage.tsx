import { WatchForm } from "~/src/components/blocks/watch-form/WatchForm"
import React, { ReactElement, useContext, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Watch } from "~/src/types/Watch"
import { Mode } from "~/src/types/Mode"
import { WatchesContext } from "~/src/components/contexts/watches/WatchesContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { links } from "~/src/config/links"
import { useHistory } from "react-router-dom"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"

const LOADING_MESSAGE = "Watches are being loaded from the local storage"

/**
 * Add or edit a watch
 * @constructor
 */
export const WatchFormPage = (): ReactElement => {
    const {
        state: { watches, initializing },
        dispatch,
    } = useContext(WatchesContext)

    // Retrieve info from url
    const history = useHistory()
    const { uuid } = useParams()
    const mode: Mode = uuid === undefined ? Mode.ADD : Mode.EDIT
    const watch = useMemo(() => watches.find((watch) => watch.uuid === uuid), [watches, uuid])

    // Functions --------------------------------

    const addWatch = (watch: Watch) => {
        dispatch({ type: WatchesAction.ADD_WATCH, payload: watch })
        history.push(links.watchCollection())
    }

    const updateWatch = (payload: { uuid: string; watch: Watch }) => {
        dispatch({ type: WatchesAction.UPDATE_WATCH, payload: payload })
        history.push(links.watchCollection())
    }

    // View -------------------------------------

    if (mode === Mode.ADD) {
        return <WatchForm addWatch={addWatch} />
    }

    if (mode === Mode.EDIT) {
        return (
            <LoadWrapper isLoading={initializing} loadingMessage={LOADING_MESSAGE}>
                {watch && <WatchForm watch={watch} updateWatch={updateWatch} />}
            </LoadWrapper>
        )
    }

    throw new Error("Unknown mode")
}
