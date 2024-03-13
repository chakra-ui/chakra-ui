import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseFieldProps } from "./types"

export const fieldProps = createProps<UseFieldProps>()([
  "aria-describedby",
  "disabled",
  "id",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "onBlur",
  "onFocus",
  "readOnly",
  "required",
])

export const splitFieldProps = createSplitProps<UseFieldProps>(fieldProps)
