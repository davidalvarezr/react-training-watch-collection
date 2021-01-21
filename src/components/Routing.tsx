import { RouteDefinition } from "~/src/config/routes"
import { Switch, Route } from "react-router-dom"
import React from "react"
import { Result } from "antd"

export const Routing = (props: PropsType) => {
    const { routes } = props

    return (
        <Switch>
            {routes.map((route, i) => (
                <Route key={i} path={route.path} component={route.component} exact={route.exact} />
            ))}

            <Route path="*">
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                />
            </Route>
        </Switch>
    )
}

type PropsType = {
    routes: RouteDefinition[]
}
