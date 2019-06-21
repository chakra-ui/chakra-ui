import styled from "@emotion/styled";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "../src/Breadcrumb";
import Button from "../src/Button";
import Icon from "../src/Icon";
import { Box } from "../src/Layout";
import Tabs, { Tab, TabList, TabPanel, TabPanels } from "../src/Tabs";

const stories = storiesOf("Navigation", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

const Content = styled.div`
  align-items: center;
  /* background-color: rgb(244, 245, 247); */
  color: rgb(107, 119, 140);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 4em;
  font-weight: 300;
  justify-content: center;
  border-radius: 3px;
  padding: 32px;
`;

stories.add("Tabs", () => {
  return (
    <Tabs id="quick-tab" isManual>
      <TabList bg="#fff" gutter="12px" orientation="horizontal">
        <Tab>
          <Icon name="phone" size="1em" mr={2} />
          Contacts
        </Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Content>One</Content>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
          <Button>Sample Button</Button>
        </TabPanel>
        <TabPanel>
          <Content>Two</Content>
        </TabPanel>
        <TabPanel>
          <Content>Three</Content>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
});

stories.add("Tablist", () => {
  return (
    <Tabs defaultIndex={1} isManual={true}>
      <TabList
        variant={select(
          "variant",
          [
            "solid-rounded",
            "enclosed-colored",
            "soft-rounded",
            "line",
            "contained",
            "enclosed"
          ],
          "enclosed-colored"
        )}
        align={select("alignment", ["center", "left", "right"], "left")}
        size={select("size", ["sm", "md", "lg"], "md")}
        isFitted={boolean("isFitted?", false)}
        bg="#fff"
        gutter="12px"
        orientation={select(
          "orientation",
          ["horizontal", "vertical"],
          "horizontal"
        )}
        onSelectTab={index => console.log(index)}
      >
        <Tab>Account</Tab>
        <Tab>Notifications</Tab>
        <Tab>Security</Tab>
      </TabList>
      {/* <Box p={3} borderWidth="1px">
        Testing
      </Box> */}
    </Tabs>
  );
});

stories.add("Breadcrumbs", () => {
  return (
    <>
      <Breadcrumbs size="md" separator="arrow">
        <BreadcrumbItem>Sequences</BreadcrumbItem>
        <BreadcrumbItem>Settings</BreadcrumbItem>
        <BreadcrumbItem>You're here</BreadcrumbItem>
      </Breadcrumbs>

      <Breadcrumbs size="md" separator="slash">
        <BreadcrumbItem>Sequences</BreadcrumbItem>
        <BreadcrumbItem>Settings</BreadcrumbItem>
        <BreadcrumbItem>You're here</BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
});
