"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import { useFieldContext } from "./field-context"

export interface RequiredIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

export const RequiredIndicator = forwardRef<
  HTMLSpanElement,
  RequiredIndicatorProps
>(function RequiredIndicator(props, ref) {
  const { fallback, children = "*", ...restProps } = props

  const field = useFieldContext()
  if (!field?.required) return fallback

  return (
    <chakra.span
      ref={ref}
      aria-hidden="true"
      marginStart="2"
      {...restProps}
      className={cx("chakra-required-indicator", restProps.className)}
    >
      {children}
    </chakra.span>
  )
})
