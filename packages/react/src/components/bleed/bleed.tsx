"use client"

import { isCssUnit, isCssVar, mapResponsive } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, SystemStyleObject, chakra } from "../../styled-system"

export interface BleedProps extends HTMLChakraProps<"div"> {
  /**
   * The negative margin on the x-axis
   */
  inline?: SystemStyleObject["marginInline"]
  /**
   * The negative margin on the y-axis
   */
  block?: SystemStyleObject["marginBlock"]
}

const valueFn = (v: string) =>
  isCssUnit(v) || isCssVar(v) ? v : `space.${v}, ${v}`

export const Bleed = forwardRef<HTMLDivElement, BleedProps>(
  function Bleed(props, ref) {
    const { inline, block, ...rest } = props

    return (
      <chakra.div
        ref={ref}
        {...rest}
        css={{
          "--bleed-x": mapResponsive(inline, valueFn),
          "--bleed-y": mapResponsive(block, valueFn),
          marginInline: "calc(var(--bleed-x, 0) * -1)",
          marginBlock: "calc(var(--bleed-y, 0) * -1)",
        }}
      />
    )
  },
)

Bleed.displayName = "Bleed"
