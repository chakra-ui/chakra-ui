import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { useEditableContext, useEditableStyles } from "./editable-context"

const baseStyles: SystemStyleObject = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
}

export interface EditableInputProps extends HTMLChakraProps<"input"> {}
/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */

export const EditableInput = forwardRef<EditableInputProps, "input">(
  function EditableInput(props, ref) {
    const { getInputProps } = useEditableContext()
    const styles = useEditableStyles()

    const inputProps = getInputProps(props, ref)
    const _className = cx("chakra-editable__input", props.className)

    return (
      <chakra.input
        {...inputProps}
        __css={{
          outline: 0,
          ...baseStyles,
          ...styles.input,
        }}
        className={_className}
      />
    )
  },
)
if (__DEV__) {
  EditableInput.displayName = "EditableInput"
}
