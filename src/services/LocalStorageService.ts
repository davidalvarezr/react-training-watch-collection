import { ILocalStorageService } from "~/src/services/ILocalStorageService"

export class LocalStorageService implements ILocalStorageService {
    constructor(private storage: Storage) {}

    async setItem<T = object | string | number>(key: string, value: T): Promise<T> {
        let finalValue: string

        if (["boolean", "number"].includes(typeof value)) {
            finalValue = String(value) as string
        } else if (typeof value === "object") {
            finalValue = JSON.stringify(value)
        } else if (typeof value === "string") {
            finalValue = value
        }
        this.storage.setItem(key, finalValue)
        return value
    }

    async getItemAsString(key: string): Promise<string | null> {
        return this.storage.getItem(key)
    }

    async getItemAsObject<T = any>(key: string): Promise<T | null> {
        return JSON.parse(this.storage.getItem(key))
    }

    async getItemAsArray<T>(key: string): Promise<Array<T>> {
        const value = JSON.parse(this.storage.getItem(key))
        if (value === null) return []
        if (!Array.isArray(value)) {
            throw new Error(
                "The value you are trying to retrieve as Array cannot be casted to an Array"
            )
        }
        return value
    }

    async removeItem(key: string): Promise<string> {
        const value = await this.getItemAsString(key)
        this.storage.removeItem(key)
        return value
    }
}
