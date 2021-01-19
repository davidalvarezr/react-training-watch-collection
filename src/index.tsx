import "../wdyr"
import React from "react"
import { render } from "react-dom"
import { App } from "~/src/components/App"
import { WatchesProvider } from "~/src/components/contexts/watches/WatchesProvider"
import { debugContextDevtool } from "react-context-devtool"

const AppWithProviders = () => {
    return (
        <WatchesProvider>
            <App />
        </WatchesProvider>
    )
}

const container = document.getElementById("root")

render(<AppWithProviders />, container)

debugContextDevtool(container, {
    disable: process.env.NODE_ENV === "production",
})
