import React from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom"
import {Layout, Menu} from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import {Routing} from "~/src/components/Routing";
import {routes} from "~/src/config/routes";

const {Header, Content, Footer} = Layout;

export const App = () => {
    return (
        <Router>

            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <h1>My Watch Collection</h1>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/watch-collection">
                                Watch collection
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/wish-list">
                                Wish list
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/current-time">
                                Current Time
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/settings">
                                Settings
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">

                        <Routing routes={routes} />

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>My Watch Collection ©2020</Footer>

            </Layout>

        </Router>
    )
}