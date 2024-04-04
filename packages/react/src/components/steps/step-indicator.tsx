"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"
import { StepIcon } from "./step-icon"
import { StepNumber } from "./step-number"
import { StepStatus } from "./step-status"

export interface StepIndicatorProps extends HTMLChakraProps<"div"> {}

export function StepIndicator(props: StepIndicatorProps) {
  const api = useStepContext()
  const styles = useStepperStyles()
  return (
    <chakra.div
      {...api.dataAttrs}
      {...props}
      css={[styles.indicator, props.css]}
      className={cx("chakra-step__indicator", props.className)}
    >
      {props.children ?? (
        <StepStatus
          completed={<StepIcon />}
          incomplete={<StepNumber />}
          current={<StepNumber />}
        />
      )}
    </chakra.div>
  )
}
