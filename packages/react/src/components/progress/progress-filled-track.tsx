"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useProgressContext, useProgressStyles } from "./progress-context"

export interface ProgressFilledTrackProps extends HTMLChakraProps<"div"> {}

/**
 * ProgressFilledTrack (Linear)
 *
 * The progress component that visually indicates the current level of the progress bar.
 * It applies `background-color` and changes its width.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressFilledTrack = forwardRef<
  HTMLDivElement,
  ProgressFilledTrackProps
>(function ProgressFilledTrack(props, ref) {
  const { style, ...rest } = props

  const styles = useProgressStyles()
  const api = useProgressContext()

  return (
    <chakra.div
      ref={ref}
      style={{ width: `${api.computed.percent}%`, ...style }}
      role="progressbar"
      data-indeterminate={dataAttr(api.indeterminate)}
      aria-valuemax={api.computed.max}
      aria-valuemin={api.computed.min}
      aria-valuenow={api.indeterminate ? undefined : api.computed.value}
      aria-valuetext={api.computed.valueText}
      {...rest}
      css={[styles.filledTrack, props.css]}
      className={cx("chakra-progress__filled-track", props.className)}
    />
  )
})
