import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useRadioItemContext, useRadioItemStyles } from "./radio-group-context"

export interface RadioGroupItemIndicatorProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemIndicator = forwardRef<
  RadioGroupItemIndicatorProps,
  "input"
>(function RadioGroupItemIndicator(props, ref) {
  const styles = useRadioItemStyles()
  const api = useRadioItemContext()

  return (
    <chakra.span
      {...props}
      ref={ref}
      aria-hidden="true"
      hidden={!api.state.isChecked}
      className={cx("chakra-radio__indicator", props.className)}
      css={[styles.indicator, props.css]}
    />
  )
})

RadioGroupItemIndicator.displayName = "RadioGroupItemIndicator"
