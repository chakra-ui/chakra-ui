import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra } from "../system"
import { useStepContext, useStepperStyles } from "./step-context"
import { StepIcon } from "./step-icon"
import { StepNumber } from "./step-number"
import { StepStatus } from "./step-status"

export interface StepIndicatorProps extends HTMLChakraProps<"div"> {}

export function StepIndicator(props: StepIndicatorProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return (
    <chakra.div
      data-status={status}
      {...props}
      __css={styles.indicator}
      className={cx("chakra-step__indicator", props.className)}
    />
  )
}

export function StepIndicatorContent() {
  return (
    <StepStatus
      complete={<StepIcon />}
      incomplete={<StepNumber />}
      active={<StepNumber />}
    />
  )
}
