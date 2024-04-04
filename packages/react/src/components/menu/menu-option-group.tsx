"use client"

import { cx } from "@chakra-ui/utils"
import { MenuGroupContextProvider } from "./menu-context"
import { MenuGroup, type MenuGroupProps } from "./menu-group"
import { splitMenuOptionGroupProps } from "./menu-props"
import {
  UseMenuOptionGroupProps,
  useOptionGroupState,
} from "./use-option-group-state"

export interface MenuOptionGroupProps
  extends UseMenuOptionGroupProps,
    Omit<MenuGroupProps, "value" | "defaultValue" | "onChange"> {}

export const MenuOptionGroup: React.FC<MenuOptionGroupProps> = (props) => {
  const [hookProps, localProps] = splitMenuOptionGroupProps(props)
  const state = useOptionGroupState(hookProps)
  return (
    <MenuGroupContextProvider value={state}>
      <MenuGroup
        {...localProps}
        className={cx("chakra-menu__option-group", props.className)}
      />
    </MenuGroupContextProvider>
  )
}

MenuOptionGroup.displayName = "MenuOptionGroup"
