import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useMenuStyles } from "./menu-context"
import { useMenuButton } from "./use-menu"

export interface MenuButtonProps extends HTMLChakraProps<"button"> {}

/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
 */
export const MenuButton = forwardRef<MenuButtonProps, "button">(
  (props, ref) => {
    const buttonProps = useMenuButton(props, ref)
    const styles = useMenuStyles()

    return (
      <chakra.button
        {...buttonProps}
        className={cx("chakra-menu__button", props.className)}
        __css={styles.button}
      />
    )
  },
)

MenuButton.displayName = "MenuButton"
