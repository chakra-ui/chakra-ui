import { createProps, createSplitProps } from "@chakra-ui/utils"
import { UseMenuItemProps } from "./use-menu"
import { UseMenuOptionGroupProps } from "./use-option-group-state"

const menuItemProps = createProps<UseMenuItemProps>()([
  "closeOnSelect",
  "id",
  "disabled",
  "focusable",
])

export const splitMenuItemProps =
  createSplitProps<UseMenuItemProps>(menuItemProps)

const menuOptionGroupProps = createProps<UseMenuOptionGroupProps>()([
  "value",
  "defaultValue",
  "type",
  "onChange",
])

export const splitMenuOptionGroupProps =
  createSplitProps<UseMenuOptionGroupProps>(menuOptionGroupProps)
