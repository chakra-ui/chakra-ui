import { Responsive } from "@chakra-ui/system"
import { mapResponsive, isNumber, isNull } from "@chakra-ui/utils"
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
  columns?: Responsive<number>
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

const toPx = (n: string | number) => {
  return isNumber(n) ? n + "px" : n
}

const widthToColumns = (width: any) => {
  return mapResponsive(width, value =>
    isNull(value) ? null : `repeat(auto-fit, minmax(${toPx(value)}, 1fr))`,
  )
}

const countToColumns = (count: any) => {
  return mapResponsive(count, value =>
    isNull(value) ? null : `repeat(${value}, 1fr)`,
  )
}
