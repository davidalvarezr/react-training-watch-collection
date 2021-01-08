import {RouteDefinition} from "~/src/config/routes";
import {Switch, Route} from "react-router-dom"
import React from "react";

export const Routing = (props: PropsType) => {

    const {routes} = props

    return (
        <Switch>
            {routes.map((route, i) =>
                <Route
                    key={i}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />)}

                <Route path="*">
                    404 not found
                </Route>

        </Switch>
    )
}

type PropsType = {
    routes: RouteDefinition[]
}
