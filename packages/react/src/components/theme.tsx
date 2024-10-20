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
    const {
      appearance,
      style,
      className,
      hasBackground = true,
      ...rest
    } = props
    return (
      <chakra.div
        color="fg"
        bg={hasBackground ? "bg" : undefined}
        colorPalette="gray"
        {...rest}
        className={cx("chakra-theme", appearance, className)}
        style={{ ...style, colorScheme: appearance }}
        ref={ref}
      />
    )
  },
)
