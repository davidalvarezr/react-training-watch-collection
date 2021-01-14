import { Watch } from "~/src/types/Watch"

export interface ILocalStorageService {
    setItem(key: string, value: object | string): Promise<void>
    getItemAsString(key: string): Promise<string>
    getItemAsObject<T = any>(key: string): Promise<T>
    getItemAsArray<T>(key: string): Promise<Array<T>>
    removeItem(key: string): Promise<void>
}
