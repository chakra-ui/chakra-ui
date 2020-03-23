import * as React from "react"
import {
  useEditable,
  EditableHookProps,
  EditableHookReturn,
} from "./Editable.hook"
import { createContext } from "@chakra-ui/utils"
import { chakra, PropsOf } from "@chakra-ui/system"

type EditableContext = Omit<EditableHookReturn, "htmlProps">

const [EditableProvider, useEditableContext] = createContext<EditableContext>()

const StyledEditable = chakra("div", { themeKey: "Editable.Root" })

export type EditableProps = EditableHookProps &
  Omit<PropsOf<typeof StyledEditable>, "onChange" | "value">

export function Editable(props: EditableProps) {
  const { htmlProps, ...context } = useEditable(props)
  return (
    <EditableProvider value={context}>
      <StyledEditable data-chakra-editable="" {...htmlProps} />
    </EditableProvider>
  )
}

const StyledPreview = chakra("span", { themeKey: "Editable.Preview" })

export type EditablePreviewProps = PropsOf<typeof StyledPreview>

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

export function EditableInput(props: any) {
  const { getInputProps } = useEditableContext()
  return <StyledInput data-chakra-editable-input="" {...getInputProps(props)} />
}

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
