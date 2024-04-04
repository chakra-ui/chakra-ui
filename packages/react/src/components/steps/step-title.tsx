"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepTitleProps extends HTMLChakraProps<"div"> {}

export const StepTitle = forwardRef<HTMLDivElement, StepTitleProps>(
  function StepTitle(props, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()
    return (
      <chakra.div
        ref={ref}
        {...api.dataAttrs}
        {...props}
        css={[styles.title, props.css]}
        className={cx("chakra-step__title", props.className)}
      />
    )
  },
)
