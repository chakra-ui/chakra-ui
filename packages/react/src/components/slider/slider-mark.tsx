"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderMarkProps extends HTMLChakraProps<"div"> {
  /**
   * The value of the slider mark
   */
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */

export const SliderMark = forwardRef<HTMLDivElement, SliderMarkProps>(
  function SliderMark(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getMarkerProps(props, ref)}
        className={cx("chakra-slider__marker", props.className)}
        css={[styles.mark, props.css]}
      />
    )
  },
)

SliderMark.displayName = "SliderMark"
