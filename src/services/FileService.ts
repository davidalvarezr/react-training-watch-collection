import { IFileService } from "~/src/services/IFileService"

export class FileService implements IFileService {
    toBase64(file) {
        return new Promise<string>((resolve, reject) => {
            if ([null, undefined].includes(file)) return null

            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                // console.log(typeof reader.result, reader.result)
                if (typeof reader.result !== "string") {
                    throw new TypeError()
                }
                resolve(reader.result as string)
            }
            reader.onerror = (error) => reject(error)
        })
    }

    dataUrlToFileObject(dataurl, filename) {
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

    fileUrl(file: File) {
        return URL.createObjectURL(file)
    }
}
