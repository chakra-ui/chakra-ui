"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import { useStatStyles } from "./stat-context"

export interface StatLabelProps extends HTMLChakraProps<"dt"> {}

export const StatLabel = forwardRef<HTMLElement, StatLabelProps>(
  function StatLabel(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dt
        ref={ref}
        {...props}
        className={cx("chakra-stat__label", props.className)}
        css={[styles["label"], props.css]}
      />
    )
  },
)

StatLabel.displayName = "StatLabel"
