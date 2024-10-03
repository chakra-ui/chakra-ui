"use client"

import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../styled-system"
import { cx } from "../utils"

export interface ThemeProps extends HTMLChakraProps<"div"> {
  /**
   * The appearance of the theme.
   */
  appearance?: "light" | "dark"
  /**
   * Whether to apply the theme background and color.
   */
  hasBackground?: boolean
}

export const Theme = forwardRef<HTMLDivElement, ThemeProps>(
  function Theme(props, ref) {
    const { appearance, hasBackground = true, ...rest } = props
    const className = cx("chakra-theme", appearance, rest.className)
    return (
      <chakra.div
        className={className}
        data-has-background={hasBackground ? "" : undefined}
        colorScheme={appearance}
        color={hasBackground ? "fg" : undefined}
        bg={hasBackground ? "bg" : undefined}
        {...rest}
        ref={ref}
      />
    )
  },
)
