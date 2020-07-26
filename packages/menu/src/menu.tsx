import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  cx,
  mergeRefs,
  ReactNodeOrRenderProp,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"
import React, { ReactElement, Ref, useMemo } from "react"
import {
  MenuContextProvider,
  useMenu,
  useMenuButton,
  useMenuItem,
  UseMenuItemProps,
  useMenuList,
  useMenuOption,
  useMenuOptionGroup,
  UseMenuOptionGroupProps,
  UseMenuOptionProps,
  UseMenuProps,
} from "./use-menu"

export type MenuProps = UseMenuProps &
  ThemingProps & {
    children: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
  }

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export function Menu(props: MenuProps) {
  const styles = useMultiStyleConfig("Menu", props)
  const realProps = omitThemingProps(props)

  const ctx = useMenu(realProps)
  const context = useMemo(() => ctx, [ctx])

  return (
    <MenuContextProvider value={context}>
      <StylesProvider value={styles}>
        {runIfFn(props.children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
        })}
      </StylesProvider>
    </MenuContextProvider>
  )
}

if (__DEV__) {
  Menu.displayName = "Menu"
}

export type MenuButtonProps = PropsOf<typeof chakra.button> & {
  submenuIcon?: ReactElement
}

const StyledMenuButton = React.forwardRef(function StyledMenuButton(
  props: PropsOf<typeof chakra.button>,
  ref: Ref<any>,
) {
  const styles = useStyles()
  return (
    <chakra.button
      ref={ref}
      {...props}
      __css={{
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        outline: 0,
        transition: "all 250ms",
        ...styles.button,
      }}
    />
  )
})

/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 */
export const MenuButton = forwardRef<MenuButtonProps>(function MenuButton(
  props,
  ref,
) {
  const { children, submenuIcon, as: Comp, ...otherProps } = props

  const ownProps = useMenuButton(otherProps)
  const ownRef = mergeRefs(ref, ownProps.ref)

  const Wrapper = Comp || StyledMenuButton

  return (
    <Wrapper {...ownProps} ref={ownRef}>
      <chakra.span
        __css={{
          pointerEvents: "none",
          flex: "1",
        }}
      >
        {props.children}
      </chakra.span>
    </Wrapper>
  )
})

if (__DEV__) {
  MenuButton.displayName = "MenuButton"
}

//////////////////////////////////////////////////////////////////////////

export type MenuListProps = PropsOf<typeof chakra.div>

export const MenuList = React.forwardRef(function MenuList(
  props: MenuListProps,
  ref: Ref<any>,
) {
  const menulist = useMenuList(props)
  const styles = useStyles()
  return (
    <chakra.div
      {...menulist}
      ref={mergeRefs(menulist.ref, ref)}
      __css={{
        outline: 0,
        ...styles.list,
      }}
    />
  )
})

if (__DEV__) {
  MenuList.displayName = "MenuList"
}

//////////////////////////////////////////////////////////////////////////

const StyledMenuItem = React.forwardRef(function StyledMenuItem(
  props: PropsOf<typeof chakra.button>,
  ref: Ref<any>,
) {
  const styles = useStyles()
  return (
    <chakra.button
      ref={ref}
      {...props}
      __css={{
        textDecoration: "none",
        color: "inherit",
        userSelect: "none",
        display: "flex",
        width: "100%",
        alignItems: "center",
        textAlign: "left",
        flex: "0 0 auto",
        outline: 0,
        ...styles.item,
      }}
    />
  )
})

interface MenuItemOptions extends Omit<UseMenuItemProps, "context"> {
  /**
   * The icon to render before the menu item's label.
   */
  icon?: ReactElement
  /**
   * The spacing between the icon and menu item's label
   */
  iconSpacing?: SystemProps["mr"]
  /**
   * Right-aligned label text content, useful for displaying hotkeys.
   */
  command?: string
}

export type MenuItemProps = PropsOf<typeof StyledMenuItem> & MenuItemOptions

