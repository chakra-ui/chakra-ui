"use client"

import { center } from "@chakra-ui/styled-system/patterns"
import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface CenterProps extends HTMLChakraProps<"div"> {
  inline?: boolean | undefined
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  function Center(props, ref) {
    const { inline, css: cssProp, ...rest } = props
    return (
      <chakra.div ref={ref} {...rest} css={[center.raw({ inline }), cssProp]} />
    )
  },
)

Center.displayName = "Center"
