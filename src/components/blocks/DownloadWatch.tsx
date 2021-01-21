import React, { ChangeEvent, Fragment, useRef, useState } from "react"
import { Button, Col, Input, Row } from "antd"
import Search from "antd/es/input/Search"
import { DownloadOutlined } from "@ant-design/icons"

type PropTypes = {
    initialId: string
    id: string
    onDownload: (id: string) => void
    onChange?: (id: string) => void
}

const suffix = <DownloadOutlined />

export const DownloadWatch: React.FC<PropTypes> = ({
    initialId,
    id,
    onDownload,
    onChange,
}: PropTypes) => {
    const [inputValue, setInputValue] = useState<string>(id)

    const onDownloadInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
        if (onChange) onChange(value)
    }

    const isInputSameAsInit = () => initialId === inputValue

    const resetInputToInitialValue = () => {
        setInputValue(initialId)
    }

    return (
        <>
            <Row>
                <Col flex={"auto"}>
                    <Search
                        placeholder="code"
                        enterButton="Download"
                        size="middle"
                        suffix={suffix}
                        onSearch={onDownload}
                        onChange={onDownloadInputChange}
                        value={inputValue}
                    />
                </Col>

                <Col flex={"66px"}>
                    {!isInputSameAsInit() && (
                        <Button onClick={resetInputToInitialValue} type={"primary"} danger>
                            Reset
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    )
}
