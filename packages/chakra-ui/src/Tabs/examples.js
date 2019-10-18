/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import Icon from "../Icon";
import Box from "../Box";
import Tabs, { Tab, TabList, TabPanel, TabPanels } from "../Tabs";

const stories = storiesOf("Tabs", module).addDecorator(withKnobs);

stories.addDecorator(story => (
  <Box maxWidth="xl" mx="auto" mt={4}>
    {story()}
  </Box>
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

stories.add("Tablist Only (Manual)", () => {
  const props = {
    variant: select(
      "variant",
      [
        "solid-rounded",
        "enclosed",
        "enclosed-colored",
        "soft-rounded",
        "line",
        "contained",
      ],
      "enclosed",
    ),
    align: select("alignment", ["start", "center", "end"], "center"),
    size: select("size", ["sm", "md", "lg"], "md"),
    isFitted: boolean("isFitted?", false),
    gutter: "12px",
    orientation: select(
      "orientation",
      ["horizontal", "vertical"],
      "horizontal",
    ),
  };

  const TabEx = () => {
    const [index, setIndex] = React.useState(2);
    return (
      <Fragment>
        <input
          type="range"
          max="4"
          min="0"
          value={index}
          onChange={e => setIndex(Number(e.target.value))}
        />
        <Tabs
          {...props}
          color="green"
          index={index}
          defaultIndex={2}
          isManual
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
      </Fragment>
    );
  };

  return <TabEx />;
});
