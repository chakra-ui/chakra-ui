import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { usePinInputField } from "./use-pin-input-field"

export interface PinInputFieldProps extends HTMLChakraProps<"input"> {}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
  function PinInputField(props, ref) {
    const inputProps = usePinInputField(props, ref)
    return (
      <chakra.input
        {...inputProps}
        className={cx("chakra-pin-input__field", props.className)}
      />
    )
  },
)

PinInputField.displayName = "PinInputField"
