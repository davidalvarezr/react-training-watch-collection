import React, { CSSProperties, useContext, useMemo } from "react"
import { Watch } from "~/src/types/Watch"
import { Button, Card, Space } from "antd"
import { Link, useHistory } from "react-router-dom"
import { links } from "~/src/config/links"
import { Mode } from "~/src/types/Mode"
import { ImagePreview } from "~/src/components/blocks/ImagePreview"
import { useFileService } from "~/src/components/hooks/useFileService"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"

type PropTypes = {
    watch: Watch
    mode: Mode
}

const style: CSSProperties = {
    width: "500px",
}

// The display of one watch item in the list
export const WatchItem: React.FC<PropTypes> = ({ watch, mode }: PropTypes) => {
    const { dispatch } = useContext(MainContext)
    const history = useHistory()
    const fileService = useFileService()
    const { brand, description, model, priceBought, uuid } = watch

    const image = useMemo(() => fileService.dataUrlToFileObject(watch.image, "watch"), [
        watch.image,
    ])

    const deleteWatch = () => {
        if (!confirm("Do you really want to delete this watch ?")) return
        dispatch({ type: WatchesAction.REMOVE_WATCH, payload: watch.uuid })
        history.push(links.watchCollection())
    }

    const openAccuracyModal = () => {}

    const itemListControls = (
        <Button>
            <Link to={links.watchShow(uuid)}>More info</Link>
        </Button>
    )

    const showControls = (
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
            case Mode.ITEM_LIST:
                return itemListControls
            case Mode.SHOW:
                return showControls
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
