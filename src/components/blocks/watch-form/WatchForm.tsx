import React, { useMemo, useState } from "react"
import { Watch } from "~/src/types/Watch"
import { useFileService } from "~/src/components/hooks/useFileService"
import { ImageSelector } from "~/src/components/blocks/ImageSelector"
import { Mode } from "~/src/types/Mode"
import { Button, Col, Divider, Row } from "antd"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint"
import { BrandInput, DescriptionInput, ModelInput, PriceBoughtInput } from "./inputs"
import { inputColProps, labelColProps, labelColStyle, rowProps, rowStyle } from "./style"

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

// Main component ------------------------------------------------------------------------------------------------------

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
    const bp = useBreakpoint()

    // const [uuidState, setUuid] = useState<string>(watch.uuid)
    const [brandState, setBrand] = useState<string>(watch.brand)
    const [modelState, setModel] = useState<string>(watch.model)
    const [descriptionState, setDescription] = useState<string>(watch.description)
    const [priceBoughtState, setPriceBought] = useState<string>(watch.priceBought)
    const [imageState, setImage] = useState<string>(watch.image)

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(imageState, "watch"), [imageState])

    const updateOrAddWatch = () => {
        const w: Watch = {
            brand: brandState,
            model: modelState,
            description: descriptionState,
            priceBought: priceBoughtState,
            image: imageState,
        }
        mode === Mode.EDIT ? updateWatch({ watch: w, uuid: watch.uuid }) : addWatch(w)
    }

    const onImageChange = async (file) => {
        // If no file is given, it means that is has been deleted
        if (!file) {
            setImage(undefined)
            return
        }
        const base64File: string = await fileService.toBase64(file)
        setImage(base64File)
    }

    // VIEW ------------------------------------------------------------------------------------------------------------

    return (
        <div className="watch-collection-form">
            <Divider orientation="left">{mode === Mode.EDIT ? "Edit" : "Add"} a watch</Divider>

            {/*Brand*/}
            <BrandInput bp={bp} brand={brandState} setBrand={setBrand} />

            {/*Model*/}
            <ModelInput bp={bp} model={modelState} setModel={setModel} />

            {/*Description*/}
            <DescriptionInput
                bp={bp}
                description={descriptionState}
                setDescription={setDescription}
            />

            {/*Price bought*/}
            <PriceBoughtInput
                bp={bp}
                priceBought={priceBoughtState}
                setPriceBought={setPriceBought}
            />

            {/*Image*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)} />
                <Col {...inputColProps}>
                    <ImageSelector image={image} onImageChange={onImageChange} />
                </Col>
            </Row>

            <Button onClick={updateOrAddWatch}>Submit</Button>
        </div>
    )
}
// WatchForm.whyDidYouRender = true
export { WatchForm }
