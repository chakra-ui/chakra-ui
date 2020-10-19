import { ResponsiveValue, forwardRef } from "@chakra-ui/system"
import { mapResponsive, isNumber, isNull, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Grid, GridProps } from "./grid"

interface SimpleGridOptions {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: GridProps["minWidth"]
  /**
   * The number of columns
   */
  columns?: ResponsiveValue<number>
  /**
   * The gap between the grid items
   */
  spacing?: GridProps["gridGap"]
  /**
   * The column gap between the grid items
   */
  spacingX?: GridProps["gridGap"]
  /**
   * The row gap between the grid items
   */
  spacingY?: GridProps["gridGap"]
}

export interface SimpleGridProps extends GridProps, SimpleGridOptions {}

/**
 * SimpleGrid
 *
 * React component make that providers a simpler interface, and
 * make its easy to create responsive grid layouts.
 *
 * @see Docs https://chakra-ui.com/components/simplegrid
 */
export const SimpleGrid = forwardRef<SimpleGridProps, "div">(
  function SimpleGrid(props, ref) {
    const {
      columns,
      spacingX,
      spacingY,
      spacing,
      minChildWidth,
      ...rest
    } = props

    const templateColumns = minChildWidth
      ? widthToColumns(minChildWidth)
      : countToColumns(columns)

    return (
      <Grid
        ref={ref}
        gap={spacing}
        columnGap={spacingX}
        rowGap={spacingY}
        templateColumns={templateColumns}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  SimpleGrid.displayName = "SimpleGrid"
}

function toPx(n: string | number) {
  return isNumber(n) ? `${n}px` : n
}

function widthToColumns(width: any) {
  return mapResponsive(width, (value) =>
    isNull(value) ? null : `repeat(auto-fit, minmax(${toPx(value)}, 1fr))`,
  )
}

function countToColumns(count: any) {
  return mapResponsive(count, (value) =>
    isNull(value) ? null : `repeat(${value}, 1fr)`,
  )
}
