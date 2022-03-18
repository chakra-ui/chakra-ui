import {
  chakra,
  forwardRef,
  ResponsiveValue,
  SystemProps,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { filterUndefined, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { BoxProps } from "./box"

export interface GridProps
  extends Omit<HTMLChakraProps<"div">, keyof GridOptions>,
    GridOptions {}

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/grid
 */
export const Grid = forwardRef<GridProps, "div">((props, ref) => {
  const {
    area,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns,
    ...rest
  } = props

  const styles = {
    display: "grid",
    gridArea: area,
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns,
  }

  return <chakra.div ref={ref} __css={styles} {...rest} />
})

if (__DEV__) {
  Grid.displayName = "Grid"
}

export interface GridOptions {
  /**
   * Shorthand prop for `gridTemplateColumns`
   * @type SystemProps["gridTemplateColumns"]
   */
  templateColumns?: SystemProps["gridTemplateColumns"]
  /**
   * Shorthand prop for `gridGap`
   * @type SystemProps["gridGap"]
   */
  gap?: SystemProps["gridGap"]
  /**
   * Shorthand prop for `gridRowGap`
   * @type SystemProps["gridRowGap"]
   */
  rowGap?: SystemProps["gridRowGap"]
  /**
   * Shorthand prop for `gridColumnGap`
   * @type SystemProps["gridColumnGap"]
   */
  columnGap?: SystemProps["gridColumnGap"]
  /**
   * Shorthand prop for `gridAutoFlow`
   * @type SystemProps["gridAutoFlow"]
   */
  autoFlow?: SystemProps["gridAutoFlow"]
  /**
   * Shorthand prop for `gridAutoRows`
   * @type SystemProps["gridAutoRows"]
   */
  autoRows?: SystemProps["gridAutoRows"]
  /**
   * Shorthand prop for `gridAutoColumns`
   * @type SystemProps["gridAutoColumns"]
   */
  autoColumns?: SystemProps["gridAutoColumns"]
  /**
   * Shorthand prop for `gridTemplateRows`
   * @type SystemProps["gridTemplateRows"]
   */
  templateRows?: SystemProps["gridTemplateRows"]
  /**
   * Shorthand prop for `gridTemplateAreas`
   * @type SystemProps["gridTemplateAreas"]
   */
  templateAreas?: SystemProps["gridTemplateAreas"]
  /**
   * Shorthand prop for `gridArea`
   * @type SystemProps["gridArea"]
   * @deprecated
   * Use `GridItem` with the `area` prop instead. Will be removed in a future
   * version.
   */
  area?: SystemProps["gridArea"]
  /**
   * Shorthand prop for `gridColumn`
   * @type SystemProps["gridColumn"]
   */
  column?: SystemProps["gridColumn"]
  /**
   * Shorthand prop for `gridRow`
   * @type SystemProps["gridRow"]
   */
  row?: SystemProps["gridRow"]
}

export interface GridItemProps extends BoxProps {
  /**
   * Shorthand prop for `gridArea`
   * @type SystemProps["gridArea"]
   */
  area?: SystemProps["gridArea"]
  /**
   * The number of columns the grid item should `span`.
   * @type ResponsiveValue<number | "auto">
   */
  colSpan?: ResponsiveValue<number | "auto">
  /**
   * The column number the grid item should start.
   * @type ResponsiveValue<number | "auto">
   */
  colStart?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  colEnd?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowStart?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowEnd?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowSpan?: ResponsiveValue<number | "auto">
}

function spanFn(span?: ResponsiveValue<number | "auto">) {
  return mapResponsive(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`,
  )
}

export const GridItem = forwardRef<GridItemProps, "div">((props, ref) => {
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

  const styles = filterUndefined({
    gridArea: area,
    gridColumn: spanFn(colSpan),
    gridRow: spanFn(rowSpan),
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
  })

  return <chakra.div ref={ref} __css={styles} {...rest} />
})
