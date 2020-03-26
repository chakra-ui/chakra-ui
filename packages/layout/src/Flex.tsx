import React, { forwardRef } from "react"
import { chakra, PropsOf, ChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: ChakraProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: ChakraProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: ChakraProps["flexWrap"]
  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: ChakraProps["flexDirection"]
  /**
   * Shorthand for `flexBasis` style prop
   */
  basis?: ChakraProps["flexBasis"]
  /**
   * Shorthand for `flexGrow` style prop
   */
  grow?: ChakraProps["flexGrow"]
  /**
   * Shorthand for `flexShrink` style prop
   */
  shrink?: ChakraProps["flexShrink"]
}

export type FlexProps = PropsOf<typeof chakra.div> & FlexOptions

/**
 * Flex
 *
 * Used to create flex layouts. It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/flex
 */
export const Flex = forwardRef((props: FlexProps, ref: React.Ref<any>) => {
  const { direction, align, justify, wrap, basis, grow, ...rest } = props
  return (
    <chakra.div
      ref={ref}
      display="flex"
      flexDirection={props.direction}
      alignItems={props.align}
      justifyContent={props.justify}
      flexWrap={props.wrap}
      flexBasis={props.basis}
      flexGrow={props.grow}
      {...rest}
    />
  )
})

if (__DEV__) {
  Flex.displayName = "Flex"
}
