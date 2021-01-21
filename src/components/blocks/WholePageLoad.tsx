import React from "react"
import { Col, Row, Spin } from "antd"
import { CSSProperties } from "react"
import { useCurrentHeight } from "~/src/components/hooks/useCurrentHeight"

const DEBOUNCE = 250 // ms

const rowStyle = (innerHeight): CSSProperties => ({
    height: innerHeight,
})

const colStyle: CSSProperties = {
    textAlign: "center",
}

export const WholePageLoad: React.FC = () => {
    const currentHeight = useCurrentHeight(DEBOUNCE)
    return (
        <Row style={rowStyle(currentHeight)} justify={"center"} align={"middle"}>
            <Row>
                <Col span={24} style={colStyle}>
                    <Spin />
                </Col>
                <Col span={24} style={colStyle}>
                    Application is loading
                </Col>
            </Row>
        </Row>
    )
}
