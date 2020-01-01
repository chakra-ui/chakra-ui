import { storiesOf } from "@storybook/react";
import React from "react";
import {
  TabsProvider,
  useTab,
  useTabIndicator,
  useTabList,
  useTabPanel,
  useTabPanels,
} from "./useTabs";
import { createChakra } from "@chakra-ui/system";
import setup from "../story.setup";

const stories = storiesOf("useTabs", module).addDecorator(setup);

const Tab = createChakra("button", { hook: useTab });
const TabList = createChakra("div", { hook: useTabList });
const TabPanel = createChakra("div", { hook: useTabPanel });

function TabPanels(props: any) {
  const tabpanels = useTabPanels(props);
  return <React.Fragment>{tabpanels}</React.Fragment>;
}

function TabIndicator(props: any) {
  const styles = useTabIndicator();
  return <div style={{ ...styles, height: 2, background: "red" }} {...props} />;
}

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
    <TabIndicator />
    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </TabsProvider>
));
