import * as React from "react"
import {
  useEditable,
  EditableHookProps,
  EditableHookReturn,
} from "./Editable.hook"
import { createContext, isFunction, NodeOrRenderProp } from "@chakra-ui/utils"
import { chakra, PropsOf } from "@chakra-ui/system"

type EditableContext = Omit<EditableHookReturn, "htmlProps">

const [EditableProvider, useEditableContext] = createContext<EditableContext>()

const StyledEditable = chakra("div", { themeKey: "Editable.Root" })

type RenderProps = Pick<
  EditableHookReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

type Omitted = "onChange" | "value" | "children" | "defaultValue"

export type EditableProps = EditableHookProps &
  Omit<PropsOf<typeof StyledEditable>, Omitted> & {
    children?: NodeOrRenderProp<RenderProps>
  }

/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 */
export function Editable(props: EditableProps) {
  const { htmlProps, ...context } = useEditable(props)

  const { isEditing, onSubmit, onCancel, onEdit } = context
  const renderProps = { isEditing, onSubmit, onCancel, onEdit }

  return (
    <EditableProvider value={context}>
      <StyledEditable data-chakra-editable="" {...htmlProps}>
        {isFunction(props.children)
          ? props.children(renderProps)
          : props.children}
      </StyledEditable>
    </EditableProvider>
  )
}

const StyledPreview = chakra("span", { themeKey: "Editable.Preview" })

export type EditablePreviewProps = PropsOf<typeof StyledPreview>

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */

export function EditablePreview(props: EditablePreviewProps) {
  const { getPreviewProps } = useEditableContext()
  return (
    <StyledPreview
      data-chakra-editable-preview=""
      {...getPreviewProps(props)}
    />
  )
}

const StyledInput = chakra("input", { themeKey: "Editable.Input" })

export type EditableInputProps = PropsOf<typeof StyledInput>

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export function EditableInput(props: EditableInputProps) {
  const { getInputProps } = useEditableContext()
  return <StyledInput data-chakra-editable-input="" {...getInputProps(props)} />
}

/**
 * React hook use to gain access to the editable state
 * and actions.
 */
export function useEditableState() {
  const {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  } = useEditableContext()

  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  }
}

/**
 * React hook use to create controls for the
 * editable component
 */
export function useEditableControls() {
  const {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableContext()

  return {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  }
}
