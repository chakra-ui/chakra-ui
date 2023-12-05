import {
  ResponsiveValue,
  SystemProps,
  forwardRef,
  chakra,
} from "@chakra-ui/system"
import { compact } from "@chakra-ui/object-utils"
import { mapResponsive } from "@chakra-ui/breakpoint-utils"

import { BoxProps } from "./box"

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

export const GridItem = forwardRef<GridItemProps, "div">(function GridItem(
  props,
  ref,
) {
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

  const styles = compact({
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

GridItem.displayName = "GridItem"
