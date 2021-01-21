import React from "react"
type PropTypes = {
    height?: string
}

const defaultProps: PropTypes = {
    height: "10px",
}

export const VerticalSpace: React.FC<PropTypes> = (props: PropTypes) => {
    const { height } = { ...defaultProps, ...props }
    return <div style={{ height }} />
}
