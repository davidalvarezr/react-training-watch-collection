import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Space } from "antd"
import { WatchList } from "~/src/components/blocks/WatchList"
import { links } from "~/src/config/links"
import { WatchesContext } from "~/src/components/contexts/watches/WatchesContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { VerticalSpace } from "~/src/components/blocks/VerticalSpace"

export const WatchCollectionPage: React.FC = () => {
    const {
        watches: { watches, localStorageRetrieveLoading },
        dispatch,
    } = useContext(WatchesContext)

    const clearList = async () => {
        if (confirm("Do you really want to clear your list of watches ?")) {
            dispatch({ type: WatchesAction.CLEAR_LIST })
        }
    }

    return (
        <div>
            <Space>
                <Button type="primary">
                    <Link to={links.watchAdd()}>Add a watch</Link>
                </Button>
                <Button type="primary" danger onClick={clearList}>
                    Clear the list
                </Button>
            </Space>

            <VerticalSpace height="10px" />

            <div>
                <LoadWrapper isLoading={localStorageRetrieveLoading}>
                    <WatchList watches={watches} />
                </LoadWrapper>
            </div>
        </div>
    )
}
