"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepDescriptionProps extends HTMLChakraProps<"div"> {}

export const StepDescription = forwardRef<HTMLDivElement, StepDescriptionProps>(
  function StepDescription(props, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()
    return (
      <chakra.div
        ref={ref}
        {...api.dataAttrs}
        {...props}
        className={cx("chakra-step__description", props.className)}
        css={[styles.description, props.css]}
      />
    )
  },
)
