"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchLabelProps extends HTMLChakraProps<"label"> {}

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>(
  function SwitchLabel(props, ref) {
    const styles = useSwitchStyles()
    const api = useSwitchContext()

    return (
      <chakra.span
        className="chakra-switch__label"
        {...api.getLabelProps(props, ref)}
        css={[styles.label, props.css]}
      />
    )
  },
)

SwitchLabel.displayName = "SwitchLabel"
