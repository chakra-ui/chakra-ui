import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepDescriptionProps extends HTMLChakraProps<"div"> {}

export const StepDescription = forwardRef<StepDescriptionProps, "div">(
  function StepDescription(props: StepDescriptionProps, ref) {
    const api = useStepContext()
    const styles = useStepperStyles()
    return (
      <chakra.div
        ref={ref}
        {...api.dataAttrs}
        {...props}
        className={cx("chakra-step__description", props.className)}
        css={[styles.description, props.css]}
      />
    )
  },
)
