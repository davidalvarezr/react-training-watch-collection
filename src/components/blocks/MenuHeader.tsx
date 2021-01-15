import { Menu } from "antd"
import { links } from "~/src/config/links"
import React from "react"
import { Layout } from "antd"
import { Link, useLocation } from "react-router-dom"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"

const { Header } = Layout

export const MenuHeader = () => {
    const { pathname } = useLocation()
    const consoleService = useConsoleService()
    consoleService.log("location", location)

    return (
        <Header>
            <div className="logo">
                <h1>My Watch Collection</h1>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
                <Menu.Item key={links.home()}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key={links.watchCollection()}>
                    <Link to={links.watchCollection()}>Watch collection</Link>
                </Menu.Item>
                <Menu.Item key="/wish-list">
                    <Link to="/wish-list">Wish list</Link>
                </Menu.Item>
                <Menu.Item key={links.currentTime()}>
                    <Link to={links.currentTime()}>Current Time</Link>
                </Menu.Item>
                <Menu.Item key={links.settings()}>
                    <Link to={links.settings()}>Settings</Link>
                </Menu.Item>
            </Menu>
        </Header>
    )
}
