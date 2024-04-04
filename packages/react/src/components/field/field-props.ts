import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseFieldProps } from "./types"

export const fieldProps = createProps<UseFieldProps>()([
  "aria-describedby",
  "disabled",
  "id",
  "invalid",
  "readOnly",
  "required",
  "onBlur",
  "onFocus",
])

export const splitFieldProps = createSplitProps<UseFieldProps>(fieldProps)
