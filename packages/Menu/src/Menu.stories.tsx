import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BaseMenuButton, BaseMenuItem, BaseMenuList, Menu } from "./Menu.base";
import { createChakra } from "@chakra-ui/system";
import setup from "../story.setup";

const stories = storiesOf("Menu", module).addDecorator(setup);

const MenuButton = createChakra(BaseMenuButton, { themeKey: "Button" });
const MenuList = createChakra(BaseMenuList, { themeKey: "Menu.MenuList" });
const MenuItem = createChakra(BaseMenuItem, { themeKey: "Menu.MenuItem" });

const Submenu = React.forwardRef((props, ref) => {
  return (
    <Menu>
      <BaseMenuButton ref={ref} {...props}>
        Submenu 1
      </BaseMenuButton>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
      </MenuList>
    </Menu>
  );
});

function SampleMenu() {
  return (
    <Menu>
      <MenuButton variant="solid" variantColor="green" variantSize="md">
        Open menu
      </MenuButton>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <BaseMenuItem as={Submenu} />
      </MenuList>
    </Menu>
  );
}

stories.add("Default", () => <SampleMenu />);
