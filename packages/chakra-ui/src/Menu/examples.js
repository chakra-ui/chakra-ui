import { storiesOf } from "@storybook/react";
import React from "react";
import Menu, {
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from ".";
// import { MenuItemOption, MenuOptionsGroup } from "./MenuOption";
import Box from "../Box";
import Button from "../Button";

const stories = storiesOf("Menu", module).addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

stories.add("Default", () => (
  <Menu autoSelect>
    <MenuButton as={Button}>Open Menu</MenuButton>

    <MenuList minWidth="200px">
      <MenuGroup label="Group 1">
        <MenuItem>Share</MenuItem>
        <MenuItem>Move</MenuItem>
      </MenuGroup>

      <MenuDivider />

      <MenuGroup label="Group 2">
        <MenuItem onClick={() => alert("Rename Clicked")}>Rename</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
));

stories.add("MenuList only", () => (
  <Menu autoSelect isOpen closeOnSelect={false}>
    <MenuList minWidth="240px">
      <MenuGroup label="Group 1">
        <MenuItem>Share...</MenuItem>
        <MenuItem>Move...</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup label="Group 2">
        <MenuItem isDisabled>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
));

// stories.add("MenuItem Radio", () => (
//   <Menu autoSelect closeOnOutsideClick>
//     <MenuButton color="blue">MenuItem</MenuButton>
//     <MenuList minWidth="240px">
//       <MenuOptionsGroup value="move" title="Group 1" type="radio">
//         <MenuItemOption value="share">Share...</MenuItemOption>
//         <MenuItemOption value="move">Move...</MenuItemOption>
//       </MenuOptionsGroup>
//       <MenuDivider />
//       <MenuGroup title="Group 2">
//         <MenuItem>Rename...</MenuItem>
//         <MenuItem>Delete...</MenuItem>
//       </MenuGroup>
//       <MenuDivider />
//       <MenuOptionsGroup title="Group 2" type="checkbox">
//         <MenuItemOption value="rename">Rename...</MenuItemOption>
//         <MenuItemOption value="delete">Delete...</MenuItemOption>
//       </MenuOptionsGroup>
//     </MenuList>
//   </Menu>
// ));
