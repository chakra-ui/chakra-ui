import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useNumberInputStyles } from "./number-input-context"

export interface NumberInputControlProps extends HTMLChakraProps<"div"> {}

export const NumberInputControl = forwardRef<NumberInputControlProps, "div">(
  function NumberInputControl(props, ref) {
    const styles = useNumberInputStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        css={[styles.control, props.css]}
        className={cx("chakra-number-input__control", props.className)}
      />
    )
  },
)

NumberInputControl.displayName = "NumberInputControl"
