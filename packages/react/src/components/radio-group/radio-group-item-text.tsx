import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useRadioItemContext, useRadioItemStyles } from "./radio-group-context"

export interface RadioGroupItemTextProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemText = forwardRef<
  HTMLInputElement,
  RadioGroupItemTextProps
>(function RadioGroupItemText(props, ref) {
  const styles = useRadioItemStyles()
  const api = useRadioItemContext()

  return (
    <chakra.span
      {...api.getLabelProps(props, ref)}
      className={cx("chakra-radio__label", props.className)}
      css={[styles.label, props.css]}
    />
  )
})

RadioGroupItemText.displayName = "RadioGroupItemText"
