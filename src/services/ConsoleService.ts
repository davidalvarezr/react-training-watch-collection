import { IConsoleService } from "~/src/services/IConsoleService"

export class ConsoleService implements IConsoleService {
    constructor(private enabled = true) {}

    log(...data: unknown[]): void {
        if (!this.enabled) return
        // eslint-disable-next-line no-console
        console.log(data)
    }

    error(...data: unknown[]): void {
        if (!this.enabled) return
        // eslint-disable-next-line no-console
        console.error(data)
    }
}
