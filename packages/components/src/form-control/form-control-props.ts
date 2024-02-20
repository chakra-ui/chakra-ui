import { createProps, splitProps } from "@chakra-ui/utils"
import { UseFormControlProps } from "./types"

export const formControlProps = createProps<UseFormControlProps>()([
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

export const splitFormControlProps = <T extends UseFormControlProps>(
  props: T,
) =>
  splitProps(props as any, formControlProps) as [
    UseFormControlProps,
    Omit<T, keyof UseFormControlProps>,
  ]
