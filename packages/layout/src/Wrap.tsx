import { chakra, css, PropsOf, SystemProps, useTheme } from "@chakra-ui/system"
import { getValidChildren, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, Ref } from "react"

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
export const Wrap = forwardRef((props: WrapProps, ref: Ref<any>) => {
  const { spacing = 2, children, justify, ...rest } = props

  const theme = useTheme()

  const liSpacing = mapResponsive(spacing, value => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2)`
  })

  const ulSpacing = mapResponsive(spacing, value => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2 * -1)`
  })

  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child, index) => (
    <chakra.li key={index} margin={liSpacing} display="inline-flex">
      {child}
    </chakra.li>
  ))

  return (
    <chakra.div ref={ref} overflow="hidden" {...rest}>
      <chakra.ul
        display="flex"
        flexWrap="wrap"
        justifyContent={justify}
        listStyleType="none"
        padding="0"
        margin={ulSpacing}
        children={clones}
      />
    </chakra.div>
  )
})

if (__DEV__) {
  Wrap.displayName = "Wrap"
}
