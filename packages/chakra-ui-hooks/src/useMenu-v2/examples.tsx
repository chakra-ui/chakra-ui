import { createChakra, forwardRef } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  MenuProvider,
  useMenu,
  useMenuDisclosure,
  useMenuItem,
} from "./useMenu";

const stories = storiesOf("useMenu v2", module);

//@ts-ignore
const MenuDisclosure = createChakra("button", {
  hook: useMenuDisclosure,
});

const Menu = createChakra("div", {
  hook: useMenu,
});

Menu.defaultProps = {
  color: "#212121",
  bg: "white",
  p: "0.25rem",
  rounded: "0.25rem",
  border: "1px solid rgba(33, 33, 33, 0.25)",
  outline: 0,
  width: "240px",
};

const MenuItem = createChakra("button", {
  hook: useMenuItem,
});

MenuItem.defaultProps = {
  border: 0,
  width: "100%",
  padding: "0.5em 0.24em",
  color: "#212121",
  _focus: {
    bg: "#006DFF",
    color: "white",
  },
  _expanded: {
    bg: "#006DFF",
    color: "white",
  },
};

const Submenu2 = forwardRef((props, ref) => {
  return (
    <MenuProvider>
      <MenuDisclosure ref={ref} {...props}>
        Open submenu 2
      </MenuDisclosure>
      <Menu>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
      </Menu>
    </MenuProvider>
  );
});

const Submenu = forwardRef((props, ref) => {
  return (
    <MenuProvider>
      <MenuDisclosure ref={ref} {...props}>
        Open submenu
      </MenuDisclosure>
      <Menu>
        <MenuItem onClick={() => console.log("submenu")}>Submenu 1</MenuItem>
        <MenuItem as={Submenu2} />
      </Menu>
    </MenuProvider>
  );
});

function SampleMenu() {
  return (
    <MenuProvider>
      <MenuDisclosure
        bg="#006DFF"
        color="white"
        p="0.375em 0.75em"
        rounded="0.25rem"
      >
        Open menu
      </MenuDisclosure>
      <Menu>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <MenuItem as={Submenu} />
      </Menu>
    </MenuProvider>
  );
}

stories.add("Default", () => <SampleMenu />);
