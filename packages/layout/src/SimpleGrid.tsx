import { ResponsiveValue } from "@chakra-ui/system"
import {
  parseResponsiveProp as responsive,
  isNumber,
  isNull,
} from "@chakra-ui/utils"
import * as React from "react"
import { Grid, GridProps } from "./Grid"

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

type SimpleGridProps = GridProps & SimpleGridOptions

export const SimpleGrid = React.forwardRef(
  (
    {
      columns,
      spacingX,
      spacingY,
      spacing,
      minChildWidth,
      ...props
    }: SimpleGridProps,
    ref: React.Ref<any>,
  ) => {
    const templateColumns = !!minChildWidth
      ? widthToColumns(minChildWidth)
      : countToColumns(columns)

    return (
      <Grid
        ref={ref}
        gap={spacing}
        columnGap={spacingX}
        rowGap={spacingY}
        templateColumns={templateColumns || undefined}
        {...props}
      />
    )
  },
)

const toPx = (n: string | number) => (isNumber(n) ? n + "px" : n)

function widthToColumns(width: any) {
  return responsive(width, val =>
    isNull(val) ? null : `repeat(auto-fit, minmax(${toPx(val)}, 1fr))`,
  )
}

function countToColumns(count: any) {
  return responsive(count, val => (isNull(val) ? null : `repeat(${val}, 1fr)`))
}
