import React, { ChangeEvent, Fragment, useState } from "react"

type PropTypes = {
    id: string
    onDownload: (id: string) => void
    onChange?: (id: string) => void
}

export const DownloadWatch: React.FC<PropTypes> = ({ id, onDownload, onChange }: PropTypes) => {
    const [inputValue, setInputValue] = useState<string>(id)

    const onDownloadInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
        if (onChange) onChange(value)
    }

    return (
        <Fragment>
            <button onClick={() => onDownload(inputValue)}>download</button>
            <input
                type="text"
                placeholder="code"
                onChange={onDownloadInputChange}
                value={inputValue}
                style={{ width: "300px", maxWidth: "100%" }}
            />
        </Fragment>
    )
}
