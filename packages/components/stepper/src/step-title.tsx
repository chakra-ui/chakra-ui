import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepTitleProps = HTMLChakraProps<"h5">

export function StepTitle(props: StepTitleProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return <chakra.h5 data-status={status} {...props} __css={styles.title} />
}
