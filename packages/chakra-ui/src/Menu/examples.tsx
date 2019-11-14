import { storiesOf } from "@storybook/react";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from ".";
// import { Box } from "@chakra-ui/layout";
import { Button, ButtonOptions } from "../Button";
import { Icon } from "../Icon";
// import { MenuOptionGroup, MenuItemOption } from "./MenuOption";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
// import { useDisclosure } from "@chakra-ui/hooks";
import {
  CheckExample,
  RadioExample,
  MenuItemOption,
  MenuOptionGroup,
} from "./MenuOption";

const stories = storiesOf("Menu", module);

stories.addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => (
  <>
    <Menu>
      <MenuButton<ButtonOptions> as={Button} variantColor="blue">
        Open Menu
      </MenuButton>
      <MenuList width="200px">
        <MenuItem>Share</MenuItem>
        <MenuItem>Move</MenuItem>
        <MenuDivider />
        <MenuItem>Rename</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  </>
));

stories.add("MenuList only", () => (
  <Menu autoSelect defaultIsOpen defaultActiveIndex={1} closeOnSelect={false}>
    <MenuButton></MenuButton>
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
  <Menu closeOnBlur={false} closeOnSelect={false}>
    <MenuButton<ButtonOptions> as={Button} variantColor="blue">
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
      <MenuButton<ButtonOptions>
        style={{ float: "right" }}
        as={Button}
        rightIcon="chevron-down"
      >
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
  <>
    <CustomMenu />
    <CustomMenu />
  </>
));

stories.add("Testing", () => (
  <CheckExample defaultValue={["opt1"]} onChange={val => console.log(val)} />
));

stories.add("Testing Radio", () => (
  <RadioExample defaultValue={"opt1"} onChange={val => console.log(val)} />
));
