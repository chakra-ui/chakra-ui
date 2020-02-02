import { createChakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import { TabsProvider } from ".";
import setup from "../story.setup";
import * as Base from "./Tabs.base";

const stories = storiesOf("Tabs", module).addDecorator(setup);

const Tab = createChakra(Base.BaseTab);
const TabList = createChakra(Base.BaseTabList);
const TabPanel = createChakra(Base.BaseTabPanel);

stories.add("useTabs", () => (
  <TabsProvider orientation="horizontal">
    <TabList>
      <Tab>Settings</Tab>
      <Tab isDisabled isFocusable>
        Billings
      </Tab>
      <Tab>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>
    <Base.BaseTabIndicator />
    <Base.BaseTabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </Base.BaseTabPanels>
  </TabsProvider>
));
