import { createProps, splitProps } from "@chakra-ui/utils"
import { UseEditableProps } from "./use-editable"

export const editableProps = createProps<UseEditableProps>()([
  "defaultValue",
  "finalFocusRef",
  "isDisabled",
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

export const splitEditableProps = <T extends UseEditableProps>(props: T) => {
  return splitProps(props, editableProps) as [
    UseEditableProps,
    Omit<T, keyof UseEditableProps>,
  ]
}
