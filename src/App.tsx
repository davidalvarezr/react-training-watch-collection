import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
import {Layout, Menu} from 'antd'
import 'antd/dist/antd.css'
import './index.css'

import HomePage from "~/src/pages/HomePage";
import CurrentTimePage from "~/src/pages/CurrentTimePage";

const {Header, Content, Footer} = Layout;

export default function () {
    return (
        <Router>

            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <h1>My Watch Collection</h1>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/current-time">
                                Current Time
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <div className="site-layout-content">

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/current-time">
                                <CurrentTimePage/>
                            </Route>

                            <Route path="/home">
                                <HomePage/>
                            </Route>

                            <Route path="/">
                                <HomePage/>
                            </Route>
                        </Switch>

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>My Watch Collection ©2020</Footer>

            </Layout>

        </Router>
    )
}