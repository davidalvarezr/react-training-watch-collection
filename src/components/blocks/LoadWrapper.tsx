import React, { FunctionComponent, PropsWithChildren, ReactElement } from "react"

const LoadingComponent: FunctionComponent = () => <div>Loading...</div>

type PropTypes = PropsWithChildren<{
    ifTrueShowLoading: boolean
    loadingComponent: FunctionComponent
}>

const defaultProps: PropTypes = {
    ifTrueShowLoading: false,
    loadingComponent: LoadingComponent,
}

export const LoadWrapper = (props: PropTypes) => {
    const { ifTrueShowLoading, loadingComponent, children } = { ...defaultProps, ...props }

    if (ifTrueShowLoading) return loadingComponent
    else return <div>{children}</div>
}
