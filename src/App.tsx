import React, {ClassAttributes, Props} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import HomePage from "~/src/pages/HomePage";
import CurrentTimePage from "~/src/pages/CurrentTimePage";

export default function(props: any) {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/current-time">Current time</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/current-time">
                        <CurrentTimePage />
                    </Route>

                    <Route path="/home">
                        <HomePage />
                    </Route>

                    <Route path="/">
                        <HomePage />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}