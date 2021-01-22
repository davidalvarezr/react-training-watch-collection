import React, { CSSProperties, useContext, useMemo, useState } from "react"
import { Watch, WatchWithTimeRuns } from "~/src/types/Watch"
import { Button, Card, Space } from "antd"
import { Link, useHistory } from "react-router-dom"
import { links } from "~/src/config/links"
import { Mode } from "~/src/types/Mode"
import { ImagePreview } from "~/src/components/blocks/ImagePreview"
import { useFileService } from "~/src/components/hooks/useFileService"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { DeleteOutlined, EditOutlined, FieldTimeOutlined } from "@ant-design/icons"
import { ButtonWithTooltip } from "~/src/components/blocks/ButtonWithTooltip"
import { AccuracyModal } from "~/src/components/blocks/accuracy-modal/AccuracyModal"

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

    const [isModalVisible, setModalVisible] = useState(false)
    const openAccuracyModal = () => {
        setModalVisible(true)
    }

    const itemListControls = (
        <Button>
            <Link to={links.watchShow(uuid)}>More info</Link>
        </Button>
    )

    const showControls = (
        <Space>
            <ButtonWithTooltip tooltip={"Edit"} type="primary" icon={<EditOutlined />}>
                <Link to={links.watchEdit(uuid)}>{/*Edit*/}</Link>
            </ButtonWithTooltip>

            <Button onClick={openAccuracyModal} icon={<FieldTimeOutlined />}>
                Add accuracy
            </Button>

            <ButtonWithTooltip
                tooltip={"Delete"}
                type="primary"
                danger
                onClick={deleteWatch}
                icon={<DeleteOutlined />}
                title={"Delete"}
            >
                {/*Delete*/}
            </ButtonWithTooltip>
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
            {mode === Mode.SHOW && (
                <AccuracyModal
                    watch={new WatchWithTimeRuns(watch)}
                    visible={isModalVisible}
                    handleCancel={() => setModalVisible(false)}
                />
            )}
        </Card>
    )
}
