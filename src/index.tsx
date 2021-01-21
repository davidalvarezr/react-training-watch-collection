import "../wdyr"
import React from "react"
import { render } from "react-dom"
import { App } from "~/src/components/App"
import { MainProvider } from "~/src/components/contexts/watches/MainProvider"
// import { debugContextDevtool } from "react-context-devtool"

const AppWithProviders = () => {
    return (
        <MainProvider>
            <App />
        </MainProvider>
    )
}

const container = document.getElementById("root")

render(<AppWithProviders />, container)

// debugContextDevtool(container, {
//     disable: process.env.NODE_ENV === "production",
// })
