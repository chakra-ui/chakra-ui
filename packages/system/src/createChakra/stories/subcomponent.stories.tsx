/**@jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import setup from "../../../story.setup";
import createChakra from "../create-chakra";

const stories = storiesOf("subcomponent", module);

stories.addDecorator(setup);

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

stories.add("menulist", () => (
  <MenuList>
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <MenuItem>Menu 3</MenuItem>
  </MenuList>
));

const TabList = createChakra("div", {
  themeKey: "Tabs.TabList",
  baseStyle: {
    display: "flex",
  },
});

TabList.defaultProps = {
  variant: "line",
};

const Tab = createChakra("div", {
  themeKey: "Tabs.Tab",
});

Tab.defaultProps = {
  variant: "line",
  variantColor: "blue",
  variantSize: "md",
};

stories.add("styled", () => (
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab variantColor="orange" data-selected="">
      Tab 2
    </Tab>
  </TabList>
));
