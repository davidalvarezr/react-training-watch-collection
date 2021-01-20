import { Breakpoint } from "antd/es/_util/responsiveObserve"
import { ColProps, RowProps } from "antd/es/grid"
import { CSSProperties } from "react"

const FORM_H_PADDING = 16
const FORM_V_PADDING = 8

const rowProps = (br: Partial<Record<Breakpoint, boolean>>): RowProps => ({
    align: "middle",
    gutter: FORM_H_PADDING,
    justify: br.xs ? "start" : "center",
})

const rowStyle: CSSProperties = {
    paddingBottom: `${FORM_V_PADDING}px`,
}

const labelColProps: ColProps = {
    flex: "100px",
}

const labelColStyle = (bp: Partial<Record<Breakpoint, boolean>>): CSSProperties => ({
    textAlign: bp.xs ? "left" : "right",
})

const inputColProps: ColProps = {
    xs: 24,
    sm: 16,
    md: 12,
    lg: 10,
    xl: 8,
}

export { rowProps, rowStyle, labelColProps, labelColStyle, inputColProps }
