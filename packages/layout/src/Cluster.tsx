import { chakra, css, PropsOf, SystemProps, useTheme } from "@chakra-ui/system"
import { getValidChildren, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import React, { forwardRef } from "react"

export type ClusterProps = PropsOf<typeof chakra.div> & {
  /**
   * The space between the clustered child elements
   */
  spacing?: SystemProps["margin"]
  /**
   * The `justify-content` value (for horizontal alignment)
   */
  justify?: SystemProps["justifyContent"]
}

/**
 * Cluster
 *
 * Layout component used to stack elements that differ in length
 * and are liable to wrap.
 *
 * Common use cases:
 * - Buttons that appear together at the end of forms
 * - Lists of tags, keywords, or other meta information.
 *
 * @see Docs https://chakra-ui.com/cluster
 */
export const Cluster = forwardRef<any, ClusterProps>((props, ref) => {
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
    <chakra.li key={index} margin={liSpacing}>
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
      >
        {clones}
      </chakra.ul>
    </chakra.div>
  )
})

if (__DEV__) {
  Cluster.displayName = "Cluster"
}
