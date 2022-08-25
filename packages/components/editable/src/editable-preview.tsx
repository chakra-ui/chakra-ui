import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useEditableContext, useEditableStyles } from "./editable-context"
import { commonStyles } from "./shared"

export interface EditablePreviewProps extends HTMLChakraProps<"div"> {}

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */
export const EditablePreview = forwardRef<EditablePreviewProps, "span">(
  function EditablePreview(props, ref) {
    const { getPreviewProps } = useEditableContext()
    const styles = useEditableStyles()

    const previewProps = getPreviewProps(props, ref) as HTMLChakraProps<"span">
    const _className = cx("chakra-editable__preview", props.className)

    return (
      <chakra.span
        {...previewProps}
        __css={{
          cursor: "text",
          display: "inline-block",
          ...commonStyles,
          ...styles.preview,
        }}
        className={_className}
      />
    )
  },
)
EditablePreview.displayName = "EditablePreview"
