import * as React from "react"
import { chakra, PropsOf, SystemProps, forwardRef } from "@chakra-ui/system/src"
import { __DEV__ } from "@chakra-ui/utils/src"

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: SystemProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: SystemProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: SystemProps["flexWrap"]
  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: SystemProps["flexDirection"]
  /**
   * Shorthand for `flexBasis` style prop
   */
  basis?: SystemProps["flexBasis"]
  /**
   * Shorthand for `flexGrow` style prop
   */
  grow?: SystemProps["flexGrow"]
  /**
   * Shorthand for `flexShrink` style prop
   */
  shrink?: SystemProps["flexShrink"]
}

export type FlexProps = PropsOf<typeof chakra.div> & FlexOptions

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/flex
 */
export const Flex = forwardRef<FlexProps>(function Flex(props, ref) {
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
