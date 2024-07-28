"use client"

import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import { fallbackId } from "./skip-nav-link"

export interface SkipNavContentProps extends HTMLChakraProps<"div"> {}
/**
 * Renders a div as the target for the `SkipNavLink`.
 *
 * @see Docs https://chakra-ui.com/docs/components/skip-nav
 */

export const SkipNavContent = forwardRef<HTMLDivElement, SkipNavContentProps>(
  function SkipNavContent(props, ref) {
    const { id = fallbackId, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        id={id}
        tabIndex={-1}
        style={{ outline: 0 }}
        {...rest}
      />
    )
  },
)
