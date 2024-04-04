"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"
import { CheckboxIndicator } from "./checkbox-indicator"

export interface CheckboxControlProps extends HTMLChakraProps<"span"> {}

export const CheckboxControl = forwardRef<HTMLElement, CheckboxControlProps>(
  function CheckboxControl(props, ref) {
    const { children = <CheckboxIndicator />, ...restProps } = props

    const api = useCheckboxContext()
    const styles = useCheckboxStyles()

    return (
      <chakra.span
        {...api.getControlProps(restProps, ref)}
        css={[styles.control, props.css]}
        className={cx("chakra-checkbox__control", props.className)}
      >
        {children}
      </chakra.span>
    )
  },
)

CheckboxControl.displayName = "CheckboxControl"
