"use client"

import type { Assign } from "@ark-ui/react"
import {
  Editable as ArkEditable,
  useEditableContext,
} from "@ark-ui/react/editable"
import { ark } from "@ark-ui/react/factory"
import { forwardRef } from "react"
import { mergeProps } from "../../merge-props"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useEditableStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "editable" })

export { useEditableStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface EditableRootProviderBaseProps
  extends
    Assign<ArkEditable.RootProviderBaseProps, SlotRecipeProps<"editable">>,
    UnstyledProp {}

export interface EditableRootProviderProps extends HTMLChakraProps<
  "div",
  EditableRootProviderBaseProps
> {}

export const EditableRootProvider = withProvider<
  HTMLDivElement,
  EditableRootProviderProps
>(ArkEditable.RootProvider, "root", { forwardAsChild: true })
EditableRootProvider.displayName = "EditableRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableRootBaseProps
  extends
    Assign<ArkEditable.RootBaseProps, SlotRecipeProps<"editable">>,
    UnstyledProp {}

export interface EditableRootProps extends HTMLChakraProps<
  "div",
  EditableRootBaseProps
> {}

export const EditableRoot = withProvider<HTMLDivElement, EditableRootProps>(
  ArkEditable.Root,
  "root",
  { forwardAsChild: true },
)
EditableRoot.displayName = "EditableRoot"

////////////////////////////////////////////////////////////////////////////////////

export const EditablePropsProvider =
  PropsProvider as React.Provider<EditableRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface EditablePreviewProps
  extends HTMLChakraProps<"span", ArkEditable.PreviewBaseProps>, UnstyledProp {}

export const EditablePreview = withContext<
  HTMLSpanElement,
  EditablePreviewProps
>(ArkEditable.Preview, "preview", { forwardAsChild: true })
EditablePreview.displayName = "EditablePreview"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableLabelProps
  extends HTMLChakraProps<"label", ArkEditable.LabelProps>, UnstyledProp {}

export const EditableLabel = withContext<HTMLLabelElement, EditableLabelProps>(
  ArkEditable.Label,
  "label",
  { forwardAsChild: true },
)
EditableLabel.displayName = "EditableLabel"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableInputProps
  extends HTMLChakraProps<"input", ArkEditable.InputBaseProps>, UnstyledProp {}

export const EditableInput = withContext<HTMLInputElement, EditableInputProps>(
  ArkEditable.Input,
  "input",
  { forwardAsChild: true },
)
EditableInput.displayName = "EditableInput"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableTextareaProps
  extends
    HTMLChakraProps<"textarea", ArkEditable.InputBaseProps>,
    UnstyledProp {}

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
>(ArkEditableTextarea, "input", { forwardAsChild: true })
EditableTextarea.displayName = "EditableTextarea"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableControlProps
  extends HTMLChakraProps<"div", ArkEditable.ControlBaseProps>, UnstyledProp {}

export const EditableControl = withContext<
  HTMLDivElement,
  EditableControlProps
>(ArkEditable.Control, "control", { forwardAsChild: true })
EditableControl.displayName = "EditableControl"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableAreaProps
  extends HTMLChakraProps<"div", ArkEditable.AreaBaseProps>, UnstyledProp {}

export const EditableArea = withContext<HTMLDivElement, EditableAreaProps>(
  ArkEditable.Area,
  "area",
  { forwardAsChild: true },
)
EditableArea.displayName = "EditableArea"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableEditTriggerProps
  extends
    HTMLChakraProps<"button", ArkEditable.EditTriggerBaseProps>,
    UnstyledProp {}

export const EditableEditTrigger = withContext<
  HTMLButtonElement,
  EditableEditTriggerProps
>(ArkEditable.EditTrigger, "editTrigger", { forwardAsChild: true })
EditableEditTrigger.displayName = "EditableEditTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableSubmitTriggerProps
  extends
    HTMLChakraProps<"button", ArkEditable.SubmitTriggerBaseProps>,
    UnstyledProp {}

export const EditableSubmitTrigger = withContext<
  HTMLButtonElement,
  EditableSubmitTriggerProps
>(ArkEditable.SubmitTrigger, "submitTrigger", { forwardAsChild: true })
EditableSubmitTrigger.displayName = "EditableSubmitTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface EditableCancelTriggerProps
  extends
    HTMLChakraProps<"button", ArkEditable.CancelTriggerBaseProps>,
    UnstyledProp {}

export const EditableCancelTrigger = withContext<
  HTMLButtonElement,
  EditableCancelTriggerProps
>(ArkEditable.CancelTrigger, "cancelTrigger", { forwardAsChild: true })
EditableCancelTrigger.displayName = "EditableCancelTrigger"

////////////////////////////////////////////////////////////////////////////////////

export const EditableContext = ArkEditable.Context
