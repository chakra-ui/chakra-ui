import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepProps = HTMLChakraProps<"div">

export const Step = forwardRef<{}, "div">(function Step(props, ref) {
  const { orientation, status } = useStepContext()
  const styles = useStepperStyles()

  return (
    <chakra.div
      ref={ref}
      data-status={status}
      data-orientation={orientation}
      __css={styles.step}
      {...props}
    />
  )
})
