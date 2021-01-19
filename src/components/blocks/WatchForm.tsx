import React, { useMemo, useState } from "react"
import { Watch } from "~/src/types/Watch"
import { useFileService } from "~/src/components/hooks/useFileService"
import { ImageSelector } from "~/src/components/blocks/ImageSelector"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"
import { Mode } from "~/src/types/Mode"

interface PropTypes {
    watch?: Watch
    addWatch?: (watch: Watch) => void
    updateWatch?: (payload: { uuid: string; watch: Watch }) => void
}

const initialFormState: Watch = {
    brand: "",
    model: "",
    description: "",
    priceBought: "",
}

/**
 * @param watch shouldn't change over time
 * @param addWatch
 * @param updateWatch
 * @constructor
 */
const WatchForm: React.FC<PropTypes> = ({ watch, addWatch, updateWatch }: PropTypes) => {
    let mode: Mode
    if (watch) {
        mode = Mode.EDIT
    } else {
        mode = Mode.ADD
        watch = initialFormState
    }

    const fileService = useFileService()
    const consoleService = useConsoleService()

    // The state of the form
    const [state, setState] = useState<Watch>(watch)

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(state.image, "watch"), [
        state.image,
    ])

    // useEffect(() => {
    //     consoleService.log("WatchForm mount")
    //     return () => {
    //         consoleService.log("WatchForm unmount")
    //     }
    // }, [])
    // useEffect(() => {
    //     consoleService.log("WatchForm after render")
    // })

    // handler method for the text inputs
    const updateState = (key: keyof Watch, value: string) => {
        setState({
            ...state,
            ...{ [key]: value },
        })
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
            <button
                onClick={() =>
                    mode === Mode.EDIT
                        ? updateWatch({ watch: state, uuid: watch.uuid })
                        : addWatch(state)
                }
            >
                Submit
            </button>
        </div>
    )
}
// WatchForm.whyDidYouRender = true
export { WatchForm }
