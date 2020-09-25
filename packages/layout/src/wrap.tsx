import {
  chakra,
  css,
  forwardRef,
  PropsOf,
  SystemProps,
  useTheme,
} from "@chakra-ui/system"
import { getValidChildren, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface WrapProps extends PropsOf<typeof chakra.div> {
  /**
   * The space between the each child (even if it wraps)
   */
  spacing?: SystemProps["margin"]
  /**
   * The `justify-content` value (for cross-axis alignment)
   */
  justify?: SystemProps["justifyContent"]
  /**
   * The `align-items` value (for main axis alignment)
   */
  align?: SystemProps["alignItems"]
  /**
   * The `flex-direction` value
   */
  direction?: SystemProps["flexDirection"]
}

/**
 * Layout component used to stack elements that differ in length
 * and are liable to wrap.
 *
 * Common use cases:
 * - Buttons that appear together at the end of forms
 * - Lists of tags and chips
 *
 * @see Docs https://chakra-ui.com/components/wrap
 */
export const Wrap = forwardRef<WrapProps, "div">(function Wrap(props, ref) {
  const {
    spacing = "0.5rem",
    children,
    justify,
    direction,
    align,
    ...rest
  } = props

  const theme = useTheme()

  const itemSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2)`
  })

  const groupSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2 * -1)`
  })

  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child, index) => (
    <chakra.li key={index} margin={itemSpacing}>
      {child}
    </chakra.li>
  ))

  const styles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction,
    listStyleType: "none",
    padding: "0",
    margin: groupSpacing,
  }

  return (
    <chakra.div ref={ref} {...rest}>
      <chakra.ul __css={styles}>{clones}</chakra.ul>
    </chakra.div>
  )
})

if (__DEV__) {
  Wrap.displayName = "Wrap"
}
