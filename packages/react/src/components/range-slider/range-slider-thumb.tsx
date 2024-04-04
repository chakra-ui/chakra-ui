"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderThumbProps extends HTMLChakraProps<"div"> {
  index: number
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const RangeSliderThumb = forwardRef<
  HTMLDivElement,
  RangeSliderThumbProps
>(function RangeSliderThumb(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()

  return (
    <chakra.div
      {...api.getThumbProps(props, ref)}
      className={cx("chakra-slider__thumb", props.className)}
      css={[styles.thumb, props.css]}
    >
      {props.children}
      {api.name && <input {...api.getInputProps({ index: props.index })} />}
    </chakra.div>
  )
})

RangeSliderThumb.displayName = "RangeSliderThumb"
