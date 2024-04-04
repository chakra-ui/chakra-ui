"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useRadioGroupStyles, useRadioItemContext } from "./radio-group-context"

export interface RadioGroupItemIndicatorProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemIndicator = forwardRef<
  HTMLSpanElement,
  RadioGroupItemIndicatorProps
>(function RadioGroupItemIndicator(props, ref) {
  const styles = useRadioGroupStyles()
  const api = useRadioItemContext()

  return (
    <chakra.span
      {...props}
      ref={ref}
      aria-hidden="true"
      hidden={!api.state.checked}
      className={cx("chakra-radio__indicator", props.className)}
      css={[styles.indicator, props.css]}
    />
  )
})

RadioGroupItemIndicator.displayName = "RadioGroupItemIndicator"
