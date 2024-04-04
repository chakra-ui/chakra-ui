"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditableTextareaProps extends HTMLChakraProps<"textarea"> {}

export const EditableTextarea = forwardRef<
  HTMLTextAreaElement,
  EditableTextareaProps
>(function EditableTextarea(props, ref) {
  const api = useEditableContext()
  const styles = useEditableStyles()

  return (
    <chakra.textarea
      {...api.getTextareaProps(props, ref)}
      css={[styles.textarea, props.css]}
      className={cx("chakra-editable__textarea", props.className)}
    />
  )
})

EditableTextarea.displayName = "EditableTextarea"
