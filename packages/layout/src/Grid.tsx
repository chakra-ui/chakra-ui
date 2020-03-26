import React from "react"
import { chakra, PropsOf, ChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type GridProps = PropsOf<typeof chakra.div> & GridOptions

export function Grid(props: GridProps) {
  const { direction, align, justify, wrap, basis, grow, ...rest } = props
  return (
    <chakra.div
      display={"grid"}
      gridArea={props.area}
      gridTemplateAreas={props.templateAreas}
      gridGap={props.gap}
      gridRowGap={props.rowGap}
      gridColumnGap={props.columnGap}
      gridAutoColumns={props.autoColumns}
      gridColumn={props.column}
      gridRow={props.row}
      gridAutoFlow={props.autoFlow}
      gridAutoRows={props.autoRows}
      gridTemplateRows={props.templateRows}
      gridTemplateColumns={props.templateColumns}
      {...rest}
    />
  )
}

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
