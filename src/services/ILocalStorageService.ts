export interface ILocalStorageService {
    /**
     * Set the items in the storage and returns it
     * @param key
     * @param value
     */
    setItem<T = Record<string, unknown> | string | number>(key: string, value: T): Promise<T>

    /**
     * Gets the item as a string or null if it does not exist
     * @param key
     */
    getItemAsString(key: string): Promise<string | null>

    /**
     * Returns the item as an object or null it the item does not exist
     * @param key
     */
    getItemAsObject<T = Record<string, unknown>>(key: string): Promise<T | null>

    /**
     * Gets the item as an array
     * If stored as null, returns an empty array
     * If not array castable, throws an error
     * @param key
     */
    getItemAsArray<T>(key: string): Promise<Array<T>>

    /**
     * Removes the item and returns it as string
     * @param key
     */
    removeItem(key: string): Promise<string>
}
