import {
  forwardRef,
  getToken,
  ResponsiveValue,
  useTheme,
} from "@chakra-ui/system"
import { mapResponsive } from "@chakra-ui/breakpoint-utils"
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
 * React component that uses the `Grid` component and provides
 * a simpler interface to create responsive grid layouts.
 *
 * Provides props that easily define columns and spacing.
 *
 * @see Docs https://chakra-ui.com/simplegrid
 */
export const SimpleGrid = forwardRef<SimpleGridProps, "div">(
  function SimpleGrid(props, ref) {
    const { columns, spacingX, spacingY, spacing, minChildWidth, ...rest } =
      props

    const theme = useTheme()
    const templateColumns = minChildWidth
      ? widthToColumns(minChildWidth, theme)
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

SimpleGrid.displayName = "SimpleGrid"

function toPx(n: string | number) {
  return typeof n === "number" ? `${n}px` : n
}

function widthToColumns(width: any, theme: Record<string, any>) {
  return mapResponsive(width, (value) => {
    const _value = getToken("sizes", value, toPx(value))(theme)
    return value === null ? null : `repeat(auto-fit, minmax(${_value}, 1fr))`
  })
}

function countToColumns(count: any) {
  return mapResponsive(count, (value) =>
    value === null ? null : `repeat(${value}, minmax(0, 1fr))`,
  )
}
