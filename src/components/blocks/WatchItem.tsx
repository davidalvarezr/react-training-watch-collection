import React, { CSSProperties, useMemo } from "react"
import { Watch } from "~/src/types/Watch"
import { Button, Card, Space } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useWatchService } from "~/src/components/hooks/useWatchService"
import { links } from "~/src/config/links"
import { Mode } from "~/src/types/Mode"
import { ImagePreview } from "~/src/components/blocks/ImagePreview"
import { useFileService } from "~/src/components/hooks/useFileService"

type PropTypes = {
    watch: Watch
    mode: Mode
}

const style: CSSProperties = {
    width: "500px",
}

// The display of one watch item in the list
export const WatchItem = ({ watch, mode }: PropTypes) => {
    const history = useHistory()
    const watchService = useWatchService()
    const fileService = useFileService()
    const { brand, description, model, priceBought, uuid } = watch

    let image = null
    if (watch.image) {
        image = useMemo(() => fileService.dataUrlToFileObject(watch.image, "watch"), [watch.image])
    }

    const deleteWatch = async () => {
        if (!confirm("Do you really want to delete this watch ?")) return
        await watchService.removeWatch(uuid)
        history.push(links.watchCollection())
    }

    const showControls = (
        <Button>
            <Link to={links.watchShow(uuid)}>More info</Link>
        </Button>
    )

    const editControls = (
        <Space>
            <Button type="primary">
                <Link to={links.watchEdit(uuid)}>Edit</Link>
            </Button>

            <Button type="primary" danger onClick={deleteWatch}>
                Delete
            </Button>
        </Space>
    )

    const controls = () => {
        switch (mode) {
            case Mode.SHOW:
                return showControls
            case Mode.EDIT:
                return editControls
            default:
                return "ERROR"
        }
    }

    return (
        <Card style={style}>
            <h2>{brand}</h2>
            <h3>{model}</h3>
            <p>{description}</p>
            {priceBought !== "" && <p>Bought at: {priceBought}$</p>}
            <ImagePreview file={image} />
            {controls()}
        </Card>
    )
}
