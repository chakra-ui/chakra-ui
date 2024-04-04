"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderLabelProps extends HTMLChakraProps<"label"> {}

export const SliderLabel = forwardRef<HTMLDivElement, SliderLabelProps>(
  function SliderLabel(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.label
        {...api.getLabelProps(props, ref)}
        className={cx("chakra-slider__label", props.className)}
        css={[styles.label, props.css]}
      />
    )
  },
)

SliderLabel.displayName = "SliderLabel"
