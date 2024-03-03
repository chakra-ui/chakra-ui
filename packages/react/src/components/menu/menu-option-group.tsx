import { cx } from "@chakra-ui/utils"
import { MenuGroup, type MenuGroupProps } from "./menu-group"
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

MenuOptionGroup.displayName = "MenuOptionGroup"
