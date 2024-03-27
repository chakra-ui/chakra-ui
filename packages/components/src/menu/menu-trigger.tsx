import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useMenuStyles } from "./menu-context"
import { useMenuTrigger } from "./use-menu"

export interface MenuTriggerProps extends HTMLChakraProps<"button"> {}

export const MenuTrigger = forwardRef<MenuTriggerProps, "button">(
  function MenuTrigger(props, ref) {
    const triggerProps = useMenuTrigger(props, ref)
    const styles = useMenuStyles()

    return (
      <chakra.button
        {...triggerProps}
        className={cx("chakra-menu__trigger", props.className)}
        __css={styles.trigger}
      />
    )
  },
)

MenuTrigger.displayName = "MenuTrigger"
