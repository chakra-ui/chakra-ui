import { createChakra } from "@chakra-ui/system"
import * as React from "react"
import { BaseMenuButton, BaseMenuItem, BaseMenuList, Menu } from "./Menu.base"

export default {
  title: "Menu",
}

const MenuButton = createChakra(BaseMenuButton, { themeKey: "Button" })

const MenuList = createChakra(BaseMenuList, {
  themeKey: "Menu.MenuList",
  baseStyle: {
    minWidth: "200px",
  },
})

const Submenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
  return (
    <Menu>
      <BaseMenuButton
        ref={ref}
        style={{ width: "100%", textAlign: "left" }}
        {...props}
      >
        Submenu >>
      </BaseMenuButton>
      <MenuList>
        <BaseMenuItem>Menu 1</BaseMenuItem>
        <BaseMenuItem>Menu 2</BaseMenuItem>
      </MenuList>
    </Menu>
  )
})

export function SampleMenu() {
  return (
    <Menu>
      <MenuButton variant="solid" variantColor="green" variantSize="sm">
        Open menu
      </MenuButton>
      <MenuList>
        <BaseMenuItem>Menu 1</BaseMenuItem>
        <BaseMenuItem>Menu 2</BaseMenuItem>
        <BaseMenuItem
          onClick={() => {
            console.log("menu 3 clicked")
          }}
        >
          Menu 3
        </BaseMenuItem>
        <BaseMenuItem as={Submenu} />
        <BaseMenuItem>Menu 4</BaseMenuItem>
      </MenuList>
    </Menu>
  )
}
