export interface IFileService {
    /**
     * Converts a File to s string
     * @param file
     * @link https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript/57272491#57272491
     */
    toBase64(file: File): Promise<string>

    /**
     * Converts a string to a File
     * @param dataUrl
     * @param filename
     * @link https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
     */
    dataUrlToFileObject(dataUrl: string, filename: string): File

    /**
     * Give the result of this function as an attribute "src" of an "img" component
     */
    fileUrl(file: File): string

    /**
     * Get the file name to ask to Dropbox according of the id of the user
     * If the user has no id, will create a new one in the local storage
     * @param extension
     */
    getFilenameFromCurrentUser(extension?: string): Promise<string>

    filenameFromUuid(uuid: string, extension?: string): string
}
