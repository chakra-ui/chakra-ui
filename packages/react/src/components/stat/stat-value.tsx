"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStatStyles } from "./stat-context"

export interface StatValueProps extends HTMLChakraProps<"dd"> {}

export const StatValue = forwardRef<HTMLElement, StatValueProps>(
  function StatValue(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dd
        ref={ref}
        {...props}
        className={cx("chakra-stat__number", props.className)}
        css={[styles.number, props.css]}
      />
    )
  },
)

StatValue.displayName = "StatValue"
