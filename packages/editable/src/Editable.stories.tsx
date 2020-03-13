import React from "react"
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableState,
} from "./Editable"
import { useEditable } from "./Editable.hook"

export default {
  title: "Editable",
}

export const HookExample = () => {
  const {
    getInputProps,
    getPreviewProps,
    isValueEmpty,
    isEditing,
    onEdit,
  } = useEditable({
    placeholder: "Title",
    isPreviewFocusable: true,
    submitOnBlur: true,
  })

  return (
    <>
      <input style={{ width: "100%" }} {...getInputProps()} />
      <span
        style={{ opacity: isValueEmpty ? 0.7 : 1 }}
        {...getPreviewProps()}
      />
      {!isEditing && <button onClick={onEdit}>Edit</button>}
    </>
  )
}

const EditableControls = () => {
  const { isEditing, onEdit, onSubmit, onCancel } = useEditableState()
  return (
    <div>
      {!isEditing ? (
        <button onClick={onEdit}>Edit</button>
      ) : (
        <>
          <button onClick={onSubmit}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      )}
    </div>
  )
}

export const BaseComponents = () => (
  <Editable defaultValue="testing">
    <EditablePreview />
    <EditableInput />
    <EditableControls />
  </Editable>
)
