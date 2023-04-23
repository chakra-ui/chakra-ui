import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepIndicatorProps = HTMLChakraProps<"div">

export function StepIndicator(props: StepIndicatorProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return <chakra.div data-status={status} {...props} __css={styles.indicator} />
}
