"use client"

import { forwardRef, useMemo } from "react"
import {
  type ConditionalValue,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { compact, mapObject } from "../../utils"
import type { BoxProps } from "../box"

export interface GridItemProps extends BoxProps {
  area?: SystemStyleObject["gridArea"] | undefined
  colSpan?: ConditionalValue<number | "auto"> | undefined
  colStart?: ConditionalValue<number | "auto"> | undefined
  colEnd?: ConditionalValue<number | "auto"> | undefined
  rowStart?: ConditionalValue<number | "auto"> | undefined
  rowEnd?: ConditionalValue<number | "auto"> | undefined
  rowSpan?: ConditionalValue<number | "auto"> | undefined
}

function spanFn(span?: ConditionalValue<number | "auto">) {
  return mapObject(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`,
  )
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  function GridItem(props, ref) {
    const {
      area,
      colSpan,
      colStart,
      colEnd,
      rowEnd,
      rowSpan,
      rowStart,
      ...rest
    } = props

    const styles = useMemo(
      () =>
        compact({
          gridArea: area,
          gridColumn: spanFn(colSpan),
          gridRow: spanFn(rowSpan),
          gridColumnStart: colStart,
          gridColumnEnd: colEnd,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd,
        }),
      [area, colSpan, colStart, colEnd, rowEnd, rowSpan, rowStart],
    )

    return <chakra.div ref={ref} css={[styles, props.css]} {...rest} />
  },
)

GridItem.displayName = "GridItem"
