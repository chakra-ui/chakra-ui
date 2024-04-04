"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderControlProps extends HTMLChakraProps<"div"> {}

export const RangeSliderControl = forwardRef<
  HTMLDivElement,
  RangeSliderControlProps
>(function RangeSliderControl(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()
  return (
    <chakra.div
      {...api.getControlProps(props, ref)}
      className={cx("chakra-slider__control", props.className)}
      css={[styles.control, props.css]}
    />
  )
})

RangeSliderControl.displayName = "RangeSliderControl"
