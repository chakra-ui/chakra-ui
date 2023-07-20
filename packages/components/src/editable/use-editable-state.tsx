import { useEditableContext } from "./editable-context"

/**
 * React hook use to gain access to the editable state and actions.
 */

export function useEditableState() {
  const { isEditing, onSubmit, onCancel, onEdit, isDisabled } =
    useEditableContext()

  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  }
}
