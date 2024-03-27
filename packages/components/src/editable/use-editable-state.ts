import { pick } from "@chakra-ui/utils"
import { useEditableContext } from "./editable-context"

export function useEditableState() {
  const api = useEditableContext()
  return pick(api, ["isEditing", "onSubmit", "onCancel", "onEdit"])
}

export function useEditableControls() {
  const api = useEditableContext()
  return pick(api, [
    "isEditing",
    "getEditButtonProps",
    "getCancelButtonProps",
    "getSubmitButtonProps",
  ])
}
