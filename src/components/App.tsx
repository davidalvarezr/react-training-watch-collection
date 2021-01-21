import React, { useContext, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { Layout } from "antd"
import "antd/dist/antd.css"
import "../index.css"
import { Routing } from "~/src/components/Routing"
import { routes } from "~/src/config/routes"
import { MenuHeader } from "~/src/components/blocks/MenuHeader"
import { MainContext } from "~/src/components/contexts/watches/MainContext"
import { WatchesAction } from "~/src/components/contexts/watches/actions"
import { LoadWrapper } from "~/src/components/blocks/LoadWrapper"
import { WholePageLoad } from "~/src/components/blocks/WholePageLoad"

const { Content, Footer } = Layout

// See here: 3 solutions: https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42

export const App: React.FC = () => {
    const {
        state: { initializing },
        dispatch,
    } = useContext(MainContext)

    useEffect(() => {
        dispatch({ type: WatchesAction.LOAD_FROM_LOCAL_STORAGE })
    }, [])

    return (
        <LoadWrapper isLoading={initializing} loadingComponent={WholePageLoad}>
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
        </LoadWrapper>
    )
}
