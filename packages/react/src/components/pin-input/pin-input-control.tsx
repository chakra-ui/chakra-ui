"use client"

import { mergeRefs } from "@chakra-ui/hooks"
import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePinInputContext } from "./pin-input-context"

export interface PinInputControlProps extends HTMLChakraProps<"div"> {}

export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>(
  function PinInputControl(props, ref) {
    const api = usePinInputContext()
    return (
      <chakra.div
        ref={mergeRefs(ref, api.controlRef)}
        {...props}
        className={cx("chakra-pin-input__control", props.className)}
      />
    )
  },
)

PinInputControl.displayName = "PinInputControl"
