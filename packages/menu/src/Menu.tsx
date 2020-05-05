import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { createContext, mergeRefs, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import {
  useMenu,
  useMenuButton,
  useMenuItem,
  UseMenuItemProps,
  useMenuList,
  useMenuOption,
  useMenuOptionGroup,
  UseMenuOptionProps,
  UseMenuProps,
  UseMenuReturn,
  UseMenuOptionGroupProps,
} from "./Menu.hook"

const [MenuContextProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: false,
  name: "MenuContext",
})

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}

export type MenuProps = Omit<UseMenuProps, "context"> & {
  children: React.ReactNode
}

export function Menu(props: MenuProps) {
  const parentCtx = useMenuContext()
  const context = useMenu({ context: parentCtx, ...props })
  return (
    <MenuContextProvider value={context}>{props.children}</MenuContextProvider>
  )
}

if (__DEV__) {
  Menu.displayName = "Menu"
}

export type MenuButtonProps = PropsOf<typeof StyledMenuButton> & {
  submenuIcon?: React.ReactElement
}

// change the themekey to menu.button
const StyledMenuButton = chakra("button", {
  themeKey: "Button",
  baseStyle: {
    outline: 0,
    transition: "all 0.2s",
  },
  pure: true,
})

const SubmenuSvg = (props: PropsOf<"svg">) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1.2em"
    width="1.2em"
    {...props}
  >
    <path d="M192 128l128 128-128 128z" />
  </svg>
)

export const MenuButton = React.forwardRef(
  (props: MenuButtonProps, ref: React.Ref<any>) => {
    const { children, submenuIcon = <SubmenuSvg />, ...rest } = props

    const context = useMenuContext()

    const ownProps = useMenuButton({ context, ...rest })
    const ownRef = mergeRefs(ref, ownProps.ref)

    const isSubmenu = context.hasParentMenu

    const Comp = isSubmenu ? StyledMenuItem : StyledMenuButton

    const getChildren = () => {
      if (!isSubmenu) return props.children

      return (
        <React.Fragment>
          <chakra.span flex="1">{props.children}</chakra.span>
          <MenuItemIcon mr="-0.5rem" children={submenuIcon} />
        </React.Fragment>
      )
    }

    return (
      <Comp {...ownProps} ref={ownRef}>
        {getChildren()}
      </Comp>
    )
  },
)

if (__DEV__) {
  MenuButton.displayName = "MenuButton"
}

export type MenuListProps = PropsOf<typeof StyledMenuList>

const StyledMenuList = chakra("div", {
  themeKey: "Menu.MenuList",
  pure: true,
})

export const MenuList = React.forwardRef(
  (props: MenuListProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuList({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return <StyledMenuList {...ownProps} ref={ownRef} />
  },
)

if (__DEV__) {
  MenuList.displayName = "MenuList"
}

const StyledMenuItem = chakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    flex: "0 0 auto",
  },
  pure: true,
})

export type MenuItemProps = PropsOf<typeof StyledMenuItem> &
  Omit<UseMenuItemProps, "context"> & {
    /**
     * The icon to render before the menu item's label.
     */
    icon?: React.ReactElement
    /**
     * The spacing between the icon and menu item's label
     */
    iconSpacing?: SystemProps["mr"]
    /**
     * Right-aligned label text content, useful for displaying hotkeys.
     */
    command?: string
  }

export const MenuItem = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<any>) => {
    const {
      icon,
      iconSpacing = "0.75rem",
      command,
      children,
      ...htmlProps
    } = props

    const context = useMenuContext()

    const ownProps = useMenuItem({ context, ...htmlProps })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return (
      <StyledMenuItem {...ownProps} ref={ownRef}>
        {icon && <MenuItemIcon mr={iconSpacing} children={icon} />}
        <chakra.span flex="1">{children}</chakra.span>
        {command && <MenuItemCommand children={command} />}
      </StyledMenuItem>
    )
  },
)

if (__DEV__) {
  MenuItem.displayName = "MenuItem"
}

export type MenuItemOptionProps = Omit<UseMenuOptionProps, "context"> &
  PropsOf<typeof StyledMenuItem>

export const MenuItemOption = React.forwardRef(
  (props: MenuItemOptionProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuOption({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return <StyledMenuItem {...ownProps} ref={ownRef} />
  },
)

if (__DEV__) {
  MenuItemOption.displayName = "MenuItemOption"
}

export type MenuOptionGroupProps = UseMenuOptionGroupProps &
  Omit<MenuGroupProps, "value" | "default" | "onChange">

export const MenuOptionGroup = (props: MenuOptionGroupProps) => {
  const { children, ...rest } = useMenuOptionGroup(props)
  return <MenuGroup title={props.title} children={children} {...rest} />
}

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup"
}

const StyledTitle = chakra("p", {
  themeKey: "Menu.MenuGroupTitle",
  pure: true,
})

export type MenuGroupProps = PropsOf<typeof StyledTitle>

export const MenuGroup = (props: MenuGroupProps) => {
  const { title, children, className, ...rest } = props

  return (
    <chakra.div className="chakra-menu__group" role="group">
      {title && (
        <StyledTitle
          className={cx("chakra-menu__group__title", className)}
          {...rest}
        >
          {title}
        </StyledTitle>
      )}
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}

export const MenuItemCommand = chakra("span", {
  baseStyle: { opacity: 0.6 },
  attrs: {
    className: "chakra-menu__command",
  },
  pure: true,
})

if (__DEV__) {
  MenuItemCommand.displayName = "MenuItemCommand"
}

export const MenuItemIcon = (props: PropsOf<typeof chakra.div>) => {
  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement(child)
    ? React.cloneElement(child, {
        focusable: "false",
        "aria-hidden": true,
        className: cx("chakra-menu__icon", child.props.className),
      })
    : null

  return (
    <chakra.span
      flexShrink={0}
      className={cx("chakra-menu__icon-wrapper", props.className)}
      {...rest}
    >
      {clone}
    </chakra.span>
  )
}

if (__DEV__) {
  MenuItemIcon.displayName = "MenuItemIcon"
}

export type MenuDividerProps = PropsOf<typeof chakra.hr>

export const MenuDivider = (props: MenuDividerProps) => (
  <chakra.hr
    role="separator"
    opacity={0.6}
    aria-orientation="horizontal"
    borderBottom="1px solid"
    borderColor="inherit"
    marginTop="0.5rem"
    marginBottom="1rem"
    {...props}
    className={cx("chakra-menu__divider", props.className)}
  />
)

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
