import React, { useContext, useEffect, useMemo } from "react"
import { BrowserRouter } from "react-router-dom"
import { Layout } from "antd"
import "antd/dist/antd.css"
import "../index.css"
import { Routing } from "~/src/components/Routing"
import { routes } from "~/src/config/routes"
import { MenuHeader } from "~/src/components/blocks/MenuHeader"
import { WatchesContext } from "~/src/components/contexts/watches/WatchesContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"

const { Content, Footer } = Layout

export const App: React.FC = () => {
    const {
        watches: { localStorageRetrieveLoading, initialized },
        dispatch,
    } = useContext(WatchesContext)

    useEffect(() => {
        dispatch({ type: WatchesAction.LOAD_FROM_LOCAL_STORAGE })
    }, [])

    return (
        <BrowserRouter>
            <Layout className="layout">
                <MenuHeader />
                <Content style={{ padding: "0 50px" }}>
                    <div className="site-layout-content">
                        <Routing routes={routes} />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>My Watch Collection ©2020</Footer>
            </Layout>
        </BrowserRouter>
    )
}
