"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useRadioGroupStyles, useRadioItemContext } from "./radio-group-context"
import { RadioGroupItemIndicator } from "./radio-group-item-indicator"

export interface RadioGroupItemControlProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemControl = forwardRef<
  HTMLSpanElement,
  RadioGroupItemControlProps
>(function RadioGroupItem(props, ref) {
  const api = useRadioItemContext()
  const styles = useRadioGroupStyles()

  return (
    <chakra.span
      {...api.getControlProps(props, ref)}
      className={cx("chakra-radio__control", props.className)}
      css={[styles.control, props.css]}
    >
      {props.children || <RadioGroupItemIndicator />}
    </chakra.span>
  )
})

RadioGroupItemControl.displayName = "RadioGroupItemControl"
