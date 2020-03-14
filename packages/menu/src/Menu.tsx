import { createChakra, PropsOf } from "@chakra-ui/system"
import { createContext, mergeRefs } from "@chakra-ui/utils"
import * as React from "react"
import {
  MenuHookReturn,
  useMenu,
  useMenuButton,
  useMenuItem,
  useMenuList,
} from "./Menu.hook"

const [MenuContextProvider, useMenuContext] = createContext<MenuHookReturn>({
  strict: false,
})

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}

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
    const ownProps = useMenuButton({ context, ...rest })
    const ownRef = mergeRefs(ref, ownProps.ref)

    const Comp = isSubmenu ? StyledMenuItem : StyledMenuButton

    return <Comp data-chakra-menu-button="" {...ownProps} ref={ownRef} />
  },
)

export type MenuListProps = PropsOf<typeof StyledMenuList>

const StyledMenuList = createChakra("div", {
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
