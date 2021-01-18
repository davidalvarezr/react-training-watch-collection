import React, { PropsWithChildren, ReactNode } from "react"
import { ErrorDisplayer, ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"

type LoadingComponentProps = { message?: string }

const loadingComponentDefaultProps: LoadingComponentProps = {
    message: "Loading...",
}

const LoadingComponent: React.FC<LoadingComponentProps> = (props: LoadingComponentProps) => {
    const { message } = { ...loadingComponentDefaultProps, ...props }
    return <div>{message}</div>
}

type PropTypes = PropsWithChildren<{
    isLoading: boolean
    loadingComponent?: ReactNode
    loadingMessage?: string
    errorMessage?: ErrorMessage
}>

const defaultProps: PropTypes = {
    isLoading: false,
    loadingMessage: "Loading...",
}

/**
 * Wrap a component and replaces it by a "loading" message or component
 * Also displays an error message if the "errorMessage" prop contains something
 * @param props
 * @constructor
 */
export const LoadWrapper: React.FC<PropTypes> = (props: PropTypes) => {
    const { isLoading, loadingComponent, loadingMessage, errorMessage, children } = {
        ...defaultProps,
        ...props,
    }

    if (isLoading) {
        if (loadingComponent)
            return (
                <div>
                    {loadingComponent}
                    <LoadingComponent message={loadingMessage} />
                </div>
            )
        else return <LoadingComponent message={loadingMessage} />
    } else
        return (
            <div>
                {children}
                {errorMessage && <ErrorDisplayer message={errorMessage} />}
            </div>
        )
}
