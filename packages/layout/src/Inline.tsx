import React from "react"
import { chakra, useTheme, css, PropsOf } from "@chakra-ui/system"
import { cleanChildren, parseResponsiveProp } from "@chakra-ui/utils"

type InlineProps = PropsOf<typeof chakra.div> & { spacing?: string | number }

export const Inline = React.forwardRef<any, InlineProps>(
  ({ spacing = 2, children, ...props }, ref) => {
    const theme = useTheme()

    const liSpacing = parseResponsiveProp(spacing, val => {
      const { margin } = css({ margin: val })(theme)
      return `calc(${margin} / 2)`
    })

    const ulSpacing = parseResponsiveProp(spacing, val => {
      const { margin } = css({ margin: val })(theme)
      return `calc(${margin} / 2 * -1)`
    })

    const validChildren = cleanChildren(children)

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
          justifyContent="flex-start"
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
