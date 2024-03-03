import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepNumberProps extends HTMLChakraProps<"div"> {}

export const StepNumber = forwardRef<StepNumberProps, "div">(
  function StepNumber(props, ref) {
    const { status, index } = useStepContext()
    const styles = useStepperStyles()

    const { children = index + 1, ...restProps } = props

    return (
      <chakra.div
        ref={ref}
        data-status={status}
        css={styles.number}
        {...restProps}
        className={cx("chakra-step__number", props.className)}
      >
        {children}
      </chakra.div>
    )
  },
)
