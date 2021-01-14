export interface IFileService {
    // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript/57272491#57272491
    toBase64(file: File): Promise<string>

    // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
    dataUrlToFileObject(dataUrl: string, filename: string): File

    /**
     * Give the result of this function as an attribute "src" of an "img" component
     */
    fileUrl(file: File): string

    getFilenameFromCurrentUser(extension?: string): Promise<string>
}
