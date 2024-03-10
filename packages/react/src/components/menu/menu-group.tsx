import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuGroupProps extends HTMLChakraProps<"div"> {}

export const MenuGroup = forwardRef<MenuGroupProps, "div">(
  function MenuGroup(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.div
        role="group"
        {...props}
        ref={ref}
        className={cx("chakra-menu__group", props.className)}
        css={[styles.group, props.css]}
      />
    )
  },
)

MenuGroup.displayName = "MenuGroup"
