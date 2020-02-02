import { storiesOf } from "@storybook/react";
import * as React from "react";
import setup from "../../story.setup";
import createChakra from "./create-chakra";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

const Button = createChakra("button", {
  themeKey: "Button",
  attrs: { type: "button" },
});

Button.displayName = "Button";

Button.defaultProps = {
  variantSize: "md",
  variant: "solid",
  variantColor: "green",
};

stories.add("button - basic", () => (
  <Button marginTop="40px">This is my button</Button>
));

stories.add("button - theming", () => (
  <Button
    bg="transparent"
    border="0"
    variantSize="sm"
    variant="link"
    variantColor="blue"
  >
    This is my button
  </Button>
));

////////////////////////////////////////////////////////////////////

const Alert = createChakra("div", { themeKey: "Alert" });

stories.add("alert", () => (
  <Alert variant="solid" variantColor="green" role="alert">
    Welcome to alert
  </Alert>
));

////////////////////////////////////////////////////////////////////

const MenuList = createChakra("div", {
  themeKey: "Menu.MenuList",
});

const MenuItem = createChakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    padding: 3,
    textAlign: "left",
  },
});

stories.add("subcomponents - menulist", () => (
  <MenuList>
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <MenuItem>Menu 3</MenuItem>
  </MenuList>
));

////////////////////////////////////////////////////////////////////////

const TabList = createChakra("div", {
  themeKey: "Tabs.TabList",
  baseStyle: {
    display: "flex",
  },
});

TabList.displayName = "TabList";

TabList.defaultProps = {
  variant: "line",
};

const Tab = createChakra("div", {
  themeKey: "Tabs.Tab",
});

Tab.displayName = "Tab";

Tab.defaultProps = {
  variant: "line",
  variantColor: "blue",
  variantSize: "md",
};

stories.add("subcomponents - Tabs", () => (
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab variantColor="orange" data-selected="">
      Tab 2
    </Tab>
  </TabList>
));
