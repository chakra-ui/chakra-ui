import * as React from "react"
import {
  useEditable,
  EditableHookProps,
  EditableHookReturn,
} from "./Editable.hook"
import { createContext } from "@chakra-ui/utils"

type EditableContext = Omit<EditableHookReturn, "htmlProps">
const [EditableProvider, useEditableContext] = createContext<EditableContext>()

type BaseEditableProps = EditableHookProps &
  Omit<React.ComponentProps<"div">, "onChange" | "value">

export function BaseEditable(props: BaseEditableProps) {
  const { htmlProps, ...context } = useEditable(props)
  return (
    <EditableProvider value={context}>
      <div {...htmlProps} />
    </EditableProvider>
  )
}

export function BaseEditablePreview(props: any) {
  const { getPreviewProps } = useEditableContext()
  return <span {...getPreviewProps(props)} />
}

export function BaseEditableInput(props: any) {
  const { getInputProps } = useEditableContext()
  return <input {...getInputProps(props)} />
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
