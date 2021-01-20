import React from "react"
import { useErrorFormatter } from "~/src/components/hooks/useErrorFormatter"

// FIXME: is it a good way to create a default props ?

export type ErrorMessage = string | Record<string, unknown> | Array<unknown>

type PropTypes = {
    message: ErrorMessage
    color?: string
}

const defaultProps: Partial<PropTypes> = {
    color: "red",
}

export const ErrorDisplayer: React.FC<PropTypes> = (props: PropTypes) => {
    const { color, message } = { ...defaultProps, ...props }

    const [formatError] = useErrorFormatter()

    return <p style={{ color }}>{formatError(message)}</p>
}
