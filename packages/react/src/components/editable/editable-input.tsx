import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditableInputProps extends HTMLChakraProps<"input"> {}

export const EditableInput = forwardRef<EditableInputProps, "input">(
  function EditableInput(props, ref) {
    const api = useEditableContext()
    const styles = useEditableStyles()
    return (
      <chakra.input
        {...api.getInputProps(props, ref)}
        css={styles.input}
        className={cx("chakra-editable__input", props.className)}
      />
    )
  },
)

EditableInput.displayName = "EditableInput"
