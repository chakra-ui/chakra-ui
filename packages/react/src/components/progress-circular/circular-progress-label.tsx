"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface CircularProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * CircularProgress component label. In most cases it is a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = forwardRef<
  HTMLDivElement,
  CircularProgressLabelProps
>(function CircularProgressLabel(props, ref) {
  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx("chakra-progress__label", props.className)}
    />
  )
})

CircularProgressLabel.displayName = "CircularProgressLabel"
