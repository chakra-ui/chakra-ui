import React from "react"
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel } from "."
import { chakra } from "@chakra-ui/system"

export default {
  title: "Tabs",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mt="100px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const automatic = () => (
  <Tabs>
    <TabList>
      <Tab>Settings</Tab>
      <Tab isDisabled isFocusable>
        Billings
      </Tab>
      <Tab>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

export const manual = () => (
  <Tabs isManual>
    <TabList>
      <Tab>Settings</Tab>
      <Tab>Billings</Tab>
      <Tab isDisabled>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

export const withIndicator = () => (
  <Tabs variant="unstyled" isManual>
    <TabList>
      <Tab>Settings</Tab>
      <Tab isDisabled>Billings</Tab>
      <Tab>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>

    <TabIndicator
      mt="-33px"
      zIndex={-1}
      height="34px"
      bg="green.400"
      borderRadius="6px"
    />

    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)
