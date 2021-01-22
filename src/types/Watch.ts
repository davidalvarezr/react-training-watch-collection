type TimePoint = {
    realTime: number
    watchTime: number
}

export type TimeRun = {
    title: string
    timePoints: TimePoint[]
}

export type Watch = {
    uuid?: string
    brand: string
    model: string
    description: string
    priceBought: string
    image?: string
}

export type WatchHavingTimeRun = Watch & { uuid: string; timeRuns: TimeRun[] }

export class WatchWithTimeRuns implements WatchHavingTimeRun {
    uuid: string
    brand: string
    model: string
    description: string
    priceBought: string
    image?: string
    timeRuns: TimeRun[]

    constructor({
        uuid,
        brand,
        model,
        description,
        priceBought,
        image,
        ...restProp
    }: Watch | WatchHavingTimeRun) {
        this.uuid = uuid
        this.brand = brand
        this.model = model
        this.description = description
        this.priceBought = priceBought
        this.image = image
        if ((restProp as WatchHavingTimeRun).timeRuns) {
            this.timeRuns = (restProp as WatchHavingTimeRun).timeRuns
        } else {
            this.timeRuns = []
        }
    }
}
