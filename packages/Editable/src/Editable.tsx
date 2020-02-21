import * as React from "react"
import {
  EditableProviderProps,
  useEditableProvider,
  useEditablePreview,
  useEditableInput,
} from "./Editable.hook"
import { createContext } from "@chakra-ui/utils"
import { chakra, SystemProps } from "@chakra-ui/system"

type ContextType = ReturnType<typeof useEditableProvider>
const [EditableProvider, useEditableContext] = createContext<ContextType>()

export function Editable(
  props: EditableProviderProps & { children: React.ReactNode },
) {
  const context = useEditableProvider(props)
  return (
    <EditableProvider value={context}>
      <chakra.div children={props.children} />
    </EditableProvider>
  )
}

const sharedProps: SystemProps = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  transition: "all 0.2s",
  borderRadius: "md",
  paddingX: "3px",
  marginX: "-3px",
}

export function EditablePreview(props: any) {
  const context = useEditableContext()
  const preview = useEditablePreview({ context })

  const styleProps = {
    ...sharedProps,
    cursor: "text",
    outline: "none",
    opacity: context.isValueEmpty ? 0.6 : undefined,
  }

  return <chakra.span {...styleProps} {...props} {...preview} />
}

Editable.Preview = EditablePreview

export function EditableInput(props: any) {
  const context = useEditableContext()
  const input = useEditableInput({ context })

  const styleProps: SystemProps = {
    ...sharedProps,
    width: "full",
    outline: 0,
    _placeholder: {
      opacity: 0.6,
    },
  }

  return (
    <chakra.input
      _focus={{ shadow: "outline" }}
      {...styleProps}
      {...props}
      {...input}
    />
  )
}

Editable.Input = EditableInput

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
