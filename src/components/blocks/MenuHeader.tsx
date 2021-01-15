import React from "react"

import { links } from "~/src/config/links"
import { Link, useLocation } from "react-router-dom"
import { Layout, Menu } from "antd"

const { Header } = Layout
const { Item } = Menu

export const MenuHeader = () => {
    const { pathname } = useLocation()

    return (
        <Header>
            <div className="logo">
                <h1>My Watch Collection</h1>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
                <Item key={links.home()}>
                    <Link to="/">Home</Link>
                </Item>
                <Item key={links.watchCollection()}>
                    <Link to={links.watchCollection()}>Watch collection</Link>
                </Item>
                <Item key="/wish-list">
                    <Link to="/wish-list">Wish list</Link>
                </Item>
                <Item key={links.currentTime()}>
                    <Link to={links.currentTime()}>Current Time</Link>
                </Item>
                <Item key={links.settings()}>
                    <Link to={links.settings()}>Settings</Link>
                </Item>
            </Menu>
        </Header>
    )
}
