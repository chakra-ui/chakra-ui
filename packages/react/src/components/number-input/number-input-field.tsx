"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useNumberInputContext,
  useNumberInputStyles,
} from "./number-input-context"

export interface NumberInputFieldProps extends HTMLChakraProps<"input"> {}

export const NumberInputField = forwardRef<
  HTMLInputElement,
  NumberInputFieldProps
>(function NumberInputField(props, ref) {
  const api = useNumberInputContext()
  const styles = useNumberInputStyles()

  return (
    <chakra.input
      {...api.getInputProps(props, ref)}
      className={cx("chakra-numberinput__field", props.className)}
      css={[styles.field, props.css]}
    />
  )
})

NumberInputField.displayName = "NumberInputField"
