// eslint-disable-next-line react/prop-types
import React, { useMemo } from "react"
import { Col, Input, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { inputColProps, labelColProps, labelColStyle, rowProps, rowStyle } from "./style"

const BrandInput = ({ bp, brand, setBrand }) =>
    useMemo(
        () => (
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Brand
                </Col>
                <Col {...inputColProps}>
                    <Input
                        type="text"
                        value={brand}
                        onChange={(evt) => setBrand(evt.target.value)}
                    />
                </Col>
            </Row>
        ),
        [brand, bp]
    )

// eslint-disable-next-line react/prop-types
const ModelInput = ({ bp, model, setModel }) =>
    useMemo(
        () => (
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Model
                </Col>
                <Col {...inputColProps}>
                    <Input
                        type="text"
                        value={model}
                        onChange={(evt) => setModel(evt.target.value)}
                    />
                </Col>
            </Row>
        ),
        [model, bp]
    )

const DescriptionInput = ({ bp, description, setDescription }) =>
    useMemo(
        () => (
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Description
                </Col>
                <Col {...inputColProps}>
                    <TextArea
                        value={description}
                        onChange={(evt) => setDescription(evt.target.value)}
                    />
                </Col>
            </Row>
        ),
        [description, bp, setDescription]
    )

const PriceBoughtInput = ({ bp, priceBought, setPriceBought }) =>
    useMemo(
        () => (
            <Row {...rowProps(bp)} style={rowStyle}>
                <Col {...labelColProps} style={labelColStyle(bp)}>
                    Price bought
                </Col>
                <Col {...inputColProps}>
                    <Input
                        type="number"
                        value={priceBought}
                        onChange={(evt) => setPriceBought(evt.target.value)}
                    />
                </Col>
            </Row>
        ),
        [bp, priceBought]
    )

export { BrandInput, ModelInput, DescriptionInput, PriceBoughtInput }
