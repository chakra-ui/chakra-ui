import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export type StepTitleProps = HTMLChakraProps<"h3">

export const StepTitle = forwardRef<{}, "h3">(function StepTitle(
  props: StepTitleProps,
  ref,
) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return (
    <chakra.h3
      ref={ref}
      data-status={status}
      {...props}
      __css={styles.title}
      className={cx("chakra-step__title", props.className)}
    />
  )
})
