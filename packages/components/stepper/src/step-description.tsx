import { chakra } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepDescriptionProps = {
  children: React.ReactNode
}

export function StepDescription(props: StepDescriptionProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return <chakra.p data-status={status} {...props} __css={styles.description} />
}
