import { consoleService } from "~/src/services/container"
import { IConsoleService } from "~/src/services/IConsoleService"

export const useConsoleService = (): IConsoleService => {
    return consoleService
}
