import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BaseMenuButton, BaseMenuItem, BaseMenuList, Menu } from "./Menu.base";

const stories = storiesOf("Menu", module);

const Submenu = React.forwardRef((props, ref) => {
  return (
    <Menu>
      <BaseMenuButton
        ref={ref}
        style={{ minWidth: 200, background: "white", border: "1px solid" }}
        {...props}
      >
        Submenu 1
      </BaseMenuButton>
      <BaseMenuList
        style={{ minWidth: 200, background: "white", border: "1px solid" }}
      >
        <BaseMenuItem>Menu 1</BaseMenuItem>
        <BaseMenuItem>Menu 2</BaseMenuItem>
      </BaseMenuList>
    </Menu>
  );
});

function SampleMenu() {
  return (
    <Menu>
      <BaseMenuButton>Open menu</BaseMenuButton>
      <BaseMenuList
        style={{ minWidth: 200, background: "white", border: "1px solid" }}
      >
        <BaseMenuItem>Menu 1</BaseMenuItem>
        <BaseMenuItem>Menu 2</BaseMenuItem>
        <BaseMenuItem as={Submenu} />
      </BaseMenuList>
    </Menu>
  );
}

stories.add("Default", () => <SampleMenu />);
