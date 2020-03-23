import React from "react"
import { chakra, useTheme, css, PropsOf, SystemProps } from "@chakra-ui/styled"
import {
  getValidChildren,
  parseResponsiveProp as responsive,
} from "@chakra-ui/utils"

type InlineProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["margin"]
  justify?: SystemProps["justifyContent"]
}

export const Inline = React.forwardRef<any, InlineProps>(
  ({ spacing = 2, children, justify, ...props }, ref) => {
    const theme = useTheme()

    const liSpacing = responsive(spacing, val => {
      //@ts-ignore
      const { margin } = css({ margin: val })(theme)
      return `calc(${margin} / 2)`
    })

    const ulSpacing = responsive(spacing, (val: string) => {
      //@ts-ignore
      const { margin } = css({ margin: val })(theme)
      return `calc(${margin} / 2 * -1)`
    })

    const validChildren = getValidChildren(children)

    const clones = validChildren.map((child, index) => {
      return (
        <chakra.li key={index} margin={liSpacing}>
          {child}
        </chakra.li>
      )
    })

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

export default Inline
