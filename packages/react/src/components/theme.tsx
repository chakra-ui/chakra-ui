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
    return (
      <chakra.div
        className={cx("chakra-theme", appearance, rest.className)}
        data-has-background={hasBackground ? "" : undefined}
        colorScheme={appearance}
        color="fg"
        bg={hasBackground ? "bg" : undefined}
        {...rest}
        ref={ref}
      />
    )
  },
)
