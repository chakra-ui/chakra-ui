import * as React from "react"
import { chakra, SystemProps, forwardRef, PropsOf } from "@chakra-ui/system"
import { filterUndefined, __DEV__ } from "@chakra-ui/utils"

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

export interface FlexProps extends PropsOf<typeof chakra.div>, FlexOptions {}

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/flex
 */
export const Flex = forwardRef<FlexProps, "div">(function Flex(props, ref) {
  const { direction, align, justify, wrap, basis, grow, ...rest } = props

  const styles = filterUndefined({
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
  })

  return <chakra.div ref={ref} __css={styles} {...rest} />
})

if (__DEV__) {
  Flex.displayName = "Flex"
}
