"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderLabelProps extends HTMLChakraProps<"label"> {}

export const RangeSliderLabel = forwardRef<
  HTMLLabelElement,
  RangeSliderLabelProps
>(function RangeSliderLabel(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()
  return (
    <chakra.label
      {...api.getLabelProps(props, ref)}
      className={cx("chakra-slider__label", props.className)}
      css={[styles.label, props.css]}
    />
  )
})

RangeSliderLabel.displayName = "RangeSliderLabel"
