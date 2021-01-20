import React, { Fragment, useEffect, useMemo, useState } from "react"
import { Button, Space } from "antd"
import { ImagePreview } from "~/src/components/blocks/ImagePreview"
import { selectFileOfType } from "@bytesoftio/helpers-input"
import { DeleteOutlined } from "@ant-design/icons"

type PropTypes = {
    image?: File
    onImageChange: (image?: File) => void
}

export const ImageSelector = ({ image, onImageChange }: PropTypes) => {
    const handleSelectFileOfType = async () => {
        const file = await selectFileOfType("image/*")
        if (!file) return
        console.log("file selected: ", file)
        onImageChange(file)
    }

    const deleteImage = () => {
        onImageChange()
    }

    return useMemo(
        () => (
            <Fragment>
                <Space>
                    <Button onClick={handleSelectFileOfType}>
                        {image !== undefined ? "Change" : "Add"} image
                    </Button>
                    {image !== undefined && (
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={deleteImage}
                        />
                    )}
                </Space>

                <br />

                <ImagePreview file={image} withTextIfNoImage={true} withLabel={true} />
            </Fragment>
        ),
        [image]
    )
}
