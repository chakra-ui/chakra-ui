import { storiesOf } from "@storybook/react";
import React from "react";
import Menu, {
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from ".";
import Box from "../Box";
import Button from "../Button";
import Icon from "../Icon";
import { MenuOptionGroup, MenuItemOption } from "./MenuOption";

const stories = storiesOf("Menu", module);

// stories.addDecorator(story => (
//   <Box maxWidth="md" mx="auto" mt="600px">
//     {story()}
//   </Box>
// ));

stories.add("Default", () => (
  <Menu>
    <MenuButton as={Button} variantColor="blue">
      Open Menu
    </MenuButton>

    <MenuList minWidth="200px">
      <MenuItem>Share</MenuItem>
      <MenuItem>Move</MenuItem>
      <MenuDivider />
      <MenuItem>Rename</MenuItem>
      <MenuItem>Delete</MenuItem>
    </MenuList>
  </Menu>
));

stories.add("MenuList only", () => (
  <Menu autoSelect defaultIsOpen closeOnSelect={false}>
    <MenuList minWidth="240px">
      <MenuGroup title="Group 1">
        <MenuItem>Share...</MenuItem>
        <MenuItem>Move...</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Group 2">
        <MenuItem isDisabled>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
));

stories.add("MenuItem Radio", () => (
  <Menu closeOnSelect={false}>
    <MenuButton as={Button} variantColor="blue">
      MenuItem
    </MenuButton>
    <MenuList minWidth="240px">
      <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
        <MenuItemOption _checked={{ color: "blue.500" }} value="asc">
          Ascending
        </MenuItemOption>
        <MenuItemOption value="desc">Descending</MenuItemOption>
      </MenuOptionGroup>
      <MenuDivider />

      <MenuOptionGroup title="Country" type="checkbox">
        <MenuItemOption value="email">Email</MenuItemOption>
        <MenuItemOption value="phone">Phone</MenuItemOption>
        <MenuItemOption value="country">Country</MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
));

function CustomMenu() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon="chevron-down">
        <Icon name="settings" />
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Upload</MenuItem>
      </MenuList>
    </Menu>
  );
}

stories.add("Bug fix", () => (
  <div style={{ float: "right" }}>
    <CustomMenu />
    <CustomMenu />
  </div>
));
