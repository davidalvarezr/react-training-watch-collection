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
import WatchCollectionPage from "~/src/pages/WatchCollectionPage";

const {Header, Content, Footer} = Layout;

function App() {
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

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route exact path="/">
                                <HomePage/>
                            </Route>

                            <Route path="/watch-collection">
                                <WatchCollectionPage/>
                            </Route>

                            <Route path="/current-time">
                                <CurrentTimePage/>
                            </Route>

                            <Route path="/home">
                                <HomePage/>
                            </Route>

                            <Route path="/">
                                404 not found
                            </Route>

                        </Switch>

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>My Watch Collection ©2020</Footer>

            </Layout>

        </Router>
    )
}

export default App