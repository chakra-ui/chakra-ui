/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "../src/Breadcrumb";
import Icon from "../src/Icon";
import Button from "../src/Button";
import { Box, Flex } from "../src/Layout";
import Tabs, {
  Tab as BaseTab,
  TabList as BaseTabList,
  TabPanel,
  TabPanels
} from "../src/Tabs";
import { useTabStyle, useTabListStyle } from "../src/TabStyle";

const stories = storiesOf("Navigation", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

const Content = styled.div`
  align-items: center;
  background-color: rgb(244, 245, 247);
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

const Tab = React.forwardRef((props, ref) => {
  const tabStyle = useTabStyle();
  return <BaseTab ref={ref} {...props} css={tabStyle} />;
});

const TabList = React.forwardRef((props, ref) => {
  const css = useTabListStyle();
  return <BaseTabList ref={ref} {...props} css={css} />;
});

stories.add("Tabs", () => {
  return (
    <Tabs size="md" color="pink">
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

stories.add("Tablist Only", () => {
  const props = {
    variant: select(
      "variant",
      [
        "solid-rounded",
        "enclosed-colored",
        "soft-rounded",
        "line",
        "contained",
        "enclosed"
      ],
      "soft-rounded"
    ),
    align: select("alignment", ["start", "center", "end"], "center"),
    size: select("size", ["sm", "md", "lg"], "md"),
    isFitted: boolean("isFitted?", false),
    gutter: "12px",
    orientation: select("orientation", ["horizontal", "vertical"], "horizontal")
  };

  const TabEx = () => {
    const [index, setIndex] = React.useState(2);
    return (
      <>
        <input
          type="range"
          max="4"
          min="0"
          value={index}
          onChange={e => setIndex(Number(e.target.value))}
        />
        <Tabs
          {...props}
          color="red"
          index={index}
          // defaultIndex={2}
          isManual={true}
          onChange={setIndex}
        >
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
            <Tab>Tab 5</Tab>
          </TabList>
        </Tabs>
      </>
    );
  };

  return <TabEx />;
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
