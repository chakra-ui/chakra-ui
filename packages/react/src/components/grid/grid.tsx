"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"

export interface GridOptions {
  templateColumns?: SystemStyleObject["gridTemplateColumns"]
  autoFlow?: SystemStyleObject["gridAutoFlow"]
  autoRows?: SystemStyleObject["gridAutoRows"]
  autoColumns?: SystemStyleObject["gridAutoColumns"]
  templateRows?: SystemStyleObject["gridTemplateRows"]
  templateAreas?: SystemStyleObject["gridTemplateAreas"]
  column?: SystemStyleObject["gridColumn"]
  row?: SystemStyleObject["gridRow"]
  inline?: boolean
}

export interface GridProps
  extends Omit<HTMLChakraProps<"div">, keyof GridOptions>,
    GridOptions {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  function Grid(props, ref) {
    const {
      templateAreas,
      column,
      row,
      autoFlow,
      autoRows,
      templateRows,
      autoColumns,
      templateColumns,
      inline,
      ...rest
    } = props

    return (
      <chakra.div
        {...rest}
        ref={ref}
        css={[
          {
            display: inline ? "inline-grid" : "grid",
            gridTemplateAreas: templateAreas,
            gridAutoColumns: autoColumns,
            gridColumn: column,
            gridRow: row,
            gridAutoFlow: autoFlow,
            gridAutoRows: autoRows,
            gridTemplateRows: templateRows,
            gridTemplateColumns: templateColumns,
          },
          props.css,
        ]}
      />
    )
  },
)
