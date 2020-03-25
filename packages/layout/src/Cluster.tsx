import { chakra, css, PropsOf, SystemProps, useTheme } from "@chakra-ui/system"
import { getValidChildren, mapResponsive } from "@chakra-ui/utils"
import React from "react"

export type ClusterProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["margin"]
  justify?: SystemProps["justifyContent"]
}

export const Cluster = React.forwardRef<any, ClusterProps>(
  ({ spacing = 2, children, justify, ...props }, ref) => {
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
      <chakra.div ref={ref} overflow="hidden" {...props}>
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
  },
)