export const MenuItem = forwardRef<MenuItemProps>(function MenuItem(
  props,
  ref,
) {
  const {
    icon,
    iconSpacing = "0.75rem",
    command,
    children,
    ...otherProps
  } = props

  const ownProps = useMenuItem(otherProps)
  const ownRef = mergeRefs(ownProps.ref, ref)

  const shouldWrap = icon || command

  const _children = shouldWrap ? (
    <chakra.span pointerEvents="none" flex="1">
      {children}
    </chakra.span>
  ) : (
    children
  )

  return (
    <StyledMenuItem {...ownProps} ref={ownRef}>
      {icon && <MenuIcon fontSize="0.8em" mr={iconSpacing} children={icon} />}
      {_children}
      {command && <MenuCommand children={command} />}
    </StyledMenuItem>
  )
})

if (__DEV__) {
  MenuItem.displayName = "MenuItem"
}

//////////////////////////////////////////////////////////////////////////

export type MenuItemOptionProps = Omit<UseMenuOptionProps, "context"> &
  PropsOf<typeof StyledMenuItem> & {
    icon?: ReactElement
    iconSpacing?: SystemProps["mr"]
  }

const CheckIcon = (props: PropsOf<"svg">) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export const MenuItemOption = forwardRef<MenuItemOptionProps>(
  function MenuItemOption(props, ref) {
    const { icon, iconSpacing = "0.75rem", ...htmlProps } = props

    const ownProps = useMenuOption(htmlProps)
    const ownRef = mergeRefs(ownProps.ref, ref)

    return (
      <StyledMenuItem {...ownProps} ref={ownRef}>
        <MenuIcon
          fontSize="0.8em"
          children={icon || <CheckIcon />}
          mr={iconSpacing}
          visibility={props.isChecked ? "visible" : "hidden"}
        />
        <chakra.span flex="1">{ownProps.children}</chakra.span>
      </StyledMenuItem>
    )
  },
)

if (__DEV__) {
  MenuItemOption.displayName = "MenuItemOption"
}

//////////////////////////////////////////////////////////////////////////

export type MenuOptionGroupProps = UseMenuOptionGroupProps &
  Omit<MenuGroupProps, "value" | "default" | "onChange">

export const MenuOptionGroup = (props: MenuOptionGroupProps) => {
  const { children, ...rest } = useMenuOptionGroup(props)
  return <MenuGroup title={props.title} children={children} {...rest} />
}

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup"
}

//////////////////////////////////////////////////////////////////////////

export type MenuGroupProps = PropsOf<typeof chakra.p>

export const MenuGroup = (props: MenuGroupProps) => {
  const { title, children, className, ...rest } = props

  const _className = cx("chakra-menu__group__title", className)
  const styles = useStyles()

  return (
    <chakra.div className="chakra-menu__group" role="group">
      {title && (
        <chakra.p className={_className} {...rest} __css={styles.groupTitle}>
          {title}
        </chakra.p>
      )}
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}

//////////////////////////////////////////////////////////////////////////

export const MenuCommand = (props: PropsOf<typeof chakra.span>) => {
  const styles = useStyles()
  return (
    <chakra.span
      {...props}
      __css={styles.command}
      className="chakra-menu__command"
    />
  )
}

if (__DEV__) {
  MenuCommand.displayName = "MenuCommand"
}

//////////////////////////////////////////////////////////////////////////

export function MenuIcon(props: PropsOf<typeof chakra.span>) {
  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement(child)
    ? React.cloneElement(child, {
        focusable: "false",
        "aria-hidden": true,
        className: cx("chakra-menu__icon", child.props.className),
      })
    : null

  const _className = cx("chakra-menu__icon-wrapper", className)

  return (
    <chakra.span
      className={_className}
      {...rest}
      __css={{
        flexShrink: 0,
      }}
    >
      {clone}
    </chakra.span>
  )
}

if (__DEV__) {
  MenuIcon.displayName = "MenuIcon"
}

export type MenuDividerProps = PropsOf<typeof chakra.hr>

export const MenuDivider = (props: MenuDividerProps) => {
  const { className, ...rest } = props
  const _className = cx("chakra-menu__divider", className)
  return (
    <chakra.hr
      role="separator"
      aria-orientation="horizontal"
      className={_className}
      {...rest}
      __css={{
        border: 0,
        borderBottom: "1px solid",
        borderColor: "inherit",
        mt: "0.5rem",
        mb: "1rem",
        opacity: 0.6,
      }}
    />
  )
}

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
