"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderValueTextProps extends HTMLChakraProps<"span"> {}

export const RangeSliderValueText = forwardRef<
  HTMLSpanElement,
  RangeSliderValueTextProps
>(function RangeSliderValueText(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()
  return (
    <chakra.span
      ref={ref}
      {...props}
      className={cx("chakra-slider__valuetext", props.className)}
      css={[styles.valueText, props.css]}
    >
      {props.children ?? api.state.value.join(" - ")}
    </chakra.span>
  )
})

RangeSliderValueText.displayName = "RangeSliderValueText"
