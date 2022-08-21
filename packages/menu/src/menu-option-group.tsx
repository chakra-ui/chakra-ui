import { cx, __DEV__ } from "@chakra-ui/utils"

import { type MenuGroupProps, MenuGroup } from "./menu-group"
import { UseMenuOptionGroupProps, useMenuOptionGroup } from "./use-menu"

export interface MenuOptionGroupProps
  extends UseMenuOptionGroupProps,
    Omit<MenuGroupProps, "value" | "defaultValue" | "onChange"> {}

export const MenuOptionGroup: React.FC<MenuOptionGroupProps> = (props) => {
  const { className, title, ...rest } = props
  const ownProps = useMenuOptionGroup(rest)
  return (
    <MenuGroup
      title={title}
      className={cx("chakra-menu__option-group", className)}
      {...ownProps}
    />
  )
}

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup"
}
