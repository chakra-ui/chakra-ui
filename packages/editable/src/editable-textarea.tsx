import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useEditableContext, useEditableStyles } from "./editable-context"
import { commonStyles } from "./shared"

export interface EditableTextareaProps extends HTMLChakraProps<"textarea"> {}

/**
 * EditableTextarea
 *
 * The textarea used in the `edit` mode
 */

export const EditableTextarea = forwardRef<EditableTextareaProps, "textarea">(
  function EditableTextarea(props, ref) {
    const { getTextareaProps } = useEditableContext()
    const styles = useEditableStyles()

    const textareaProps = getTextareaProps(props, ref)
    const _className = cx("chakra-editable__textarea", props.className)

    return (
      <chakra.textarea
        {...textareaProps}
        __css={{
          outline: 0,
          ...commonStyles,
          ...styles.textarea,
        }}
        className={_className}
      />
    )
  },
)
EditableTextarea.displayName = "EditableTextarea"
