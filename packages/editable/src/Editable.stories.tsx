import * as React from "react"
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "./Editable"
import { useEditable } from "./Editable.hook"
import { chakra } from "@chakra-ui/system"

export default {
  title: "Editable",
  decorators: [
    (Story: Function) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        <Story />
      </chakra.div>
    ),
  ],
}

export const UseEditableHook = () => {
  const {
    getInputProps,
    getPreviewProps,
    onSubmit,
    onCancel,
    isValueEmpty,
    isEditing,
    onEdit,
  } = useEditable({
    placeholder: "Title...",
    submitOnBlur: false,
  })

  return (
    <>
      <input
        style={{ width: "auto", background: "transparent" }}
        {...getInputProps()}
      />
      <span
        style={{ opacity: isValueEmpty ? 0.7 : 1 }}
        {...getPreviewProps()}
      />
      {!isEditing && <button onClick={onEdit}>Edit</button>}
      {isEditing && (
        <>
          <button onClick={onSubmit}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      )}
    </>
  )
}

const EditableControls = () => {
  const {
    isEditing,
    getEditButtonProps,
    getSubmitButtonProps,
    getCancelButtonProps,
  } = useEditableControls()

  return (
    <div>
      {!isEditing ? (
        <button {...getEditButtonProps()}>Edit</button>
      ) : (
        <>
          <button {...getSubmitButtonProps()}>Save</button>
          <button {...getCancelButtonProps()}>Cancel</button>
        </>
      )}
    </div>
  )
}

export const Basic = () => (
  <Editable
    defaultValue="Rasengan ⚡️"
    fontSize="xl"
    textAlign="center"
    isPreviewFocusable={false}
    submitOnBlur={false}
    onChange={console.log}
  >
    <EditablePreview />
    <EditableInput />
    <EditableControls />
  </Editable>
)

export const CodeSandboxTopbar = () => {
  return (
    <chakra.div py="4" display="flex" alignItems="center">
      <chakra.p fontWeight="medium">My Sandboxes</chakra.p>
      <chakra.span mx="3">/</chakra.span>
      <Editable defaultValue="chakra-ui-demo">
        <EditableInput _focus={{ boxShadow: "none" }} />
        <EditablePreview />
      </Editable>
    </chakra.div>
  )
}
