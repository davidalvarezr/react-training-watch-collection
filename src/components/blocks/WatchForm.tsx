import React, { CSSProperties, useMemo, useState } from "react"
import { Watch } from "~/src/types/Watch"
import { useFileService } from "~/src/components/hooks/useFileService"
import { ImageSelector } from "~/src/components/blocks/ImageSelector"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"
import { Mode } from "~/src/types/Mode"
import { Button, Col, Divider, Input, Row } from "antd"
import { ColProps, RowProps } from "antd/es/grid"
import TextArea from "antd/es/input/TextArea"
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

    // Memo prevents the expensive calculation when we type in a field (which causes a render)
    const image = useMemo(() => fileService.dataUrlToFileObject(state.image, "watch"), [
        state.image,
    ])

    // handler method for the text inputs
    const updateState = (key: keyof Watch, value: string) => {
        setState({
            ...state,
            ...{ [key]: value },
        })
    }

    const updateOrAddWatch = () =>
        mode === Mode.EDIT ? updateWatch({ watch: state, uuid: watch.uuid }) : addWatch(state)

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
                    <Input
                        type="text"
                        value={state.brand}
                        onChange={(evt) => updateState("brand", evt.target.value)}
                    />
                </Col>
            </Row>

            {/*Model*/}
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Model
                </Col>
                <Col {...inputColProps}>
                    <Input
                        type="text"
                        value={state.model}
                        onChange={(evt) => updateState("model", evt.target.value)}
                    />
                </Col>
            </Row>

            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Description
                </Col>
                <Col {...inputColProps}>
                    <TextArea
                        value={state.description}
                        onChange={(evt) => updateState("description", evt.target.value)}
                    />
                </Col>
            </Row>

            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Price bought
                </Col>
                <Col {...inputColProps}>
                    <Input
                        type="number"
                        value={state.priceBought}
                        onChange={(evt) => updateState("priceBought", evt.target.value)}
                    />
                </Col>
            </Row>

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
