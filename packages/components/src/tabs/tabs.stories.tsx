import { useInterval } from "@chakra-ui/hooks"
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "../modal"
import { chakra } from "../system"
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "."
import { useState } from "react"

export default {
  title: "Components / Disclosure / Tabs",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mt="100px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

const variants = [
  "line",
  "enclosed",
  "enclosed-colored",
  "soft-rounded",
  "solid-rounded",
] as const

export const Variants = () =>
  variants.map((variant) => (
    <chakra.div key={variant} my="10">
      <pre>variant = {variant}</pre>
      <Tabs defaultValue="settings" variant={variant} mt="3">
        <TabList>
          <Tab value="settings">Settings</Tab>
          <Tab value="billing">Billing</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="settings">Settings</TabPanel>
          <TabPanel value="billing">Billing</TabPanel>
        </TabPanels>
      </Tabs>
    </chakra.div>
  ))

const sizes = ["sm", "md", "lg"] as const

export const Sizes = () =>
  sizes.map((size) => (
    <chakra.div key={size} my="10">
      <pre>size = {size}</pre>
      <Tabs defaultValue="settings" size={size} mt="3">
        <TabList>
          <Tab value="settings">Settings</Tab>
          <Tab value="billing">Billing</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="settings">Settings</TabPanel>
          <TabPanel value="billing">Billing</TabPanel>
        </TabPanels>
      </Tabs>
    </chakra.div>
  ))

export const automatic = () => (
  <>
    <p>manual</p>
    <Tabs defaultValue="settings" isManual>
      <TabList>
        <Tab value="settings">Settings</Tab>
        <Tab value="billing" isDisabled>
          Billing
        </Tab>
        <Tab value="preferences" isDisabled>
          Preferences
        </Tab>
        <Tab value="shutdown">Shut Down</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="settings">Settings</TabPanel>
        <TabPanel value="billing">Billing</TabPanel>
        <TabPanel value="preferences">Preferences</TabPanel>
        <TabPanel value="shutdown">Shut Down</TabPanel>
      </TabPanels>
    </Tabs>
    <br />
    <p>auto</p>
    <Tabs defaultValue="settings">
      <TabList>
        <Tab value="settings">Settings</Tab>
        <Tab value="billing" isDisabled>
          Billing
        </Tab>
        <Tab value="preferences" isDisabled>
          Preferences
        </Tab>
        <Tab value="shutdown">Shut Down</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="settings">Settings</TabPanel>
        <TabPanel value="billing">Billing</TabPanel>
        <TabPanel value="preferences">Preferences</TabPanel>
        <TabPanel value="shutdown">Shut Down</TabPanel>
      </TabPanels>
    </Tabs>
  </>
)

export const manual = () => (
  <Tabs defaultValue="settings" isManual>
    <TabList>
      <Tab value="settings">Settings</Tab>
      <Tab value="billing">Billing</Tab>
      <Tab value="preferences" isDisabled>
        Preferences
      </Tab>
      <Tab value="shutdown">Shut Down</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="settings">Settings</TabPanel>
      <TabPanel value="billing">Billing</TabPanel>
      <TabPanel value="prefereces">Preferences</TabPanel>
      <TabPanel value="shutdown">Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

export const withIndicator = () => (
  <Tabs defaultValue="settings" variant="unstyled" isManual>
    <TabList>
      <Tab value="settings">Settings</Tab>
      <Tab value="billing" _disabled={{ color: "gray.400" }} isDisabled>
        Billing
      </Tab>
      <Tab value="preferences">Preferences</Tab>
      <Tab value="shutdown">Shut Down</Tab>
    </TabList>

    <TabIndicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />

    <TabPanels>
      <TabPanel value="settings">Settings</TabPanel>
      <TabPanel value="billing">Billing</TabPanel>
      <TabPanel value="preferences">Preferences</TabPanel>
      <TabPanel value="shutdown">Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

export const withIndicatorAndLongTabText = () => (
  <>
    <Tabs defaultValue="long" variant="unstyled" isManual>
      <TabList>
        <Tab value="long">Tab with long text</Tab>
        <Tab value="billing">Billing</Tab>
        <Tab value="preferences">Preferences</Tab>
        <Tab value="shutdown">Shut Down</Tab>
      </TabList>
      <TabIndicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
      <TabPanels>
        <TabPanel value="long">Tab with long text</TabPanel>
        <TabPanel value="billing">Billing</TabPanel>
        <TabPanel value="preferences">Preferences</TabPanel>
        <TabPanel value="shutdown">Shut Down</TabPanel>
      </TabPanels>
    </Tabs>
  </>
)

export const withVerticalTabs = () => (
  <Tabs defaultValue="" orientation="vertical">
    <TabList>
      <Tab value="settings">Settings</Tab>
      <Tab value="billing">Billing</Tab>
      <Tab value="preferences" isDisabled>
        Preferences
      </Tab>
      <Tab value="shutdown">Shut Down</Tab>
    </TabList>
    <TabPanels bg="red.200">
      <TabPanel value="settings">Settings</TabPanel>
      <TabPanel value="billing">Billing</TabPanel>
      <TabPanel value="preferences">Preferences</TabPanel>
      <TabPanel value="shutdown">Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
)

const Interval = () => {
  const [value, setValue] = useState(0)
  useInterval(() => setValue((v) => v + 1), 1000)
  return (
    <span style={{ fontWeight: "bold", color: "tomato", padding: 4 }}>
      {value}
    </span>
  )
}

export const withLazyTabs = () => (
  <Tabs defaultValue="1" isLazy>
    <TabList>
      <Tab value="1">Interval 1</Tab>
      <Tab value="2">Interval 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="1">
        Interval 1:
        <Interval />
      </TabPanel>
      <TabPanel value="2">
        Interval 2:
        <Interval />
      </TabPanel>
    </TabPanels>
  </Tabs>
)

export const withLazyTabsMounted = () => (
  <Tabs defaultValue="1" isLazy lazyBehavior="keepMounted">
    <TabList>
      <Tab value="1">Interval 1</Tab>
      <Tab value="2">Interval 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="1">
        Interval 1:
        <Interval />
      </TabPanel>
      <TabPanel value="2">
        Interval 2:
        <Interval />
      </TabPanel>
    </TabPanels>
  </Tabs>
)

export const WithSwappedTabs = () => {
  const initialData: { id: string; value: number }[] = [
    {
      id: "a",
      value: 1,
    },
    {
      id: "b",
      value: 5,
    },
  ]

  const TabView: React.FC<{
    items: typeof initialData
    selectedItemId: string
    setSelectedItemId: (id: string) => void
  }> = ({ items, selectedItemId, setSelectedItemId }) => {
    // Update current selected item id
    const onTabChange = (idx: string) => {
      console.log("onTabChange", idx)
      setSelectedItemId(idx)
    }

    return (
      <Tabs
        value={selectedItemId}
        onChange={onTabChange}
        orientation="vertical"
        variant="enclosed-colored"
      >
        <TabList minW="100px">
          {items.map(({ id, value }) => (
            <Tab value={id} key={id}>
              {id}: {value}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {items.map(({ id, value }) => (
            <TabPanel value={id} key={id}>
              {id}: {value}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  }

  const [items, setItems] = useState(initialData)
  const [selectedItemId, setSelectedItemId] = useState("a")

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
          <Tabs defaultValue="settings" variant="unstyled" isManual>
            <TabList>
              <Tab value="settings">Settings</Tab>
              <Tab value="billing">Billing</Tab>
              <Tab value="preferences">Preferences</Tab>
            </TabList>

            <TabIndicator zIndex={-1} height="4px" bg="green.200" />

            <TabPanels>
              <TabPanel value="settings">Settings</TabPanel>
              <TabPanel value="billing">Billing</TabPanel>
              <TabPanel value="preferences">Preferences</TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)

export const WithTabPanelWrapper = () => (
  <Tabs defaultValue="first">
    <TabList>
      <Tab value="first">First Tab</Tab>
      <Tab value="second">Second Tab</Tab>
      <Tab value="third">Third Tab</Tab>
    </TabList>
    <TabPanels>
      <div>
        <TabPanel value="first">Tab panel 1</TabPanel>
      </div>
      <div>
        <TabPanel value="second">Tab panel 2</TabPanel>
      </div>
      <div>
        <TabPanel value="third">Tab panel 3</TabPanel>
      </div>
    </TabPanels>
  </Tabs>
)
