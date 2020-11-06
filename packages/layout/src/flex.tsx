import {
  chakra,
  forwardRef,
  SystemProps,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemProps["alignItems"]
   */
  align?: SystemProps["alignItems"]

  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemProps["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]

  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemProps["flexWrap"]
   */
  wrap?: SystemProps["flexWrap"]

  /**
   * Shorthand for `flexDirection` style prop
   * @type SystemProps["flexDirection"]
   */
  direction?: SystemProps["flexDirection"]

  /**
   * Shorthand for `flexBasis` style prop
   * @type SystemProps["flexBasis"]
   */
  basis?: SystemProps["flexBasis"]

  /**
   * Shorthand for `flexGrow` style prop
   * @type SystemProps["flexGrow"]
   */
  grow?: SystemProps["flexGrow"]

  /**
   * Shorthand for `flexShrink` style prop
   * @type SystemProps["flexShrink"]
   */
  shrink?: SystemProps["flexShrink"]
}

export interface FlexProps extends HTMLChakraProps<"div">, FlexOptions {}

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/flex
 */
export const Flex = forwardRef<FlexProps, "div">(function Flex(props, ref) {
  const {
    direction,
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    ...rest
  } = props

  const styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
  }

  return <chakra.div ref={ref} __css={styles} {...rest} />
})

if (__DEV__) {
  Flex.displayName = "Flex"
}
