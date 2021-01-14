import { v4 as uuidv4 } from "uuid"
import { UNIQUE_ID } from "~/src/config/labels"
import { useLocalStorageService } from "~/src/components/hooks/useLocalStorageService"
import { useEffect, useState } from "react"

// FIXME: Should I use state ? Why ?
// FIXME: How would I use useMemo in this component ?

type UseUniqueId = () => [string, boolean]

/**
 * Identifies the user of the app.
 * The unique id is used in order to find its file online (<unique_id>.json)
 */
export const useUniqueId: UseUniqueId = () => {
    console.log("useUniqueId")

    const storage = useLocalStorageService()

    const [uniqueId, setUniqueId] = useState<string>(null)
    const [isNew, setIsNew] = useState<boolean>(false)

    useEffect(() => {
        console.log("useUniqueId EFFECT")

        const getUniqueId = async () => {
            const id = await storage.getItemAsString(UNIQUE_ID)
            if (id === null) {
                await generateUniqueId()
            } else {
                console.log("setting new id ", id)
                setUniqueId(id)
            }
        }

        const generateUniqueId = async () => {
            if ((await storage.getItemAsString(UNIQUE_ID)) !== null) {
                console.error("Unique id already exist for this user. Not generating a new one...")
                const id = await storage.getItemAsString(UNIQUE_ID)
                console.log("setting new id ", id)
                setUniqueId(id)
                return
            }
            setIsNew(true)
            const id = uuidv4()
            console.log("setting new id ", id)
            setUniqueId(id)
            await storage.setItem(UNIQUE_ID, uniqueId)
        }

        getUniqueId().then(() => console.log("GOT UNIQUE ID"))
    })

    return [uniqueId, isNew]
}
