"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditablePreviewProps extends HTMLChakraProps<"div"> {}

export const EditablePreview = forwardRef<
  HTMLSpanElement,
  EditablePreviewProps
>(function EditablePreview(props, ref) {
  const api = useEditableContext()
  const styles = useEditableStyles()

  return (
    <chakra.span
      {...api.getPreviewProps(props, ref)}
      css={[styles.preview, props.css]}
      className={cx("chakra-editable__preview", props.className)}
    />
  )
})

EditablePreview.displayName = "EditablePreview"
