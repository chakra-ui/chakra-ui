import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useNumberInputContext,
  useNumberInputStyles,
} from "./number-input-context"

export interface NumberInputFieldProps extends HTMLChakraProps<"input"> {}

/**
 * NumberInputField
 *
 * React component that represents the actual `input` field
 * where users can type to edit numeric values.
 *
 * It renders an `input` by default and ensures only numeric
 * values can be typed.
 *
 * @see Docs http://chakra-ui.com/numberinput
 */
export const NumberInputField = forwardRef<NumberInputFieldProps, "input">(
  function NumberInputField(props, ref) {
    const { getInputProps } = useNumberInputContext()

    const styles = useNumberInputStyles()

    return (
      <chakra.input
        {...getInputProps(props, ref)}
        className={cx("chakra-numberinput__field", props.className)}
        css={{
          width: "100%",
          ...styles.field,
        }}
      />
    )
  },
)

NumberInputField.displayName = "NumberInputField"
