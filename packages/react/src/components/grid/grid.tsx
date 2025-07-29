"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"

export interface GridBaseProps {
  templateColumns?: SystemStyleObject["gridTemplateColumns"] | undefined
  autoFlow?: SystemStyleObject["gridAutoFlow"] | undefined
  autoRows?: SystemStyleObject["gridAutoRows"] | undefined
  autoColumns?: SystemStyleObject["gridAutoColumns"] | undefined
  templateRows?: SystemStyleObject["gridTemplateRows"] | undefined
  templateAreas?: SystemStyleObject["gridTemplateAreas"] | undefined
  column?: SystemStyleObject["gridColumn"] | undefined
  row?: SystemStyleObject["gridRow"] | undefined
  inline?: boolean | undefined
}

export interface GridProps extends HTMLChakraProps<"div", GridBaseProps> {}

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
