import { IFileService } from "~/src/services/IFileService"
import { ILocalStorageService } from "~/src/services/ILocalStorageService"

export class FileService implements IFileService {
    /**
     *
     * @param extension the file extension on dropbox
     * @param storage
     * @param uniqueIdLabel the label under which the unique id of the user will be stored
     */
    constructor(
        private extension: string,
        private storage: ILocalStorageService,
        private uniqueIdLabel: string
    ) {}

    toBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if ([null, undefined].includes(file)) return null

            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                // console.log(typeof reader.result, reader.result)
                if (typeof reader.result !== "string") {
                    throw new Error("reader.result wrong type")
                }
                resolve(reader.result as string)
            }
            reader.onerror = (error) => reject(error)
        })
    }

    dataUrlToFileObject(dataurl: string, filename: string): File {
        if ([null, undefined].includes(dataurl)) return null

        const arr = dataurl.split(",")
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }

        return new File([u8arr], filename, { type: mime })
    }

    fileUrl(file: File): string {
        return URL.createObjectURL(file)
    }

    async getFilenameFromCurrentUser(extension = this.extension): Promise<string> {
        const uniqueId = await this.storage.getItemAsString(this.uniqueIdLabel)
        // TODO: test not null
        return this.filenameFromUuid(uniqueId, extension)
    }

    filenameFromUuid(uuid: string, extension = this.extension): string {
        return `${uuid}${extension}`
    }
}
