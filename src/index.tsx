import React from "react"
import { render } from "react-dom"
import { App } from "~/src/components/App"
import { WatchesProvider } from "~/src/components/contexts/watches/WatchesProvider"

const AppWithProviders = () => {
    return (
        <WatchesProvider>
            <App />
        </WatchesProvider>
    )
}

render(<AppWithProviders />, document.getElementById("root"))
