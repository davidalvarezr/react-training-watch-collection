import {links} from "~/src/config/links";
import {HomePage} from "~/src/components/pages/HomePage";
import {FunctionComponent} from "react";
import {WatchCollectionPage} from "~/src/components/pages/WatchCollectionPage";
import {WatchFormPage} from "~/src/components/pages/WatchFormPage";
import WatchDetailPage from "~/src/components/pages/WatchDetailPage";
import CurrentTimePage from "~/src/components/pages/CurrentTimePage";

export type RouteDefinition = {
    path: string,
    component: FunctionComponent,
    exact?: boolean,
}

export const routes: RouteDefinition[] = [
    {
        path: links.home(),
        component: HomePage,
        exact: true,
    },
    {
        path: links.watchCollection(),
        component: WatchCollectionPage,
        exact: true,
    },
    {
        path: links.watchAdd(),
        component: WatchFormPage,
        exact: true,
    },
    {
        path: links.watchShow(),
        component: WatchDetailPage,
        exact: true,
    },
    {
        path: links.watchEdit(),
        component: WatchFormPage,
        exact: true,
    },
    {
        path: links.currentTime(),
        component: CurrentTimePage,
        exact: true,
    }
]

