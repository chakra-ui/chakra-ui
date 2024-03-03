import { cx } from "@chakra-ui/utils"
import { SystemStyleObject, forwardRef } from "../../styled-system"
import { MenuIcon } from "./menu-icon"
import { MenuItemProps } from "./menu-item"
import { StyledMenuItem } from "./styled-menu-item"
import { UseMenuOptionOptions, useMenuOption } from "./use-menu"

const CheckIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export interface MenuItemOptionProps
  extends UseMenuOptionOptions,
    Omit<MenuItemProps, keyof UseMenuOptionOptions | "icon"> {
  /**
   * @type React.ReactElement
   */
  icon?: React.ReactElement | null
  /**
   * @type SystemStyleObject["mr"]
   */
  iconSpacing?: SystemStyleObject["mr"]
}

export const MenuItemOption = forwardRef<MenuItemOptionProps, "button">(
  function MenuItemOption(props, ref) {
    // menu option item should always be `type=button`, so we omit `type`
    const { icon, iconSpacing = "0.75rem", ...restProps } = props

    const optionProps = useMenuOption(restProps, ref)

    return (
      <StyledMenuItem
        {...optionProps}
        className={cx("chakra-menu__menuitem-option", restProps.className)}
      >
        {icon !== null && (
          <MenuIcon
            fontSize="0.8em"
            marginEnd={iconSpacing}
            opacity={props.isChecked ? 1 : 0}
          >
            {icon || <CheckIcon />}
          </MenuIcon>
        )}
        <span style={{ flex: 1 }}>{optionProps.children}</span>
      </StyledMenuItem>
    )
  },
)

// @ts-ignore
MenuItemOption.id = "MenuItemOption"

MenuItemOption.displayName = "MenuItemOption"
