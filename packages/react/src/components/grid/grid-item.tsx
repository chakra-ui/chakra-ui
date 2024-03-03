import { compact, mapResponsive } from "@chakra-ui/utils"
import {
  ConditionalValue,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"
import { BoxProps } from "../box/box"

export interface GridItemProps extends BoxProps {
  /**
   * Shorthand prop for `gridArea`
   * @type SystemStyleObject["gridArea"]
   */
  area?: SystemStyleObject["gridArea"]
  /**
   * The number of columns the grid item should `span`.
   * @type ConditionalValue<number | "auto">
   */
  colSpan?: ConditionalValue<number | "auto">
  /**
   * The column number the grid item should start.
   * @type ConditionalValue<number | "auto">
   */
  colStart?: ConditionalValue<number | "auto">
  /**
   * @type ConditionalValue<number | "auto">
   */
  colEnd?: ConditionalValue<number | "auto">
  /**
   * @type ConditionalValue<number | "auto">
   */
  rowStart?: ConditionalValue<number | "auto">
  /**
   * @type ConditionalValue<number | "auto">
   */
  rowEnd?: ConditionalValue<number | "auto">
  /**
   * @type ConditionalValue<number | "auto">
   */
  rowSpan?: ConditionalValue<number | "auto">
}

function spanFn(span?: ConditionalValue<number | "auto">) {
  return mapResponsive(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`,
  )
}

export const GridItem = forwardRef<GridItemProps, "div">(
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

    const styles = compact({
      gridArea: area,
      gridColumn: spanFn(colSpan),
      gridRow: spanFn(rowSpan),
      gridColumnStart: colStart,
      gridColumnEnd: colEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,
    })

    return <chakra.div ref={ref} css={styles} {...rest} />
  },
)

GridItem.displayName = "GridItem"
