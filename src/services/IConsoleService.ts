export interface IConsoleService {
    log(...data: unknown[]): void
    error(...data: unknown[]): void
    logAction(...data: unknown[]): void
}
