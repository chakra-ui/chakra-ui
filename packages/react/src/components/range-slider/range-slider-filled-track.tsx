"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderFilledTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderFilledTrack = forwardRef<
  HTMLDivElement,
  RangeSliderFilledTrackProps
>(function RangeSliderFilledTrack(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()
  const trackProps = api.getInnerTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className={cx("chakra-slider__filled-track", props.className)}
      css={[styles.filledTrack, props.css]}
    />
  )
})

RangeSliderFilledTrack.displayName = "RangeSliderFilledTrack"
