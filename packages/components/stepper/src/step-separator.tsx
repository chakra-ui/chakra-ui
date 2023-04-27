import { cx } from "@chakra-ui/shared-utils"
import { chakra, forwardRef } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export const StepSeparator = forwardRef<{}, "div">(function StepSeparator(
  props,
  ref,
) {
  const { orientation, status, isLast } = useStepContext()
  const styles = useStepperStyles()

  if (isLast) return null

  return (
    <chakra.div
      ref={ref}
      role="separator"
      data-orientation={orientation}
      data-status={status}
      __css={styles.separator}
      {...props}
      className={cx("chakra-step__separator", props.className)}
    />
  )
})
