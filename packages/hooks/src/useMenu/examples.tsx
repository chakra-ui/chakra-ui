import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  MenuProvider,
  useMenuButton,
  useMenuItem,
  useMenuList,
} from "./useMenu";

const stories = storiesOf("useMenu", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

function MenuButton(props: any) {
  const button = useMenuButton(props);
  return <button {...(button as any)} />;
}

function MenuList(props: any) {
  const menulist = useMenuList(props);
  return (
    <div
      {...(menulist as any)}
      style={{ ...menulist.style, width: 400, background: "red" }}
    />
  );
}

function MenuItem(props: any) {
  const menuitem = useMenuItem(props);
  return <div {...(menuitem as any)} />;
}

stories.add("Default", () => (
  <MenuProvider closeOnSelect autoSelect closeOnBlur>
    <MenuButton>Button</MenuButton>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <hr />
      <MenuItem>Menu 2</MenuItem>
      <hr />
      <MenuItem>Menu 3</MenuItem>
    </MenuList>
  </MenuProvider>
));
