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

export interface GridProps extends HTMLChakraProps<"div">, GridOptions {}

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/grid
 */
export const Grid = forwardRef<GridProps, "div">(function Grid(props, ref) {
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
   * Short hand prop for `gridTemplateColumns`
   */
  templateColumns?: SystemProps["gridTemplateColumns"]
  /**
   * Short hand prop for `gridGap`
   */
  gap?: SystemProps["gridGap"]
  /**
   * Short hand prop for `gridRowGap`
   */
  rowGap?: SystemProps["gridRowGap"]
  /**
   * Short hand prop for `gridColumnGap`
   */
  columnGap?: SystemProps["gridColumnGap"]
  /**
   * Short hand prop for `gridAutoFlow`
   */
  autoFlow?: SystemProps["gridAutoFlow"]
  /**
   * Short hand prop for `gridAutoRows`
   */
  autoRows?: SystemProps["gridAutoRows"]
  /**
   * Short hand prop for `gridAutoColumns`
   */
  autoColumns?: SystemProps["gridAutoColumns"]
  /**
   * Short hand prop for `gridTemplateRows`
   */
  templateRows?: SystemProps["gridTemplateRows"]
  /**
   * Short hand prop for `gridTemplateAreas`
   */
  templateAreas?: SystemProps["gridTemplateAreas"]
  /**
   * Short hand prop for `gridArea`
   */
  area?: SystemProps["gridArea"]
  /**
   * Short hand prop for `gridColumn`
   */
  column?: SystemProps["gridColumn"]
  /**
   * Short hand prop for `gridRow`
   */
  row?: SystemProps["gridRow"]
}

export interface GridItemProps extends BoxProps {
  /**
   * The number of columns the grid item should `span`.
   */
  colSpan?: ResponsiveValue<number | "auto">
  /**
   * The column number the grid item should start.
   */
  colStart?: ResponsiveValue<number | "auto">
  colEnd?: ResponsiveValue<number | "auto">
  rowStart?: ResponsiveValue<number | "auto">
  rowEnd?: ResponsiveValue<number | "auto">
  rowSpan?: ResponsiveValue<number | "auto">
}

function spanFn(span?: ResponsiveValue<number | "auto">) {
  return mapResponsive(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`,
  )
}

export const GridItem = forwardRef<GridItemProps, "div">(function GridItem(
  props,
  ref,
) {
  const {
    colSpan,
    colStart,
    colEnd,
    rowEnd,
    rowSpan,
    rowStart,
    ...rest
  } = props

  const styles = filterUndefined({
    gridColumn: spanFn(colSpan),
    gridRow: spanFn(rowSpan),
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
  })

  return <chakra.div ref={ref} __css={styles} {...rest} />
})
