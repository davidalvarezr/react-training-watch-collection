import React, { PropsWithChildren, ReactNode } from "react"
import { ErrorDisplayer, ErrorMessage } from "~/src/components/blocks/ErrorDisplayer"
import { LoadingOutlined } from "@ant-design/icons"
import { Simulate } from "react-dom/test-utils"

type LoadingComponentProps = { message?: string }

const loadingComponentDefaultProps: LoadingComponentProps = {
    message: "Loading...",
}

const LoadingComponent: React.FC<LoadingComponentProps> = (props: LoadingComponentProps) => {
    const { message } = { ...loadingComponentDefaultProps, ...props }
    return <div>{message}</div>
}

const DefaultLoadingComponent = () => {
    return <LoadingOutlined style={{ fontSize: "32px" }} />
}

type PropTypes = PropsWithChildren<{
    isLoading: boolean
    loadingComponent?: ReactNode
    loadingMessage?: string
    errorMessage?: ErrorMessage
    noLoadingAnimation?: boolean
}>

const defaultProps: PropTypes = {
    isLoading: false,
    loadingMessage: "Loading...",
    noLoadingAnimation: false,
}

/**
 * Wrap a component and replaces it by a "loading" message or component
 * Also displays an error message if the "errorMessage" prop contains something
 * @param props
 * @constructor
 */
export const LoadWrapper: React.FC<PropTypes> = (props: PropTypes) => {
    const {
        isLoading,
        loadingComponent,
        loadingMessage,
        errorMessage,
        noLoadingAnimation,
        children,
    } = {
        ...defaultProps,
        ...props,
    }

    if (isLoading) {
        if (loadingComponent) {
            const CustomLoadingComponent = loadingComponent

            // console.log("in here")

            return (
                <div>
                    {/*@ts-ignore*/}
                    <CustomLoadingComponent />
                </div>
            )
        } else {
            return (
                <div>
                    {!noLoadingAnimation && <DefaultLoadingComponent />}
                    <LoadingComponent message={loadingMessage} />
                </div>
            )
        }
    } else
        return (
            <div>
                {children}
                {errorMessage && <ErrorDisplayer message={errorMessage} />}
            </div>
        )
}
