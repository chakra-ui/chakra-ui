import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepItemProps extends HTMLChakraProps<"div"> {}

export const StepItem = forwardRef<StepItemProps, "div">(
  function StepItem(props, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()

    return (
      <chakra.div
        ref={ref}
        {...api.dataAttrs}
        {...props}
        css={[styles.item, props.css]}
        className={cx("chakra-step", props.className)}
      />
    )
  },
)
