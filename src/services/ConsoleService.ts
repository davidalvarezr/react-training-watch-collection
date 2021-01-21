import { IConsoleService } from "~/src/services/IConsoleService"

export type ConsoleConfig = {
    log: boolean
    error: boolean
    logAction: boolean
}

const defaultConfig: ConsoleConfig = {
    log: true,
    error: true,
    logAction: true,
}

export class ConsoleService implements IConsoleService {
    private lastLogAction?: number

    constructor(private config: ConsoleConfig) {
        this.config = { ...defaultConfig, ...config }
    }

    log(...data: unknown[]): void {
        if (!this.config.log) return
        // eslint-disable-next-line no-console
        console.log(...data)
    }

    error(...data: unknown[]): void {
        if (!this.config.error) return
        // eslint-disable-next-line no-console
        console.error(...data)
    }

    logAction(action, state: Record<string, unknown>): void {
        if (!this.config.logAction) return
        // eslint-disable-next-line no-console
        console.info(action, state, this.offset())
    }

    private offset() {
        if (!this.lastLogAction) {
            this.lastLogAction = Date.now()
            return 0
        }
        const lastLogAction = this.lastLogAction
        this.lastLogAction = Date.now()
        return this.lastLogAction - lastLogAction
    }
}
