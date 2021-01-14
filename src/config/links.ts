import { CURRENT_TIME, SETTINGS, WATCH_COLLECTION } from "~/src/config/labels"

export const links = {
    home: () => "/",

    watchCollection: () => `/${WATCH_COLLECTION}`,
    watchAdd: () => `/${WATCH_COLLECTION}/add`,
    watchShow: (uuid: string = ":uuid") => `/${WATCH_COLLECTION}/${uuid}`,
    watchEdit: (uuid: string = ":uuid") => `/${WATCH_COLLECTION}/${uuid}/edit`,

    currentTime: () => `/${CURRENT_TIME}`,

    settings: () => `/${SETTINGS}`,
}
