import * as React from "react"
import { chakra, PropsOf, ChakraProps, forwardRef } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type GridProps = PropsOf<typeof chakra.div> & GridOptions

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/grid
 */
export const Grid = forwardRef<GridProps>(function Grid(props, ref) {
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

  return (
    <chakra.div
      ref={ref}
      display="grid"
      gridArea={area}
      gridTemplateAreas={templateAreas}
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridAutoColumns={autoColumns}
      gridColumn={column}
      gridRow={row}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      {...rest}
    />
  )
})

if (__DEV__) {
  Grid.displayName = "Grid"
}

export interface GridOptions {
  /**
   * Short hand prop for `gridTemplateColumns`
   */
  templateColumns?: ChakraProps["gridTemplateColumns"]
  /**
   * Short hand prop for `gridGap`
   */
  gap?: ChakraProps["gridGap"]
  /**
   * Short hand prop for `gridRowGap`
   */
  rowGap?: ChakraProps["gridRowGap"]
  /**
   * Short hand prop for `gridColumnGap`
   */
  columnGap?: ChakraProps["gridColumnGap"]
  /**
   * Short hand prop for `gridAutoFlow`
   */
  autoFlow?: ChakraProps["gridAutoFlow"]
  /**
   * Short hand prop for `gridAutoRows`
   */
  autoRows?: ChakraProps["gridAutoRows"]
  /**
   * Short hand prop for `gridAutoColumns`
   */
  autoColumns?: ChakraProps["gridAutoColumns"]
  /**
   * Short hand prop for `gridTemplateRows`
   */
  templateRows?: ChakraProps["gridTemplateRows"]
  /**
   * Short hand prop for `gridTemplateAreas`
   */
  templateAreas?: ChakraProps["gridTemplateAreas"]
  /**
   * Short hand prop for `gridArea`
   */
  area?: ChakraProps["gridArea"]
  /**
   * Short hand prop for `gridColumn`
   */
  column?: ChakraProps["gridColumn"]
  /**
   * Short hand prop for `gridRow`
   */
  row?: ChakraProps["gridRow"]
}
