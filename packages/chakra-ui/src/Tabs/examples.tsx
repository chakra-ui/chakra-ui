import { CSSReset, ThemeProvider } from "@chakra-ui/theme";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from ".";
import { Icon } from "../Icon";

const stories = storiesOf("Tabs", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Content = styled.div`
  margin-top: 16px;
  align-items: center;
  color: rgb(107, 119, 140);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 4em;
  font-weight: 300;
  justify-content: center;
  padding: 32px;
`;

stories.add("Default", () => {
  return (
    <Tabs size="md" color="pink" isFitted>
      <TabList>
        <Tab>
          <Icon name="phone" size="1em" mr={2} />
          Settings
        </Tab>
        <Tab isDisabled>Billings</Tab>
        <Tab>Preferences</Tab>
        <Tab>Shut Down</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Content>Settings</Content>
        </TabPanel>
        <TabPanel>
          <Content>Billings</Content>
        </TabPanel>
        <TabPanel>
          <Content>Preferences</Content>
        </TabPanel>
        <TabPanel>
          <Content>Shut Down</Content>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
});
