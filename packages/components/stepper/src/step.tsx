import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepProps = HTMLChakraProps<"div">

export function Step(props: StepProps) {
  const { orientation, status } = useStepContext()
  const styles = useStepperStyles()

  return (
    <chakra.div
      data-status={status}
      data-orientation={orientation}
      __css={styles.step}
      {...props}
    />
  )
}
