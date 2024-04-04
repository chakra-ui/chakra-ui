"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useNumberInputStyles } from "./number-input-context"

export interface NumberInputControlProps extends HTMLChakraProps<"div"> {}

export const NumberInputControl = forwardRef<
  HTMLDivElement,
  NumberInputControlProps
>(function NumberInputControl(props, ref) {
  const styles = useNumberInputStyles()
  return (
    <chakra.div
      ref={ref}
      {...props}
      css={[styles.control, props.css]}
      className={cx("chakra-number-input__control", props.className)}
    />
  )
})

NumberInputControl.displayName = "NumberInputControl"
