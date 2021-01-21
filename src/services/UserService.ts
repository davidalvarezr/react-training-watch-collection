import { ILocalStorageService } from "~/src/services/ILocalStorageService"
import { v4 as uuidv4 } from "uuid"

export class UserService {
    constructor(private storage: ILocalStorageService, private uniqueIdLabel) {}

    async getUuid() {
        let id = await this.storage.getItemAsString(this.uniqueIdLabel)
        if (id === null) {
            id = uuidv4()
            this.storage.setItem(this.uniqueIdLabel, id)
        }
        return id
    }
}
