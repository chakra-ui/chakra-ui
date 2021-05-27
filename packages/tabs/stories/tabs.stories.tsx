import { useInterval } from "@chakra-ui/hooks"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal"
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

export const WithSwappedTabs = () => {
  const initialData = [
    { id: "a", value: 1 },
    { id: "b", value: 5 },
  ]

  const TabView: React.FC<{
    items: typeof initialData
    selectedItemId: string
    setSelectedItemId: (id: string) => void
  }> = ({ items, selectedItemId, setSelectedItemId }) => {
    // Derive current tab index from id
    const tabIndex = React.useMemo(() => {
      return items.findIndex((x) => x.id === selectedItemId)
    }, [items, selectedItemId])

    // Update current selected item id
    const onTabChange = (idx: number) => {
      console.log("onTabChange", idx, items[idx].id)
      const { id } = items[idx]
      setSelectedItemId(id)
    }

    return (
      <Tabs
        index={tabIndex}
        onChange={onTabChange}
        orientation="vertical"
        variant="enclosed-colored"
      >
        <TabList minW="100px">
          {items.map((x) => (
            <Tab key={x.id}>
              {x.id}: {x.value}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {items.map((x) => (
            <TabPanel key={x.id}>
              {x.id}: {x.value}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  }

  const [items, setItems] = React.useState(initialData)
  const [selectedItemId, setSelectedItemId] = React.useState("a")

  const swapData = () => {
    setItems((items) => {
      const [a, b] = items
      return [b, a]
    })
  }

  console.log(
    { selectedItemId },
    items.map((x) => x.id),
  )

  return (
    <chakra.div m={4}>
      <button onClick={swapData}>Swap tab order</button>
      <TabView
        items={items}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
      />
    </chakra.div>
  )
}

export const withinDrawer = () => (
  <Drawer isOpen onClose={console.log}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerBody>
          <Tabs variant="unstyled" isManual>
            <TabList>
              <Tab>Settings</Tab>
              <Tab>Billings</Tab>
              <Tab>Preferences</Tab>
              <Tab>Shut Down</Tab>
            </TabList>

            <TabIndicator mt="-4" zIndex={-1} height="4px" bg="green.200" />

            <TabPanels>
              <TabPanel>Settings</TabPanel>
              <TabPanel>Billings</TabPanel>
              <TabPanel>Preferences</TabPanel>
              <TabPanel>Shut Down</TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)
