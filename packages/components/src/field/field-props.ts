import { createProps, splitProps } from "@chakra-ui/utils"
import { UseFieldProps } from "./types"

export const fieldProps = createProps<UseFieldProps>()([
  "aria-describedby",
  "disabled",
  "id",
  "isInvalid",
  "readOnly",
  "required",
  "onBlur",
  "onFocus",
])

export const splitFieldProps = <T extends UseFieldProps>(props: T) =>
  splitProps(props as any, fieldProps) as [
    UseFieldProps,
    Omit<T, keyof UseFieldProps>,
  ]
