import {IFileService} from "~/src/services/IFileService";

export const FileService: IFileService = {

    // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript/57272491#57272491
    toBase64: (file) => new Promise((resolve, reject) => {
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

    // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
    dataUrlToFile: (dataurl, filename) => {
        if (dataurl === null) return null

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

        console.log('Loading of file from base64 to file took ', (t1-t0)/1000)

        return new File([u8arr], filename, {type: mime});
    }

}