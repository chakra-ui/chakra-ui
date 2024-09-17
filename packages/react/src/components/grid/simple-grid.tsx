"use client"

import { forwardRef } from "react"
import {
  type ConditionalValue,
  type SystemContext,
  useChakraContext,
} from "../../styled-system"
import { mapObject } from "../../utils"
import { Grid, type GridProps } from "./grid"

interface SimpleGridOptions {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: GridProps["minWidth"]
  /**
   * The number of columns
   */
  columns?: ConditionalValue<number>
}

export interface SimpleGridProps
  extends Omit<GridProps, "columns">,
    SimpleGridOptions {}

/**
 * SimpleGrid
 *
 * React component that uses the `Grid` component and provides
 * a simpler interface to create responsive grid layouts.
 *
 * Provides props that easily define columns and spacing.
 *
 * @see Docs https://chakra-ui.com/simplegrid
 */
export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  function SimpleGrid(props, ref) {
    const { columns, minChildWidth, ...rest } = props

    const sys = useChakraContext()
    const templateColumns = minChildWidth
      ? widthToColumns(minChildWidth, sys)
      : countToColumns(columns)

    return <Grid ref={ref} templateColumns={templateColumns} {...rest} />
  },
)

function toPx(n: string | number) {
  return typeof n === "number" ? `${n}px` : n
}

function widthToColumns(width: any, sys: SystemContext) {
  return mapObject(width, (value) => {
    const _value = sys.tokens.getVar(`sizes.${value}`, toPx(value))
    return value === null ? null : `repeat(auto-fit, minmax(${_value}, 1fr))`
  })
}

function countToColumns(count: any) {
  return mapObject(count, (value) =>
    value === null ? null : `repeat(${value}, minmax(0, 1fr))`,
  )
}
