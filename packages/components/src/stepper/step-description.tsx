import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepDescriptionProps extends HTMLChakraProps<"p"> {}

export const StepDescription = forwardRef<{}, "p">(function StepDescription(
  props: StepDescriptionProps,
  ref,
) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return (
    <chakra.p
      ref={ref}
      data-status={status}
      {...props}
      className={cx("chakra-step__description", props.className)}
      __css={styles.description}
    />
  )
})
