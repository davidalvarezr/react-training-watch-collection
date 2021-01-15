import React from "react"
import { BrowserRouter, Link } from "react-router-dom"
import { Layout } from "antd"
import "antd/dist/antd.css"
import "../index.css"
import { Routing } from "~/src/components/Routing"
import { routes } from "~/src/config/routes"
import { MenuHeader } from "~/src/components/blocks/MenuHeader"

const { Content, Footer } = Layout

export const App: React.FC = () => {
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
