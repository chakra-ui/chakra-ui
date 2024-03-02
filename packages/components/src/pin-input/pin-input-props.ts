import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UsePinInputProps } from "./use-pin-input"

const pinInputProps = createProps<UsePinInputProps>()([
  "autoFocus",
  "value",
  "defaultValue",
  "onChange",
  "onComplete",
  "placeholder",
  "manageFocus",
  "otp",
  "id",
  "isDisabled",
  "isInvalid",
  "type",
  "mask",
])

export const splitPinInputProps =
  createSplitProps<UsePinInputProps>(pinInputProps)
