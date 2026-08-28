"use client"

import { forwardRef } from "react"
import { center } from "../../../styled-system-panda/patterns"
import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface CenterProps extends HTMLChakraProps<"div"> {
  inline?: boolean | undefined
}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/docs/components/center
 */
export const Center = forwardRef<HTMLDivElement, CenterProps>(
  function Center(props, ref) {
    const { inline, css: cssProp, ...rest } = props
    return (
      <chakra.div ref={ref} {...rest} css={[center.raw({ inline }), cssProp]} />
    )
  },
)

Center.displayName = "Center"
