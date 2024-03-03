import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepSeparatorProps extends HTMLChakraProps<"div"> {}

export const StepSeparator = forwardRef<StepSeparatorProps, "div">(
  function StepSeparator(props, ref) {
    const { orientation, status, isLast, showLastSeparator } = useStepContext()
    const styles = useStepperStyles()

    if (isLast && !showLastSeparator) return null

    return (
      <chakra.div
        ref={ref}
        role="separator"
        data-orientation={orientation}
        data-status={status}
        css={styles.separator}
        {...props}
        className={cx("chakra-step__separator", props.className)}
      />
    )
  },
)
