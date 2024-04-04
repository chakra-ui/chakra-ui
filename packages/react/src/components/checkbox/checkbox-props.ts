import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseCheckboxProps } from "./checkbox-types"

export const checkboxProps = createProps<UseCheckboxProps>()([
  "aria-describedby",
  "aria-invalid",
  "aria-label",
  "aria-labelledby",
  "defaultChecked",
  "id",
  "checked",
  "disabled",
  "focusable",
  "indeterminate",
  "invalid",
  "readOnly",
  "required",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "tabIndex",
  "value",
])

export const splitCheckboxProps =
  createSplitProps<UseCheckboxProps>(checkboxProps)
