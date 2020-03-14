import * as React from "react"
import {
  MenuHookReturn,
  useMenu,
  useMenuDisclosure,
  useMenuList,
  useMenuItem,
  MenuItemHookProps,
} from "./Menu.hook"
import { createContext, mergeRefs } from "@chakra-ui/utils"
import { PropsOf, createChakra } from "@chakra-ui/system"

const [MenuContextProvider, useMenuContext] = createContext<MenuHookReturn>({
  strict: false,
})

export function Menu(props: { children: React.ReactNode }) {
  const parentMenu = useMenuContext()
  const context = useMenu({ context: parentMenu })
  return (
    <MenuContextProvider value={context}>{props.children}</MenuContextProvider>
  )
}

export type MenuButtonProps = PropsOf<typeof StyledMenuButton> & {
  isSubmenu?: boolean
}

// change the themekey to menu.button
const StyledMenuButton = createChakra("button", { themeKey: "Button" })
const StyledMenuItem = createChakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: { padding: 3 },
})

export const MenuButton = React.forwardRef(
  (props: MenuButtonProps, ref: React.Ref<any>) => {
    const { isSubmenu, ...rest } = props

    const context = useMenuContext()
    const ownProps = useMenuDisclosure({ context, ...rest })
    const ownRef = mergeRefs(ref, ownProps.ref)

    const Comp = isSubmenu ? StyledMenuItem : StyledMenuButton

    return <Comp data-chakra-menu-button="" {...ownProps} ref={ownRef} />
  },
)

export type MenuListProps = PropsOf<typeof StyledMenuList>

const StyledMenuList = createChakra("div", {
  themeKey: "Menu.MenuList",
  baseStyle: {
    minWidth: "200px",
  },
})

export const MenuList = React.forwardRef(
  (props: MenuListProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuList({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return (
      <StyledMenuList data-chakra-menu-list="" {...ownProps} ref={ownRef} />
    )
  },
)

export type MenuItemProps = PropsOf<"div"> & {
  as?: React.ElementType
  isDisabled?: boolean
  isFocusable?: boolean
}

export const MenuItem = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuItem({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return <StyledMenuItem {...ownProps} ref={ownRef} />
  },
)
