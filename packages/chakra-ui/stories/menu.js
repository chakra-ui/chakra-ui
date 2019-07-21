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
import { Box } from "../src/Layout";

const stories = storiesOf("Menu", module).addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

/* 
<menu type="context" id="mymenu">
  <menuitem label="Refresh" onclick="window.location.reload();" icon="ico_reload.png"></menuitem>
  <menu label="Share on...">
    <menuitem label="Twitter" icon="ico_twitter.png" onclick="window.open('//twitter.com/intent/tweet?text=' + window.location.href);"></menuitem>
    <menuitem label="Facebook" icon="ico_facebook.png" onclick="window.open('//facebook.com/sharer/sharer.php?u=' + window.location.href);"></menuitem>
  </menu>
  <menuitem label="Email This Page" onclick="window.location='mailto:?body='+window.location.href;"></menuitem>
</menu>
*/

stories.add("Menu without icons", () => (
  <Menu autoSelect>
    <MenuButton color="blue">Trigger</MenuButton>
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
    <MenuButton color="blue">MenuItem</MenuButton>
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
