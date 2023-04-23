import { chakra, forwardRef } from "@chakra-ui/system"
import { useStepContext } from "./step-context"

export const StepNumber = forwardRef<{}, "div">(function StepNumber(
  props,
  ref,
) {
  const { children, ...restProps } = props
  const { status, index } = useStepContext()
  return (
    <chakra.div ref={ref} data-status={status} {...restProps}>
      {children || index + 1}
    </chakra.div>
  )
})
