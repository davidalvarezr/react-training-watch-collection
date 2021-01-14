import { v4 as uuidv4 } from "uuid"
import { UNIQUE_ID } from "~/src/config/labels"
import { useLocalStorageService } from "~/src/components/hooks/useLocalStorageService"

// FIXME: Should I use state ? Why ?
// FIXME: How would I use useMemo in this component ?

type UseUniqueId = () => Promise<[string, boolean]>

/**
 * Identifies the user of the app.
 * The unique id is used in order to find its file online (<unique_id>.json)
 */
export const useUniqueId: UseUniqueId = async () => {
    console.log("useUniqueId")

    const storage = useLocalStorageService()

    let uniqueId: string = null
    let isNew: boolean = false

    const getUniqueId = async () => {
        const id = await storage.getItemAsString(UNIQUE_ID)
        if (id === null) {
            await generateUniqueId()
        } else {
            uniqueId = id
        }
    }

    const generateUniqueId = async () => {
        if ((await storage.getItemAsString(UNIQUE_ID)) !== null) {
            console.error("Unique id already exist for this user. Not generating a new one...")
            uniqueId = await storage.getItemAsString(UNIQUE_ID)
            return
        }
        isNew = true

        uniqueId = uuidv4()
        localStorage.setItem(UNIQUE_ID, uniqueId)
    }

    await getUniqueId()
    return [uniqueId, isNew]
}
