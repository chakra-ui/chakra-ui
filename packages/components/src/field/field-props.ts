import { createProps, splitProps } from "@chakra-ui/utils"
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

export const splitFieldProps = <T extends UseFieldProps>(props: T) =>
  splitProps(props as any, fieldProps) as [
    UseFieldProps,
    Omit<T, keyof UseFieldProps>,
  ]
