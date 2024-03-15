import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseRadioProps } from "./use-radio"
import { UseRadioGroupProps } from "./use-radio-group"

const radioGroupProps = createProps<UseRadioGroupProps>()([
  "defaultValue",
  "disabled",
  "focusable",
  "name",
  "onChange",
  "value",
])

export const splitRadioGroupProps =
  createSplitProps<UseRadioGroupProps>(radioGroupProps)

const radioItemProps = createProps<UseRadioProps>()([
  "aria-describedby",
  "data-radiogroup",
  "defaultChecked",
  "id",
  "checked",
  "disabled",
  "focusable",
  "invalid",
  "readOnly",
  "required",
  "name",
  "onChange",
  "value",
])

export const splitRadioItemProps =
  createSplitProps<UseRadioProps>(radioItemProps)
