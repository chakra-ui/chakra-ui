import { cx, dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

export interface StepRootProps extends HTMLChakraProps<"div"> {}

export const StepRoot = forwardRef<StepRootProps, "div">(
  function StepRoot(props, ref) {
    const { orientation, status, showLastSeparator } = useStepContext()
    const styles = useStepperStyles()

    return (
      <chakra.div
        ref={ref}
        data-status={status}
        data-orientation={orientation}
        data-stretch={dataAttr(showLastSeparator)}
        css={styles.step}
        {...props}
        className={cx("chakra-step", props.className)}
      />
    )
  },
)
