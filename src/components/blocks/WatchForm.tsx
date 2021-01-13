import React, {useEffect, useMemo, useState} from "react"
import {TWatchItem} from "~/src/types/TWatchItem";
import {useHistory} from "react-router-dom"
import {useWatchService} from "~/src/components/hooks/useWatchService";
import {Button} from "antd";
import {selectFileOfType} from "@bytesoftio/helpers-input";
import {useFileService} from "~/src/components/hooks/useFileService";
import {ImagePreview} from "~/src/components/blocks/ImagePreview";
import {WATCH_COLLECTION} from "~/src/const/routeNames";
import {ImageSelector} from "~/src/components/blocks/ImageSelector";

interface PropsType {
    watch?: TWatchItem,
}

const initialFormState: TWatchItem = {
    uuid: null,
    brand: '',
    model: '',
    description: '',
    priceBought: '',
    image: null,
}


export const WatchForm = ({watch}: PropsType) => {
    const watchService = useWatchService()
    const fileService = useFileService()
    const history = useHistory()
    const [state, setState] = useState<TWatchItem>(watch ?? initialFormState)

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(state.image, 'watch'), [state.image])

    const handleChange = (key: keyof typeof initialFormState, value: string) => {
        setState({
            ...state,
            ...{[key]: value}
        })
    }

    const addWatch = () => {
        console.log("Adding this watch to the collection: ", state)
        watchService.addWatch(state)
        setState(initialFormState)
        history.push(`/${WATCH_COLLECTION}`)
    }

    const updateWatch = () => {
        watchService.updateWatch(watch.uuid, state)
        history.push(`/${WATCH_COLLECTION}`)
    }

    const onImageChange = async (file) => {
        const base64File: string = await fileService.toBase64(file) as any
        setState({
            ...state,
            ...{image: base64File}
        })
    }

    // VIEW ------------------------------------------------------------------------------------------------------------

    return (
        <div className="watch-collection-form">
            <h1>{watch ? 'Edit' : 'Add'} a watch</h1>
            <br/>

            <label>
                Brand
                <input
                    type="text"
                    value={state.brand}
                    onChange={(evt) => handleChange("brand", evt.target.value)}
                />
            </label>
            <br/>

            <label>
                Model
                <input
                    type="text"
                    value={state.model}
                    onChange={(evt) => handleChange("model", evt.target.value)}
                />
            </label>
            <br/>

            <label>
                Description
                <input
                    type="text"
                    value={state.description}
                    onChange={(evt) => handleChange("description", evt.target.value)}
                />
            </label>
            <br/>

            <label>
                Price bought
                <input
                    type="number"
                    value={state.priceBought}
                    onChange={(evt) => handleChange("priceBought", evt.target.value)}
                />
            </label>
            <br/>

            <ImageSelector
                image={image}
                onImageChange={onImageChange}
            />

            <br/>
            <br/>
            <button
                onClick={() => watch ? updateWatch() : addWatch()}
            >
                Submit
            </button>

        </div>

    )

}