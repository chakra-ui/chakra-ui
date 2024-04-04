"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useProgressStyles } from "./progress-context"

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(
  function ProgressTrack(props, ref) {
    const styles = useProgressStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        css={[styles.track, props.css]}
        className={cx("chakra-progress__track", props.className)}
      />
    )
  },
)

ProgressTrack.displayName = "ProgressTrack"
