"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useEditableContext, useEditableStyles } from "./editable-context"

export interface EditableInputProps extends HTMLChakraProps<"input"> {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  function EditableInput(props, ref) {
    const api = useEditableContext()
    const styles = useEditableStyles()
    return (
      <chakra.input
        {...api.getInputProps(props, ref)}
        css={[styles.input, props.css]}
        className={cx("chakra-editable__input", props.className)}
      />
    )
  },
)

EditableInput.displayName = "EditableInput"
