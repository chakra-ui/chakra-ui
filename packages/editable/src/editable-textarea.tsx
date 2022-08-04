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
          ...baseStyles,
          ...styles.textarea,
        }}
        className={_className}
      />
    )
  },
)
if (__DEV__) {
  EditableTextarea.displayName = "EditableTextarea"
}
