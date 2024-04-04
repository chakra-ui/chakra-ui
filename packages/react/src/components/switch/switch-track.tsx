"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchTrackProps extends HTMLChakraProps<"span"> {}

export const SwitchTrack = forwardRef<HTMLSpanElement, SwitchTrackProps>(
  function SwitchTrack(props, ref) {
    const styles = useSwitchStyles()
    const api = useSwitchContext()
    return (
      <chakra.span
        {...api.getControlProps(props, ref)}
        className={cx("chakra-switch__track", props.className)}
        css={[styles.track, props.css]}
      />
    )
  },
)

SwitchTrack.displayName = "SwitchTrack"
