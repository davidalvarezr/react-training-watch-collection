import React, { useMemo, useState } from "react"
import { Watch } from "~/src/types/Watch"
import { useHistory } from "react-router-dom"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { useFileService } from "~/src/components/hooks/useFileService"
import { ImageSelector } from "~/src/components/blocks/ImageSelector"
import { links } from "~/src/config/links"

interface PropsType {
    watch?: Watch
}

const initialFormState: Watch = {
    uuid: null,
    brand: "",
    model: "",
    description: "",
    priceBought: "",
    image: null,
}

export const WatchForm = ({ watch }: PropsType) => {
    const watchService = useWatchService()
    const fileService = useFileService()
    const history = useHistory()
    const [state, setState] = useState<Watch>(watch ?? initialFormState)

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(state.image, "watch"), [
        state.image,
    ])

    const updateState = (key: keyof typeof initialFormState, value: string) => {
        setState({
            ...state,
            ...{ [key]: value },
        })
    }

    const addWatch = () => {
        console.log("Adding this watch to the collection: ", state)
        watchService.addWatch(state)
        setState(initialFormState)
        history.push(links.watchCollection())
    }

    const updateWatch = () => {
        watchService.updateWatch(watch.uuid, state)
        history.push(links.watchCollection())
    }

    const onImageChange = async (file) => {
        const base64File: string = await fileService.toBase64(file)
        setState({
            ...state,
            ...{ image: base64File },
        })
    }

    // VIEW ------------------------------------------------------------------------------------------------------------

    return (
        <div className="watch-collection-form">
            <h1>{watch ? "Edit" : "Add"} a watch</h1>
            <br />

            <label>
                Brand
                <input
                    type="text"
                    value={state.brand}
                    onChange={(evt) => updateState("brand", evt.target.value)}
                />
            </label>
            <br />

            <label>
                Model
                <input
                    type="text"
                    value={state.model}
                    onChange={(evt) => updateState("model", evt.target.value)}
                />
            </label>
            <br />

            <label>
                Description
                <input
                    type="text"
                    value={state.description}
                    onChange={(evt) => updateState("description", evt.target.value)}
                />
            </label>
            <br />

            <label>
                Price bought
                <input
                    type="number"
                    value={state.priceBought}
                    onChange={(evt) => updateState("priceBought", evt.target.value)}
                />
            </label>
            <br />

            <ImageSelector image={image} onImageChange={onImageChange} />

            <br />
            <br />
            <button onClick={() => (watch ? updateWatch() : addWatch())}>Submit</button>
        </div>
    )
}
