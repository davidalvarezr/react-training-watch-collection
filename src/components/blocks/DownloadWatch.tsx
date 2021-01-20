import React, { ChangeEvent, Fragment, useState } from "react"
import { Button, Input } from "antd"
import Search from "antd/es/input/Search"
import { DownloadOutlined } from "@ant-design/icons"

type PropTypes = {
    id: string
    onDownload: (id: string) => void
    onChange?: (id: string) => void
}

const suffix = <DownloadOutlined />

export const DownloadWatch: React.FC<PropTypes> = ({ id, onDownload, onChange }: PropTypes) => {
    const [inputValue, setInputValue] = useState<string>(id)

    const onDownloadInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
        if (onChange) onChange(value)
    }

    return (
        <Search
            placeholder="code"
            enterButton="Download"
            size="middle"
            suffix={suffix}
            onSearch={onDownload}
            onChange={onDownloadInputChange}
            value={inputValue}
        />
    )
}
