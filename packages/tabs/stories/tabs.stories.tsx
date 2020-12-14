import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "../src"

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
  <>
    <p>manual</p>
    <Tabs isManual>
      <TabList>
        <Tab>Settings</Tab>
        <Tab isDisabled>Billings</Tab>
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
    <br />
    <p>auto</p>
    <Tabs>
      <TabList>
        <Tab>Settings</Tab>
        <Tab isDisabled>Billings</Tab>
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
  </>
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
      <Tab _disabled={{ color: "gray.400" }} isDisabled>
        Billings
      </Tab>
      <Tab>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>

    <TabIndicator mt="-40px" zIndex={-1} height="40px" bg="green.200" />

    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)
export const withIndicatorWithinRelative = () => (
  <div style={{ position: "relative" }}>
    <Tabs variant="unstyled" css={{ padding: "24px" }} isManual>
      <TabList>
        <Tab>Settings</Tab>
        <Tab _disabled={{ color: "gray.400" }} isDisabled>
          Billings
        </Tab>
        <Tab>Preferences</Tab>
        <Tab>Shut Down</Tab>
      </TabList>

      <TabIndicator mt="-40px" zIndex={-1} height="40px" bg="green.200" />

      <TabPanels>
        <TabPanel>Settings</TabPanel>
        <TabPanel>Billings</TabPanel>
        <TabPanel>Preferences</TabPanel>
        <TabPanel>Shut Down</TabPanel>
      </TabPanels>
    </Tabs>
  </div>
)

export const withVerticalTabs = () => (
  <Tabs orientation="vertical">
    <TabList>
      <Tab>Settings</Tab>
      <Tab>Billings</Tab>
      <Tab isDisabled>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>
    <TabPanels bg="red.200">
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

export const withVerticalIndicatorWithinRelative = () => (
  <div style={{ position: "relative" }}>
    <Tabs variant="unstyled" css={{ padding: "24px" }} orientation="vertical">
      <TabList>
        <Tab>Settings</Tab>
        <Tab>Billings</Tab>
        <Tab isDisabled>Preferences</Tab>
        <Tab>Shut Down</Tab>
      </TabList>

      <TabIndicator zIndex={-1} width="160px" bg="green.200" />

      <TabPanels bg="red.200">
        <TabPanel>Settings</TabPanel>
        <TabPanel>Billings</TabPanel>
        <TabPanel>Preferences</TabPanel>
        <TabPanel>Shut Down</TabPanel>
      </TabPanels>
    </Tabs>
  </div>
)
