import { forwardRef, HTMLChakraProps, chakra } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

import { useMenuStyles } from "./menu"
import { useMenuButton } from "./use-menu"

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
    const { children, as: As, ...rest } = props

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
