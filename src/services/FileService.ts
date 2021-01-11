import {IFileService} from "~/src/services/IFileService";

export const FileService: IFileService = {

    toBase64: (file) => new Promise((resolve, reject) => {
        if ([null, undefined].includes(file)) return null

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            // console.log(typeof reader.result, reader.result)
            if (typeof reader.result !== 'string') {
                throw new TypeError()
            }
            resolve(reader.result as string);
        }
        reader.onerror = error => reject(error);
    }),

    dataUrlToFileObject: (dataurl, filename) => {
        if ([null, undefined].includes(dataurl)) return null

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        const t0 = Date.now()
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const t1 = Date.now()

        console.log('Loading of file from base64 to file took ', (t1-t0)/1000, ' s')

        return new File([u8arr], filename, {type: mime});
    },

    fileUrl(file: File): string {
        return URL.createObjectURL(file)
    }

}