import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"
import { CheckboxIcon } from "./checkbox-icon"

export interface CheckboxControlProps extends HTMLChakraProps<"span"> {}

export const CheckboxControl = forwardRef<CheckboxControlProps, "span">(
  function CheckboxControl(props, ref) {
    const { children = <CheckboxIcon />, ...restProps } = props

    const api = useCheckboxContext()
    const styles = useCheckboxStyles()

    return (
      <chakra.span
        {...api.getCheckboxProps(restProps, ref)}
        css={[styles.control, props.css]}
        className={cx("chakra-checkbox__control", props.className)}
      >
        {children}
      </chakra.span>
    )
  },
)

CheckboxControl.displayName = "CheckboxControl"
