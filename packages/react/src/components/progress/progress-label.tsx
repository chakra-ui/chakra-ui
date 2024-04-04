"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useProgressStyles } from "./progress-context"

export interface ProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * ProgressLabel is used provide a label for the `Progress` component
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
  function ProgressLabel(props, ref) {
    const styles = useProgressStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        css={[styles.label, props.css]}
        className={cx("chakra-progress__label", props.className)}
      />
    )
  },
)

ProgressLabel.displayName = "ProgressLabel"
