import React, { ReactNode } from "react"
import { ButtonProps } from "antd/es/button"
import { Button, Tooltip } from "antd"

type PropTypes = ButtonProps & { tooltip: string; children: ReactNode }

export const ButtonWithTooltip: React.FC<PropTypes> = (props: PropTypes) => {
    const { tooltip, children, ...restProps } = props

    return (
        <>
            <Tooltip title={tooltip}>
                <Button {...restProps}>{children}</Button>
            </Tooltip>
        </>
    )
}
