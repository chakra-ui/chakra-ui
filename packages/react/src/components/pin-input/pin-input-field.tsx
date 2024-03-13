import { cx } from "@chakra-ui/utils"
import { usePinInputContext } from "."
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePinInputStyles } from "./pin-input-context"

export interface PinInputFieldProps extends HTMLChakraProps<"input"> {
  index: number
}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
  function PinInputField(props, ref) {
    const api = usePinInputContext()
    const styles = usePinInputStyles()

    return (
      <chakra.input
        {...api.getInputProps(props, ref)}
        className={cx("chakra-pin-input__field", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)

PinInputField.displayName = "PinInputField"
