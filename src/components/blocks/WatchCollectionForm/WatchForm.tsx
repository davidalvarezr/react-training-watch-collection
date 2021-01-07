import React, {useState} from "react"
import {TWatchItem} from "~/src/components/blocks/WatchItem/TWatchItem";
import { useHistory } from "react-router-dom"
import WatchService from "~/src/services/WatchService";

const initialFormState: TWatchItem = {
    uuid: null,
    brand: '',
    model: '',
    description: '',
    priceBought: '',
}

function WatchForm(props: PropsType) {
    const {mode} = props

    const history = useHistory()

    const [state, setState] = useState(initialFormState)

    function handleChange(key: keyof typeof initialFormState, value: string): void {
        setState({
            ...state,
            ...{[key]: value}
        })
    }

    function addWatch() {
        console.log("Adding this watch to the collection: ", state)
        WatchService.addWatch(state)
        setState(initialFormState)
        history.push('/watch-collection')
    }

    return (
        <div className="watch-collection-form">
            <h1>Add a watch</h1>
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
                onClick={() => addWatch()}
            >
                Submit
            </button>

        </div>

    )

}

interface PropsType {
    mode: 'add' | 'edit'
}


export default WatchForm