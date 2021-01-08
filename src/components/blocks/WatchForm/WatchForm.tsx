import React, {useEffect, useState} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";
import { useHistory } from "react-router-dom"
import {useWatchService} from "~/src/components/hooks/useWatchService";

const initialFormState: TWatchItem = {
    uuid: null,
    brand: '',
    model: '',
    description: '',
    priceBought: '',
}

export const WatchForm = (props: PropsType) => {

    const {watch} = props
    const watchService = useWatchService()
    const history = useHistory()
    const [state, setState] = useState(initialFormState)

    useEffect(() => {
        if (!watch) return
        setState(watch)
    }, [])

    function handleChange(key: keyof typeof initialFormState, value: string): void {
        setState({
            ...state,
            ...{[key]: value}
        })
    }

    function addWatch() {
        console.log("Adding this watch to the collection: ", state)
        watchService.addWatch(state)
        setState(initialFormState)
        history.push('/watch-collection')
    }

    function updateWatch() {
        watchService.updateWatch(watch.uuid, state)
        history.push('/watch-collection')
    }

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

            {/*<label>*/}
            {/*    Image*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        onChange={handleFileInput}*/}
            {/*    />*/}
            {/*</label>*/}
            {/*<br/>*/}

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

interface PropsType {
    watch?: TWatchItem,
}