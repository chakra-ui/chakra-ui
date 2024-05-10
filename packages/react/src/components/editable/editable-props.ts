import { createProps, createSplitProps } from "@chakra-ui/utils"
import type { UseEditableProps } from "./use-editable"

export const editableProps = createProps<UseEditableProps>()([
  "defaultValue",
  "finalFocusRef",
  "disabled",
  "isPreviewFocusable",
  "onBlur",
  "onCancel",
  "onChange",
  "onEdit",
  "onSubmit",
  "placeholder",
  "selectAllOnFocus",
  "startWithEditView",
  "submitOnBlur",
  "value",
])

export const splitEditableProps =
  createSplitProps<UseEditableProps>(editableProps)
