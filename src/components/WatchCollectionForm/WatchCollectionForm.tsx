import React, {useState} from "react"
import {WatchItem} from "~/src/types/WatchItem";

const initialFormState: WatchItem = {
    brand: '',
    model: '',
    description: '',
    priceBought: '',
}

function WatchCollectionForm(props: PropsType) {
    const {mode} = props

    const [state, setState] = useState(initialFormState)

    function handleChange(key: keyof typeof initialFormState, value: string): void {
        setState({
            ...state,
            ...{[key]: value}
        })
    }



    function addWatch() {
        console.log("Adding this watch to the collection: ", state)

        let watchList: WatchItem[] = JSON.parse(localStorage.getItem('watch-list') ?? '[]')
        watchList = [state, ...watchList]
        localStorage.setItem('watch-list', JSON.stringify(watchList))

        setState(initialFormState)
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


export default WatchCollectionForm