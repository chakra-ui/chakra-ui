import { chakra, PropsOf } from "@chakra-ui/system"
import { createContext, mergeRefs, __DEV__ } from "@chakra-ui/utils"
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
  isSubmenu?: boolean
}

// change the themekey to menu.button
const StyledMenuButton = chakra("button", {
  themeKey: "Button",
})

export const MenuButton = React.forwardRef(
  (props: MenuButtonProps, ref: React.Ref<any>) => {
    const { isSubmenu, ...rest } = props

    const context = useMenuContext()
    const ownProps = useMenuButton({ context, ...rest })
    const ownRef = mergeRefs(ref, ownProps.ref)

    const Comp = isSubmenu ? StyledMenuItem : StyledMenuButton

    return <Comp data-chakra-menu-button="" {...ownProps} ref={ownRef} />
  },
)

if (__DEV__) {
  MenuButton.displayName = "MenuButton"
}

export type MenuListProps = PropsOf<typeof StyledMenuList>

const StyledMenuList = chakra("div", {
  themeKey: "Menu.MenuList",
  baseStyle: {
    maxWidth: "120px",
    fontSize: "sm",
  },
})

export const MenuList = React.forwardRef(
  (props: MenuListProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuList({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return (
      <StyledMenuList
        data-chakra-menu-list=""
        {...ownProps}
        {...(props.hidden != null && { hidden: props.hidden })}
        ref={ownRef}
      />
    )
  },
)

if (__DEV__) {
  MenuList.displayName = "MenuList"
}

const StyledMenuItem = chakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: { padding: 3 },
})

export type MenuItemProps = PropsOf<typeof StyledMenuItem> &
  Omit<UseMenuItemProps, "context">

export const MenuItem = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuItem({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return <StyledMenuItem {...ownProps} ref={ownRef} />
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

export const MenuOptionGroup = (props: any) => {
  //@ts-ignore
  const { children, title, ...rest } = useMenuOptionGroup(props)
  return <MenuGroup title={props.title} children={children} {...rest} />
}

const StyledMenuGroup = chakra("div")

export const MenuGroup = (props: any) => {
  const { title, children, ...rest } = props

  return (
    <StyledMenuGroup role="group">
      {title && (
        <chakra.p
          marginX={3}
          marginY={2}
          fontWeight="semibold"
          fontSize="sm"
          {...rest}
        >
          {title}
        </chakra.p>
      )}
      {children}
    </StyledMenuGroup>
  )
}

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}

//TODO: Implement these
export const MenuItemCommand = () => {}

if (__DEV__) {
  MenuItemCommand.displayName = "MenuItemCommand"
}

//TODO: Implement these
export const MenuItemIcon = () => {}

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
  />
)

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
