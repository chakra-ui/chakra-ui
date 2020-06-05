import { chakra, css, PropsOf, SystemProps, useTheme } from "@chakra-ui/system"
import { getValidChildren, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type WrapProps = PropsOf<typeof chakra.div> & {
  /**
   * The space between the clustered child elements
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
 * @see Docs https://chakra-ui.com/wrap
 */
export const Wrap = React.forwardRef(
  (props: WrapProps, ref: React.Ref<any>) => {
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
      <chakra.li key={index} margin={itemSpacing} display="inline-flex">
        {child}
      </chakra.li>
    ))

    return (
      <chakra.div ref={ref} {...rest}>
        <chakra.ul
          display="flex"
          flexWrap="wrap"
          justifyContent={justify}
          alignItems={align}
          flexDirection={direction}
          listStyleType="none"
          padding="0"
          margin={groupSpacing}
        >
          {clones}
        </chakra.ul>
      </chakra.div>
    )
  },
)

if (__DEV__) {
  Wrap.displayName = "Wrap"
}
