import React, {Fragment, useEffect, useState} from "react"
import {Button, Space} from "antd";
import {ImagePreview} from "~/src/components/blocks/ImagePreview";
import {selectFileOfType} from "@bytesoftio/helpers-input";
import {DeleteOutlined} from "@ant-design/icons";

type PropTypes = {
    image?: File
    onImageChange(image: File)
}

export const ImageSelector = (props: PropTypes) => {
    const {image, onImageChange} = props
    const [state, setState] = useState<File>(image ?? null)

    const handleSelectFileOfType = async () => {
        const file = await selectFileOfType('image/*')
        if (!file) return
        console.log('file selected: ', file)
        setState(file)
        onImageChange(file)
    }

    const deleteImage = () => {
        setState(null)
        onImageChange(null)
    }

    return (
        <Fragment>

            <Space>
                <Button onClick={handleSelectFileOfType}>
                    {state !== null ? 'Change' : 'Add'} image
                </Button>
                {state !== null &&
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={deleteImage}
                />}
            </Space>

            <br/>

            <ImagePreview
                file={state}
                withTextIfNoImage={true}
                withLabel={true}
            />
        </Fragment>
    )
}