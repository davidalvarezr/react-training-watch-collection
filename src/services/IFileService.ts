export interface IFileService {
    toBase64(file: File): Promise<string>
    dataUrlToFile(dataUrl: string, filename: string): File
}