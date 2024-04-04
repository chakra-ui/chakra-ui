"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepNumberProps extends HTMLChakraProps<"div"> {}

export const StepNumber = forwardRef<HTMLDivElement, StepNumberProps>(
  function StepNumber(props, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()

    return (
      <chakra.div
        ref={ref}
        {...api.dataAttrs}
        {...props}
        css={[styles.number, props.css]}
        className={cx("chakra-step__number", props.className)}
      >
        {props.children ?? api.index + 1}
      </chakra.div>
    )
  },
)
