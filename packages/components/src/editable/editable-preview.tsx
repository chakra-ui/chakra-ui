import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditablePreviewProps extends HTMLChakraProps<"div"> {}

export const EditablePreview = forwardRef<EditablePreviewProps, "span">(
  function EditablePreview(props, ref) {
    const api = useEditableContext()
    const styles = useEditableStyles()

    const previewProps = api.getPreviewProps(props, ref) as any

    return (
      <chakra.span
        {...previewProps}
        __css={styles.preview}
        className={cx("chakra-editable__preview", props.className)}
      />
    )
  },
)

EditablePreview.displayName = "EditablePreview"
