"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepSeparatorProps extends HTMLChakraProps<"div"> {}

export const StepSeparator = forwardRef<HTMLDivElement, StepSeparatorProps>(
  function StepSeparator(props, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()

    return (
      <chakra.div
        ref={ref}
        role="separator"
        {...api.dataAttrs}
        {...props}
        css={[styles.separator, props.css]}
        className={cx("chakra-step__separator", props.className)}
      />
    )
  },
)
