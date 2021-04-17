import { chakra } from "@chakra-ui/system"
import { useInterval } from "@chakra-ui/hooks"
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

    <TabIndicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />

    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
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

const Interval = () => {
  const [value, setValue] = React.useState(0)
  useInterval(() => setValue((v) => v + 1), 1000)
  return (
    <span style={{ fontWeight: "bold", color: "tomato", padding: 4 }}>
      {value}
    </span>
  )
}

export const withLazyTabs = () => (
  <Tabs isLazy>
    <TabList>
      <Tab>Interval 1</Tab>
      <Tab>Interval 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        Interval 1:
        <Interval />
      </TabPanel>
      <TabPanel>
        Interval 2:
        <Interval />
      </TabPanel>
    </TabPanels>
  </Tabs>
)

export const withLazyTabsMounted = () => (
  <Tabs isLazy lazyBehavior="keepMounted">
    <TabList>
      <Tab>Interval 1</Tab>
      <Tab>Interval 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        Interval 1:
        <Interval />
      </TabPanel>
      <TabPanel>
        Interval 2:
        <Interval />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
