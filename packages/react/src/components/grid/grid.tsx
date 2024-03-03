import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"

export interface GridOptions {
  /**
   * Shorthand prop for `gridTemplateColumns`
   * @type SystemStyleObject["gridTemplateColumns"]
   */
  templateColumns?: SystemStyleObject["gridTemplateColumns"]
  /**
   * Shorthand prop for `gridGap`
   * @type SystemStyleObject["gridGap"]
   */
  gap?: SystemStyleObject["gridGap"]
  /**
   * Shorthand prop for `gridRowGap`
   * @type SystemStyleObject["gridRowGap"]
   */
  rowGap?: SystemStyleObject["gridRowGap"]
  /**
   * Shorthand prop for `gridColumnGap`
   * @type SystemStyleObject["gridColumnGap"]
   */
  columnGap?: SystemStyleObject["gridColumnGap"]
  /**
   * Shorthand prop for `gridAutoFlow`
   * @type SystemStyleObject["gridAutoFlow"]
   */
  autoFlow?: SystemStyleObject["gridAutoFlow"]
  /**
   * Shorthand prop for `gridAutoRows`
   * @type SystemStyleObject["gridAutoRows"]
   */
  autoRows?: SystemStyleObject["gridAutoRows"]
  /**
   * Shorthand prop for `gridAutoColumns`
   * @type SystemStyleObject["gridAutoColumns"]
   */
  autoColumns?: SystemStyleObject["gridAutoColumns"]
  /**
   * Shorthand prop for `gridTemplateRows`
   * @type SystemStyleObject["gridTemplateRows"]
   */
  templateRows?: SystemStyleObject["gridTemplateRows"]
  /**
   * Shorthand prop for `gridTemplateAreas`
   * @type SystemStyleObject["gridTemplateAreas"]
   */
  templateAreas?: SystemStyleObject["gridTemplateAreas"]
  /**
   * Shorthand prop for `gridColumn`
   * @type SystemStyleObject["gridColumn"]
   */
  column?: SystemStyleObject["gridColumn"]
  /**
   * Shorthand prop for `gridRow`
   * @type SystemStyleObject["gridRow"]
   */
  row?: SystemStyleObject["gridRow"]
}

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
export const Grid = forwardRef<GridProps, "div">(function Grid(props, ref) {
  const {
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

  return <chakra.div ref={ref} css={styles} {...rest} />
})

Grid.displayName = "Grid"
