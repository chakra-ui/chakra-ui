import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"

export interface MenuTriggerProps extends HTMLChakraProps<"button"> {}

export const MenuTrigger = forwardRef<MenuTriggerProps, "button">(
  function MenuTrigger(props, ref) {
    const api = useMenuContext()
    const styles = useMenuStyles()

    return (
      <chakra.button
        {...api.getTriggerProps(props, ref)}
        className={cx("chakra-menu__trigger", props.className)}
        css={styles.trigger}
      />
    )
  },
)

MenuTrigger.displayName = "MenuTrigger"
