"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderTrackProps extends HTMLChakraProps<"div"> {}

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  function SliderTrack(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getTrackProps(props, ref)}
        className={cx("chakra-slider__track", props.className)}
        css={[styles.track, props.css]}
      />
    )
  },
)

SliderTrack.displayName = "SliderTrack"
