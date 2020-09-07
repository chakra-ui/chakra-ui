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
import * as React from "react"
import {
  MenuProvider,
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
  UseMenuOptionOptions,
} from "./use-menu"

export interface MenuProps extends UseMenuProps, ThemingProps {
  children: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const styles = useMultiStyleConfig("Menu", props)
  const ownProps = omitThemingProps(props)

  const ctx = useMenu(ownProps)
  const context = React.useMemo(() => ctx, [ctx])

  return (
    <MenuProvider value={context}>
      <StylesProvider value={styles}>
        {runIfFn(props.children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
        })}
      </StylesProvider>
    </MenuProvider>
  )
}

if (__DEV__) {
  Menu.displayName = "Menu"
}

export interface MenuButtonProps extends PropsOf<typeof chakra.button> {}

const StyledMenuButton = forwardRef<MenuButtonProps, "button">(
  function StyledMenuButton(props, ref) {
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
  },
)

/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 */
export const MenuButton = forwardRef<MenuButtonProps, "button">(
  function MenuButton(props, ref) {
    const { children, as: Comp, ...otherProps } = props

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
  },
)

if (__DEV__) {
  MenuButton.displayName = "MenuButton"
}

//////////////////////////////////////////////////////////////////////////

export interface MenuListProps extends PropsOf<typeof chakra.div> {}

export const MenuList = forwardRef<MenuListProps, "div">(function MenuList(
  props,
  ref,
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

export interface StyledMenuItemProps extends PropsOf<typeof chakra.button> {}

const StyledMenuItem = forwardRef<StyledMenuItemProps, "button">(
  function StyledMenuItem(props, ref) {
    const styles = useStyles()

    // given another component, use its type if present
    // else, use no type to avoid invalid html, e.g. <a type="button" />
    // else, fall back to "button"
    const type = props.as ? props.type ?? undefined : "button"

    return (
      <chakra.button
        ref={ref}
        type={type}
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
  },
)

interface MenuItemOptions
  extends Pick<UseMenuItemProps, "isDisabled" | "isFocusable"> {
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

export interface MenuItemProps
  extends PropsOf<typeof chakra.button>,
    MenuItemOptions {}

export const MenuItem = forwardRef<MenuItemProps, "button">(function MenuItem(
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

export interface MenuItemOptionProps
  extends UseMenuOptionOptions,
    Omit<PropsOf<typeof StyledMenuItem>, keyof UseMenuOptionOptions> {
  icon?: React.ReactElement
  iconSpacing?: SystemProps["mr"]
}

const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export const MenuItemOption = forwardRef<MenuItemOptionProps, "button">(
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

MenuItemOption.id = "MenuItemOption"

if (__DEV__) {
  MenuItemOption.displayName = "MenuItemOption"
}

//////////////////////////////////////////////////////////////////////////

export interface MenuOptionGroupProps
  extends UseMenuOptionGroupProps,
    Omit<MenuGroupProps, "value" | "defaultValue" | "onChange"> {}

export const MenuOptionGroup: React.FC<MenuOptionGroupProps> = (props) => {
  const { children, ...rest } = useMenuOptionGroup(props)
  return <MenuGroup title={props.title} children={children} {...rest} />
}

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup"
}

//////////////////////////////////////////////////////////////////////////

export interface MenuGroupProps extends PropsOf<typeof chakra.div> {}

export const MenuGroup = forwardRef<MenuGroupProps, "div">(function MenuGroup(
  props,
  ref,
) {
  const { title, children, className, ...rest } = props

  const _className = cx("chakra-menu__group__title", className)
  const styles = useStyles()

  return (
    <chakra.div ref={ref} className="chakra-menu__group" role="group">
      {title && (
        <chakra.p className={_className} {...rest} __css={styles.groupTitle}>
          {title}
        </chakra.p>
      )}
      {children}
    </chakra.div>
  )
})

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}

//////////////////////////////////////////////////////////////////////////

export interface MenuCommandProps extends PropsOf<typeof chakra.span> {}

export const MenuCommand = forwardRef<MenuCommandProps, "span">(
  function MenuCommand(props, ref) {
    const styles = useStyles()
    return (
      <chakra.span
        ref={ref}
        {...props}
        __css={styles.command}
        className="chakra-menu__command"
      />
    )
  },
)

if (__DEV__) {
  MenuCommand.displayName = "MenuCommand"
}

//////////////////////////////////////////////////////////////////////////

export const MenuIcon: React.FC<PropsOf<typeof chakra.span>> = (props) => {
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

export interface MenuDividerProps extends PropsOf<typeof chakra.hr> {}

export const MenuDivider: React.FC<MenuDividerProps> = (props) => {
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
        my: "0.5rem",
        opacity: 0.6,
      }}
    />
  )
}

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
