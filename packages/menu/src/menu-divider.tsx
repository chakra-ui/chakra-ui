import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"

import { useMenuStyles } from "./menu"

export interface MenuDividerProps extends HTMLChakraProps<"hr"> {}

export const MenuDivider: React.FC<MenuDividerProps> = (props) => {
  const { className, ...rest } = props
  const styles = useMenuStyles()
  return (
    <chakra.hr
      role="separator"
      aria-orientation="horizontal"
      className={cx("chakra-menu__divider", className)}
      {...rest}
      __css={styles.divider}
    />
  )
}

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
