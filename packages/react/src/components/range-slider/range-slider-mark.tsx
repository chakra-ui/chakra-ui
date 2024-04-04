"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderMarkProps extends HTMLChakraProps<"div"> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */
export const RangeSliderMark = forwardRef<HTMLDivElement, RangeSliderMarkProps>(
  function RangeSliderMark(props, ref) {
    const api = useRangeSliderContext()
    const styles = useRangeSliderStyles()
    return (
      <chakra.div
        {...api.getMarkerProps(props, ref)}
        className={cx("chakra-slider__marker", props.className)}
        css={[styles.mark, props.css]}
      />
    )
  },
)

RangeSliderMark.displayName = "RangeSliderMark"
