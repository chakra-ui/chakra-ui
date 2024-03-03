import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemStyleObject["alignItems"]
   */
  align?: SystemStyleObject["alignItems"]

  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: SystemStyleObject["justifyContent"]

  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemStyleObject["flexWrap"]
   */
  wrap?: SystemStyleObject["flexWrap"]

  /**
   * Shorthand for `flexDirection` style prop
   * @type SystemStyleObject["flexDirection"]
   * @default "row"
   */
  direction?: SystemStyleObject["flexDirection"]

  /**
   * Shorthand for `flexBasis` style prop
   * @type SystemStyleObject["flexBasis"]
   */
  basis?: SystemStyleObject["flexBasis"]

  /**
   * Shorthand for `flexGrow` style prop
   * @type SystemStyleObject["flexGrow"]
   */
  grow?: SystemStyleObject["flexGrow"]

  /**
   * Shorthand for `flexShrink` style prop
   * @type SystemStyleObject["flexShrink"]
   */
  shrink?: SystemStyleObject["flexShrink"]
}

export interface FlexProps extends HTMLChakraProps<"div", FlexOptions> {}

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/flex
 */
export const Flex = forwardRef<FlexProps, "div">(function Flex(props, ref) {
  const { direction, align, justify, wrap, basis, grow, shrink, ...rest } =
    props

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

  return <chakra.div ref={ref} css={styles} {...rest} />
})

Flex.displayName = "Flex"
