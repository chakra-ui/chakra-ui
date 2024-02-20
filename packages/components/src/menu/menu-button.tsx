import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useMenuButton } from "./use-menu"
import { useMenuStyles } from "./menu-context"

export interface MenuButtonProps extends HTMLChakraProps<"button"> {}

const StyledMenuButton = forwardRef<MenuButtonProps, "button">((props, ref) => {
  const styles = useMenuStyles()
  return (
    <chakra.button
      ref={ref}
      {...props}
      __css={{
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        outline: 0,
        ...styles.button,
      }}
    />
  )
})

/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
 */
export const MenuButton = forwardRef<MenuButtonProps, "button">(
  (props, ref) => {
    const { children, as: As, asChild, ...rest } = props

    const buttonProps = useMenuButton(rest, ref)

    const Element = As || StyledMenuButton

    return (
      <Element
        {...buttonProps}
        className={cx("chakra-menu__menu-button", props.className)}
      >
        <chakra.span
          __css={{ pointerEvents: "none", flex: "1 1 auto", minW: 0 }}
        >
          {props.children}
        </chakra.span>
      </Element>
    )
  },
)

MenuButton.displayName = "MenuButton"
