"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderControlProps extends HTMLChakraProps<"div"> {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(
  function SliderControl(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getControlProps(props, ref)}
        className={cx("chakra-slider__control", props.className)}
        css={[styles.control, props.css]}
      />
    )
  },
)

SliderControl.displayName = "SliderControl"
