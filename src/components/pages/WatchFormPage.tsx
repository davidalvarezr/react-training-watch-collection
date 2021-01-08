import {WatchForm} from "~/src/components/blocks/WatchForm/WatchForm";
import React from "react";
import {useParams} from "react-router-dom"
import {useWatchService} from "~/src/components/hooks/useWatchService";

/**
 * Add or edit a watch
 * @constructor
 */
export const WatchFormPage = () => {
    const watchService = useWatchService()
    const {uuid} = useParams()
    const watch = watchService.getWatch(uuid)

    return (
        <WatchForm watch={watch}/>
    )
}