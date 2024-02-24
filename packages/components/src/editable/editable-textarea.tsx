import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditableTextareaProps extends HTMLChakraProps<"textarea"> {}

export const EditableTextarea = forwardRef<EditableTextareaProps, "textarea">(
  function EditableTextarea(props, ref) {
    const api = useEditableContext()
    const styles = useEditableStyles()

    return (
      <chakra.textarea
        {...api.getTextareaProps(props, ref)}
        __css={styles.textarea}
        className={cx("chakra-editable__textarea", props.className)}
      />
    )
  },
)

EditableTextarea.displayName = "EditableTextarea"
