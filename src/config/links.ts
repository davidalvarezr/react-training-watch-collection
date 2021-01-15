import { CURRENT_TIME, SETTINGS, WATCH_COLLECTION } from "~/src/config/labels"

type Link = () => string
type LinkWithArg = (param?: string) => string

interface Links {
    home: Link
    watchCollection: Link
    watchAdd: Link
    watchShow: LinkWithArg
    watchEdit: LinkWithArg
    currentTime: Link
    settings: Link
}

export const links: Links = {
    home: () => "/",

    watchCollection: () => `/${WATCH_COLLECTION}`,
    watchAdd: () => `/${WATCH_COLLECTION}/add`,
    watchShow: (uuid = ":uuid") => `/${WATCH_COLLECTION}/${uuid}`,
    watchEdit: (uuid = ":uuid") => `/${WATCH_COLLECTION}/${uuid}/edit`,

    currentTime: () => `/${CURRENT_TIME}`,

    settings: () => `/${SETTINGS}`,
}
