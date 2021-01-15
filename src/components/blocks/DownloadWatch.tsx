import React, { Fragment, useState } from "react"

type PropTypes = {
    id: string
    onDownload: (id: string) => void
}

export const DownloadWatch: React.FC<PropTypes> = ({ id, onDownload }: PropTypes) => {
    const [inputValue, setInputValue] = useState<string>(id)

    return (
        <Fragment>
            <button onClick={() => onDownload(inputValue)}>download</button>
            <input
                type="text"
                placeholder="code"
                onChange={(evt) => setInputValue(evt.target.value)}
                value={inputValue}
                style={{ width: "300px", maxWidth: "100%" }}
            />
        </Fragment>
    )
}
