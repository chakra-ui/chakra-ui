"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchThumbProps extends HTMLChakraProps<"span"> {}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  function SwitchThumb(props, ref) {
    const styles = useSwitchStyles()
    const { getIndicatorProps } = useSwitchContext()

    return (
      <chakra.span
        {...getIndicatorProps(props, ref)}
        css={[styles.thumb, props.css]}
        className={cx("chakra-switch__thumb", props.className)}
      />
    )
  },
)

SwitchThumb.displayName = "SwitchThumb"
