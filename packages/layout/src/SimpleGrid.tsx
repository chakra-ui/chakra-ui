import { forwardRef, ResponsiveValue } from "@chakra-ui/system"
import { parseResponsiveProp } from "@chakra-ui/utils"
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

const SimpleGrid = forwardRef(
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

export default SimpleGrid

const px = (n: string | number) => (typeof n === "number" ? n + "px" : n)

function widthToColumns(width: any) {
  return parseResponsiveProp(width, val =>
    val == null ? null : `repeat(auto-fit, minmax(${px(val)}, 1fr))`,
  )
}

function countToColumns(count: any) {
  return parseResponsiveProp(count, val =>
    val == null ? null : `repeat(${val}, 1fr)`,
  )
}
