import { CSSReset, ThemeProvider } from "@chakra-ui/theme";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from ".";
import { Icon } from "../Icon";
import { TabIndicator } from "./Tabs";

const stories = storiesOf("Tabs", module)
  .addDecorator(story => (
    <ThemeProvider>
      <CSSReset />
      {story()}
    </ThemeProvider>
  ))
  .addDecorator(withKnobs);

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
      ["solid-rounded", "enclosed", "enclosed-colored", "soft-rounded", "line"],
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
          variantColor="green"
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
      </>
    );
  };

  return <TabEx />;
});

stories.add("with indicators ", () => (
  <Tabs variant="unstyled" defaultIndex={2}>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab isDisabled isFocusable>
        Tab 2
      </Tab>
      <Tab>Tab 3</Tab>
      <Tab>Tab 4</Tab>
      <Tab>Tab 5</Tab>
    </TabList>
    <TabIndicator
      zIndex={-1}
      top="0"
      bg="green.100"
      shadow="sm"
      height="40px"
    />
  </Tabs>
));
