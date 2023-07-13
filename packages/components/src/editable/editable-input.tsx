import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useEditableContext, useEditableStyles } from "./editable-context"
import { commonStyles } from "./shared"

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
          ...commonStyles,
          ...styles.input,
        }}
        className={_className}
      />
    )
  },
)
EditableInput.displayName = "EditableInput"
