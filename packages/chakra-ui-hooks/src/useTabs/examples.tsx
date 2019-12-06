import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  TabsProvider,
  useTab,
  useTabIndicator,
  useTabList,
  useTabPanel,
  useTabPanels,
  useTabs,
} from "./useTabs";

const stories = storiesOf("useTabs", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

const Tab = React.forwardRef(function Tab(props: any, ref: any) {
  const tab = useTab(props);
  return (
    <button ref={ref} {...tab}>
      {props.children}
    </button>
  );
});

function TabList(props: any) {
  const tablist = useTabList(props);
  return <div {...props} {...tablist} />;
}

function TabPanel(props: any) {
  const tabpanel = useTabPanel(props);
  return <div {...tabpanel}>{props.children}</div>;
}

function TabPanels(props: any) {
  const tabpanels = useTabPanels(props);
  return <React.Fragment>{tabpanels}</React.Fragment>;
}

function TabIndicator(props: any) {
  const indicator = useTabIndicator();
  return (
    <div style={{ ...indicator, height: 2, background: "red" }} {...props} />
  );
}

stories.add("useTabs", () => (
  <TabsProvider orientation="horizontal" isManual>
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
