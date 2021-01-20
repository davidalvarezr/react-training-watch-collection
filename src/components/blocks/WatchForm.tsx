import React, { CSSProperties, useMemo, useRef, useState } from "react"
import { Watch } from "~/src/types/Watch"
import { useFileService } from "~/src/components/hooks/useFileService"
import { ImageSelector } from "~/src/components/blocks/ImageSelector"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"
import { Mode } from "~/src/types/Mode"
import { Button, Col, Divider, Input, Row } from "antd"
import { ColProps, RowProps } from "antd/es/grid"
import TextArea, { TextAreaRef } from "antd/es/input/TextArea"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint"
import { Breakpoint } from "antd/es/_util/responsiveObserve"

const FORM_H_PADDING = 16
const FORM_V_PADDING = 8

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

const rowProps = (br: Partial<Record<Breakpoint, boolean>>): RowProps => ({
    align: "middle",
    gutter: FORM_H_PADDING,
    justify: br.xs ? "start" : "center",
})

const rowStyle: CSSProperties = {
    paddingBottom: `${FORM_V_PADDING}px`,
}

const labelColProps: ColProps = {
    flex: "100px",
}

const labelColStyle = (br: Partial<Record<Breakpoint, boolean>>): CSSProperties => ({
    textAlign: br.xs ? "left" : "right",
})

const inputColProps: ColProps = {
    xs: 24,
    sm: 16,
    md: 12,
    lg: 10,
    xl: 8,
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
    const bp = useBreakpoint()

    // The state of the form
    const [state, setState] = useState<Watch>(watch)

    // brandRef.current.state.value
    const brandRef = useRef<Input>()
    const modelRef = useRef<Input>()
    const descriptionRef = useRef<TextAreaRef>()
    const priceBoughtRef = useRef<Input>()

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(state.image, "watch"), [
        state.image,
    ])

    const updateOrAddWatch = () => {
        const w: Watch = {
            brand: brandRef.current.input.value,
            model: modelRef.current.input.value,
            description: descriptionRef.current.resizableTextArea.textArea.value,
            priceBought: priceBoughtRef.current.input.value,
            image: state.image,
        }
        mode === Mode.EDIT ? updateWatch({ watch: w, uuid: watch.uuid }) : addWatch(w)
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
            <Divider orientation="left">{mode === Mode.EDIT ? "Edit" : "Add"} a watch</Divider>

            {/*Brand*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Brand
                </Col>
                <Col {...inputColProps}>
                    <Input type="text" ref={brandRef} defaultValue={watch.brand} />
                </Col>
            </Row>

            {/*Model*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Model
                </Col>
                <Col {...inputColProps}>
                    <Input type="text" ref={modelRef} defaultValue={watch.model} />
                </Col>
            </Row>

            {/*Description*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Description
                </Col>
                <Col {...inputColProps}>
                    <TextArea ref={descriptionRef} defaultValue={watch.description} />
                </Col>
            </Row>

            {/*Price bought*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Price bought
                </Col>
                <Col {...inputColProps}>
                    <Input type="number" ref={priceBoughtRef} defaultValue={watch.priceBought} />
                </Col>
            </Row>

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
