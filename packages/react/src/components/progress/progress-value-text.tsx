import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useProgressContext, useProgressStyles } from "./progress-context"

export interface ProgressValueTextProps extends HTMLChakraProps<"span"> {}

export const ProgressValueText = forwardRef<ProgressValueTextProps, "span">(
  function ProgressValueText(props, ref) {
    const api = useProgressContext()
    const styles = useProgressStyles()

    return (
      <chakra.span
        ref={ref}
        {...props}
        css={[styles.valueText, props.css]}
        className={cx("chakra-progress__value-text", props.className)}
      >
        {props.children ?? api.computed.value}
      </chakra.span>
    )
  },
)
