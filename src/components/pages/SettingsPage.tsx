import React, { useContext, useEffect, useState } from "react"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { Button, Col, Divider, Row, Typography } from "antd"
import { ColProps, RowProps } from "antd/es/grid"
import Paragraph from "antd/es/typography/Paragraph"
import { VerticalSpace } from "~/src/components/blocks/VerticalSpace"

const { Text } = Typography

const rowProps: RowProps = {
    gutter: [16, 16],
    justify: "center",
}

const colProps: ColProps = {
    xs: 24,
    md: 18,
    lg: 14,
}

export const SettingsPage: React.FC = () => {
    const {
        state: { uploading, uploadError, downloading, downloadError, uuid },
        dispatch,
    } = useContext(MainContext)

    // Unique ID state and effect ---------------
    const [downloadInput, setDownloadInput] = useState(uuid)
    useEffect(() => {
        setDownloadInput(uuid)
    }, [uuid])

    const upload = () => {
        dispatch({ type: WatchesAction.UPLOAD })
    }

    const download = (id: string) => {
        dispatch({ type: WatchesAction.DOWNLOAD, payload: id })
    }

    return (
        <>
            <Divider orientation="left">Your code: {uuid}</Divider>

            <Typography>
                <Paragraph>
                    Your code is a unique identifier that allows you to share your list across
                    different computers.
                </Paragraph>
                <Paragraph>
                    Click{" "}
                    <Text code>
                        <UploadOutlined /> Upload
                    </Text>{" "}
                    to save your list on the cloud
                </Paragraph>
                <Paragraph>
                    If your list is already on the cloud, you can <DownloadOutlined />
                    <Text code>Download</Text> it using your code
                </Paragraph>
            </Typography>

            <VerticalSpace />

            {/*UPLOAD -------------------------------------------------------*/}
            <Row {...rowProps}>
                <Col {...colProps}>
                    <LoadWrapper
                        isLoading={uploading}
                        loadingMessage="Uploading watches..."
                        errorMessage={uploadError}
                    >
                        <Button type="primary" onClick={upload} icon={<UploadOutlined />}>
                            Upload
                        </Button>
                    </LoadWrapper>
                </Col>
            </Row>

            {/*DOWNLOAD -----------------------------------------------------*/}
            <Row {...rowProps}>
                <Col {...colProps}>
                    <LoadWrapper
                        isLoading={downloading || downloadInput === null}
                        loadingMessage="Downloading watches..."
                        errorMessage={downloadError}
                    >
                        <DownloadWatch
                            initialId={uuid}
                            id={downloadInput}
                            onDownload={download}
                            onChange={setDownloadInput}
                        />
                    </LoadWrapper>
                </Col>
            </Row>
        </>
    )
}
