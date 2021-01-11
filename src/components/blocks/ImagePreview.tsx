import React, {CSSProperties} from "react"
import {useFileService} from "~/src/components/hooks/useFileService";

type PropTypes = {
    file?: File
    style?: CSSProperties
    withTextIfNoImage?: boolean
    withLabel?: boolean
}

const defaultProps:PropTypes = {
    withTextIfNoImage: false,
    withLabel: false,
}

const baseStyle: CSSProperties = {
    width: '50vh',
    maxWidth: '100%',
}


export const ImagePreview = (props: PropTypes) => {
    const {file, style, withTextIfNoImage, withLabel} = {...defaultProps, ...props};
    const finalStyle = {...baseStyle, ...style}
    const fileService = useFileService()

    if (!file) {
        return withTextIfNoImage ? (<div>No image given</div>) : null
    }

    const fileUrl = fileService.fileUrl(file)


    return (
        <div>
            {withLabel && <p>Image preview:</p>}
            <img src={fileUrl} style={finalStyle} alt="No image given" />
        </div>
    )

}