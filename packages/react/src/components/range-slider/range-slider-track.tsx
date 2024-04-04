"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderTrack = forwardRef<
  HTMLDivElement,
  RangeSliderTrackProps
>(function RangeSliderTrack(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()

  return (
    <chakra.div
      {...api.getTrackProps(props, ref)}
      className={cx("chakra-slider__track", props.className)}
      css={[styles.track, props.css]}
    />
  )
})

RangeSliderTrack.displayName = "RangeSliderTrack"
