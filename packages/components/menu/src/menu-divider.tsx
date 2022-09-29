import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

import { useMenuStyles } from "./menu"

export interface MenuDividerProps extends HTMLChakraProps<"hr"> {}

export const MenuDivider: React.FC<MenuDividerProps> = (props) => {
  const { className, ...rest } = props
  const styles = useMenuStyles()
  return (
    <chakra.hr
      aria-orientation="horizontal"
      className={cx("chakra-menu__divider", className)}
      {...rest}
      __css={styles.divider}
    />
  )
}

MenuDivider.displayName = "MenuDivider"
