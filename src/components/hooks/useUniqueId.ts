import {UNIQUE_ID} from "~/src/const/localStorageLabels";
import { v4 as uuidv4 } from 'uuid';

// FIXME: Should I use state ? Why ?

/**
 * Identifies the user of the app.
 * The unique id is used in order to find its file online (<unique_id>.json)
 */
export const useUniqueId = () => {

    let uniqueId: string = null
    let isNew = false

    const getUniqueId = () => {
        const id = localStorage.getItem(UNIQUE_ID)
        if (id === null) {
            generateUniqueId()
        } else {
            uniqueId = id
        }
    }

    const generateUniqueId = () => {
        if (localStorage.getItem(UNIQUE_ID) !== null) {
            console.error('Unique id already exist for this user. Not generating a new one...')
            uniqueId = localStorage.getItem(UNIQUE_ID)
            return
        }
        isNew = true

        uniqueId = uuidv4()
        localStorage.setItem(UNIQUE_ID, uniqueId)
    }

    getUniqueId()
    return [uniqueId, isNew]
}