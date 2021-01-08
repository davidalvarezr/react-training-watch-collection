import React from 'react'
import {PageHeader} from "antd";

export const HomePage = () => {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Home"
                backIcon={false}
            />
            <p>Welcome to MyWatchCollection. This app allows you to do these things:</p>
            <ul>
                <li>Manage a watch collection</li>
                <li>Manage a wish list</li>
                <li>See the current time</li>
                <li>Save your lists on the cloud</li>
            </ul>
        </div>


    )
}