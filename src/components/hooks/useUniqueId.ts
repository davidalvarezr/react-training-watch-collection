import { useEffect, useMemo, useState } from "react"
import { UNIQUE_ID } from "~/src/config/labels"
import { useConsoleService } from "~/src/components/hooks/useConsoleService"
import { useLocalStorageService } from "~/src/components/hooks/useLocalStorageService"
import { v4 as uuidv4 } from "uuid"

type UseUniqueId = () => [string, boolean]

export const useUniqueId: UseUniqueId = () => {
    const consoleService = useConsoleService()
    const storage = useLocalStorageService()

    // Will get the unique id stored in the local storage
    const [uniqueId, setUniqueId] = useState<string>(null)
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        consoleService.log("in useUniqueId")
        const loadUniqueId = async () => {
            consoleService.log("in useUniqueId -> loadUniqueId")
            let id = await storage.getItemAsString(UNIQUE_ID)
            if (id === null) {
                id = uuidv4()
                await storage.setItem(UNIQUE_ID, id)
            }
            setUniqueId(id)
            setLoading(false)
        }

        loadUniqueId()
    }, [uniqueId])

    return [uniqueId, isLoading]
}
