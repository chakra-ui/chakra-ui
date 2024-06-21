"use client"

import {
  Editable as ArkEditable,
  useEditableContext,
} from "@ark-ui/react/editable"
import { ark } from "@ark-ui/react/factory"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
  mergeProps,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useEditableStyles,
} = createStyleContext("editable")

export { useEditableStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface EditableRootProps
  extends HTMLChakraProps<"div", ArkEditable.RootBaseProps>,
    SlotRecipeProps<"editable">,
    UnstyledProp {}

export const EditableRoot = withProvider<HTMLDivElement, EditableRootProps>(
  ArkEditable.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface EditablePreviewProps
  extends HTMLChakraProps<"span", ArkEditable.PreviewBaseProps> {}

export const EditablePreview = withContext<
  HTMLSpanElement,
  EditablePreviewProps
>(ArkEditable.Preview, "preview", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface EditableInputProps
  extends HTMLChakraProps<"input", ArkEditable.InputBaseProps> {}

export const EditableInput = withContext<HTMLInputElement, EditableInputProps>(
  ArkEditable.Input,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface EditableTextareaProps
  extends HTMLChakraProps<"textarea", ArkEditable.InputBaseProps> {}

const ArkEditableTextarea = forwardRef<
  HTMLTextAreaElement,
  EditableTextareaProps
>(function EditableTextarea(props, ref) {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getInputProps(), props)
  return <ark.textarea ref={ref} {...mergedProps} />
})

export const EditableTextarea = withContext<
  HTMLInputElement,
  EditableTextareaProps
>(ArkEditableTextarea, "textarea", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface EditableControlProps
  extends HTMLChakraProps<"div", ArkEditable.ControlBaseProps> {}

export const EditableControl = withContext<
  HTMLDivElement,
  EditableControlProps
>(ArkEditable.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface EditableAreaProps
  extends HTMLChakraProps<"div", ArkEditable.AreaBaseProps> {}

export const EditableArea = withContext<HTMLDivElement, EditableAreaProps>(
  ArkEditable.Area,
  "area",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface EditableEditTriggerProps
  extends HTMLChakraProps<"button", ArkEditable.EditTriggerBaseProps> {}

export const EditableEditTrigger = withContext<
  HTMLButtonElement,
  EditableEditTriggerProps
>(ArkEditable.EditTrigger, "editTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface EditableSubmitTriggerProps
  extends HTMLChakraProps<"button", ArkEditable.SubmitTriggerBaseProps> {}

export const EditableSubmitTrigger = withContext<
  HTMLButtonElement,
  EditableSubmitTriggerProps
>(ArkEditable.SubmitTrigger, "submitTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface EditableCancelTriggerProps
  extends HTMLChakraProps<"button", ArkEditable.CancelTriggerBaseProps> {}

export const EditableCancelTrigger = withContext<
  HTMLButtonElement,
  EditableCancelTriggerProps
>(ArkEditable.CancelTrigger, "cancelTrigger", { forwardAsChild: true })
