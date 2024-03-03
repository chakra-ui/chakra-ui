import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuDividerProps extends HTMLChakraProps<"hr"> {}

export const MenuDivider: React.FC<MenuDividerProps> = (props) => {
  const { className, ...rest } = props
  const styles = useMenuStyles()
  return (
    <chakra.hr
      aria-orientation="horizontal"
      className={cx("chakra-menu__divider", className)}
      {...rest}
      css={styles.divider}
    />
  )
}

MenuDivider.displayName = "MenuDivider"
