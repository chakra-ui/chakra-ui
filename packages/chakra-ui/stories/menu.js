import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../src/Button";
import Menu, {
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from "../src/Menu";
import { MenuItemOption, MenuOptionsGroup } from "../src/Menu/MenuOption";

const stories = storiesOf("Menu", module);

stories.add("Menu without icons", () => (
  <Menu autoSelect>
    <MenuButton color="blue" appearance="ghost" as={Button}>
      Trigger
    </MenuButton>
    <MenuList minWidth="240px">
      <MenuGroup title="Group 1">
        <MenuItem icon="add">Share...</MenuItem>
        <MenuItem icon="phone" label="⌘M">
          Move...
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Group 2">
        <MenuItem>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
));

stories.add("MenuList", () => (
  <Menu autoSelect isOpen>
    <MenuList minWidth="240px">
      <MenuGroup title="Group 1">
        <MenuItem icon="add">Share...</MenuItem>
        <MenuItem icon="phone" label="⌘M">
          Move...
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Group 2">
        <MenuItem>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
));

stories.add("MenuItem Radio", () => (
  <Menu autoSelect closeOnOutsideClick>
    <MenuButton color="blue" appearance="ghost" as={Button}>
      MenuItem
    </MenuButton>
    <MenuList minWidth="240px">
      <MenuOptionsGroup value="move" title="Group 1" type="radio">
        <MenuItemOption value="share">Share...</MenuItemOption>
        <MenuItemOption value="move">Move...</MenuItemOption>
      </MenuOptionsGroup>
      <MenuDivider />
      <MenuGroup title="Group 2">
        <MenuItem>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuOptionsGroup title="Group 2" type="checkbox">
        <MenuItemOption value="rename">Rename...</MenuItemOption>
        <MenuItemOption value="delete">Delete...</MenuItemOption>
      </MenuOptionsGroup>
    </MenuList>
  </Menu>
));
