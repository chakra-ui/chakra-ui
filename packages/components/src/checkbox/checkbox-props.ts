import { createProps, splitProps } from "@chakra-ui/utils"
import { UseCheckboxProps } from "./checkbox-types"

export const checkboxProps = createProps<UseCheckboxProps>()([
  "aria-describedby",
  "aria-invalid",
  "aria-label",
  "aria-labelledby",
  "defaultChecked",
  "id",
  "isChecked",
  "isDisabled",
  "isFocusable",
  "isIndeterminate",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "tabIndex",
  "value",
])

export const splitCheckboxProps = <T extends UseCheckboxProps>(props: T) => {
  return splitProps(props, checkboxProps) as [
    UseCheckboxProps,
    Omit<T, keyof UseCheckboxProps>,
  ]
}
