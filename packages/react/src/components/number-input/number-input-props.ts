import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseNumberInputProps } from "./use-number-input"

export const numberInputProps = createProps<UseNumberInputProps>()([
  "allowMouseWheel",
  "aria-describedby",
  "aria-label",
  "aria-labelledby",
  "clampValueOnBlur",
  "defaultValue",
  "format",
  "getAriaValueText",
  "id",
  "inputMode",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "isValidCharacter",
  "keepWithinRange",
  "max",
  "min",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onInvalid",
  "parse",
  "pattern",
  "precision",
  "step",
  "value",
  "focusInputOnChange",
])

export const splitNumberInputProps =
  createSplitProps<UseNumberInputProps>(numberInputProps)
