"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStatStyles } from "./stat-context"

export interface StatHelpTextProps extends HTMLChakraProps<"dd"> {}

export const StatHelpText = forwardRef<HTMLElement, StatHelpTextProps>(
  function StatHelpText(props, ref) {
    const styles = useStatStyles()
    return (
      <chakra.dd
        ref={ref}
        {...props}
        className={cx("chakra-stat__help-text", props.className)}
        css={[styles.helpText, props.css]}
      />
    )
  },
)

StatHelpText.displayName = "StatHelpText"
