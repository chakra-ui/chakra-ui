import { chakra, forwardRef } from "@chakra-ui/system"
import { useStepContext, useStepperStyles } from "./step-context"

export const StepNumber = forwardRef<{}, "div">(function StepNumber(
  props,
  ref,
) {
  const { children, ...restProps } = props
  const { status, index } = useStepContext()
  const styles = useStepperStyles()
  return (
    <chakra.div
      ref={ref}
      data-status={status}
      __css={styles.number}
      {...restProps}
    >
      {children || index + 1}
    </chakra.div>
  )
})
