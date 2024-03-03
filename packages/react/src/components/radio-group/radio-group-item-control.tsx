import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useRadioItemContext, useRadioItemStyles } from "./radio-group-context"

export interface RadioGroupItemControlProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemControl = forwardRef<
  RadioGroupItemControlProps,
  "input"
>(function RadioGroupItem(props, ref) {
  const api = useRadioItemContext()
  const styles = useRadioItemStyles()

  return (
    <chakra.span
      {...api.getRadioProps(props, ref)}
      className={cx("chakra-radio__control", props.className)}
      css={styles.control}
    />
  )
})

RadioGroupItemControl.displayName = "RadioGroupItemControl"
