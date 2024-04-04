"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePinInputContext, usePinInputStyles } from "./pin-input-context"

export interface PinInputFieldProps extends HTMLChakraProps<"input"> {
  index: number
}

export const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>(
  function PinInputField(props, ref) {
    const api = usePinInputContext()
    const styles = usePinInputStyles()

    return (
      <chakra.input
        {...api.getInputProps(props, ref)}
        className={cx("chakra-pin-input__field", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)

PinInputField.displayName = "PinInputField"
