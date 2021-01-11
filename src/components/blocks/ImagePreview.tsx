import React, {CSSProperties} from "react"

type PropTypes = {
    file?: File
}

const style: CSSProperties = {
    width: '50vh',
    maxWidth: '100%',
}


export const ImagePreview = (props: PropTypes) => {
    const {file} = props;

    if (!file) {
        return (
            <div>No image given</div>
        )
    }

    const fileUrl = URL.createObjectURL(file)

    return (
        <div>
            <p>Image preview:</p>
            <img src={fileUrl} style={style} alt="No image given" />
        </div>
    )

}