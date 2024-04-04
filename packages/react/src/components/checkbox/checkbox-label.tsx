"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"

export interface CheckboxLabelProps extends HTMLChakraProps<"span"> {}

export const CheckboxLabel = forwardRef<HTMLElement, CheckboxLabelProps>(
  function CheckboxLabel(props, ref) {
    const api = useCheckboxContext()
    const styles = useCheckboxStyles()

    return (
      <chakra.span
        {...api.getLabelProps(props, ref)}
        className={cx("chakra-checkbox__label", props.className)}
        css={[styles.label, props.css]}
      />
    )
  },
)

CheckboxLabel.displayName = "CheckboxLabel"
