"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderValueTextProps extends HTMLChakraProps<"span"> {}

export const SliderValueText = forwardRef<
  HTMLSpanElement,
  SliderValueTextProps
>(function SliderValueText(props, ref) {
  const api = useSliderContext()
  const styles = useSliderStyles()
  return (
    <chakra.span
      ref={ref}
      {...props}
      className={cx("chakra-slider__valuetext", props.className)}
      css={[styles.valueText, props.css]}
    >
      {props.children ?? api.state.value}
    </chakra.span>
  )
})

SliderValueText.displayName = "SliderValueText"
