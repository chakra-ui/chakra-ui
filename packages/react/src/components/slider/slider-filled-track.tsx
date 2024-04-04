"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderFilledTrackProps extends HTMLChakraProps<"div"> {}

export const SliderFilledTrack = forwardRef<
  HTMLDivElement,
  SliderFilledTrackProps
>(function SliderFilledTrack(props, ref) {
  const api = useSliderContext()
  const styles = useSliderStyles()
  return (
    <chakra.div
      {...api.getInnerTrackProps(props, ref)}
      className={cx("chakra-slider__filled-track", props.className)}
      css={[styles.filledTrack, props.css]}
    />
  )
})

SliderFilledTrack.displayName = "SliderFilledTrack"
