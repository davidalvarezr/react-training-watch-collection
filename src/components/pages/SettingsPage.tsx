import React, { CSSProperties, useContext, useEffect, useState } from "react"
import { useUniqueId } from "~/src/components/hooks/useUniqueId"
import { DownloadWatch } from "~/src/components/blocks/DownloadWatch"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons"
import { WatchesContext } from "~/src/components/contexts/watches/WatchesContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { Button, Col, Divider, Row } from "antd"
import { ColProps, RowProps } from "antd/es/grid"

const rowProps: RowProps = {
    gutter: [16, 16],
    justify: "space-around",
}

const colProps: ColProps = {
    xs: 24,
    md: 16,
    lg: 12,
}

export const SettingsPage: React.FC = () => {
    const {
        watches: { uploading, uploadError, downloading, downloadError },
        dispatch,
    } = useContext(WatchesContext)

    // Unique ID state and effect ---------------
    const [uniqueId] = useUniqueId()
    const [downloadInput, setDownloadInput] = useState(uniqueId)
    useEffect(() => {
        setDownloadInput(uniqueId)
    }, [uniqueId])

    const upload = () => {
        dispatch({ type: WatchesAction.UPLOAD })
    }

    const download = (id: string) => {
        dispatch({ type: WatchesAction.DOWNLOAD, payload: id })
    }

    return (
        <>
            <Divider orientation="left">Your code: {uniqueId}</Divider>

            {/*UPLOAD -------------------------------------------------------*/}
            <Row {...rowProps}>
                <Col {...colProps}>
                    <LoadWrapper
                        isLoading={uploading}
                        loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
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
                        loadingComponent={<LoadingOutlined style={{ fontSize: "32px" }} />}
                        loadingMessage="Downloading watches..."
                        errorMessage={downloadError}
                    >
                        <DownloadWatch
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
