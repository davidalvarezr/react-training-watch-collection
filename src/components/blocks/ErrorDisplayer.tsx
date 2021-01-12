import React from "react"

type PropTypes = {
    message: string,
    color?: string
}

const defaultProps: Partial<PropTypes> = {
    color: 'red'
}

export const ErrorDisplayer = (props: PropTypes) => {
    const {color, message} = {...defaultProps, ...props}

    const getMessage = () => {
        if (typeof message === 'string') {
            return message
        } else () {

        }
    }

    return (
        <p style={{color}}>
            {JSON.stringify(message)}
        </p>
    )
}