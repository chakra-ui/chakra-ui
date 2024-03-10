import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuGroupLabelProps extends HTMLChakraProps<"div"> {}

export const MenuGroupLabel = forwardRef<MenuGroupLabelProps, "div">(
  function MenuGroupLabel(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-menu__group__title", props.className)}
        css={styles.groupTitle}
      />
    )
  },
)

MenuGroupLabel.displayName = "MenuGroupLabel"
