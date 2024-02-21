import { useInterval } from "@chakra-ui/hooks/use-interval"
import * as React from "react"
import { Tabs } from "."
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "../dialog"
import { chakra } from "../system"

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
      <Tabs.Root variant={variant} mt="3">
        <Tabs.List>
          <Tabs.Tab>Settings</Tabs.Tab>
          <Tabs.Tab>Billings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Settings</Tabs.Panel>
          <Tabs.Panel>Billings</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Root>
    </chakra.div>
  ))

const sizes = ["sm", "md", "lg"] as const

export const Sizes = () =>
  sizes.map((size) => (
    <chakra.div key={size} my="10">
      <pre>size = {size}</pre>
      <Tabs.Root size={size} mt="3">
        <Tabs.List>
          <Tabs.Tab>Settings</Tabs.Tab>
          <Tabs.Tab>Billings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Settings</Tabs.Panel>
          <Tabs.Panel>Billings</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Root>
    </chakra.div>
  ))

export const automatic = () => (
  <>
    <p>manual</p>
    <Tabs.Root isManual>
      <Tabs.List>
        <Tabs.Tab>Settings</Tabs.Tab>
        <Tabs.Tab isDisabled>Billings</Tabs.Tab>
        <Tabs.Tab isDisabled>Preferences</Tabs.Tab>
        <Tabs.Tab>Shut Down</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Settings</Tabs.Panel>
        <Tabs.Panel>Billings</Tabs.Panel>
        <Tabs.Panel>Preferences</Tabs.Panel>
        <Tabs.Panel>Shut Down</Tabs.Panel>
      </Tabs.Panels>
    </Tabs.Root>
    <br />
    <p>auto</p>
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Tab>Settings</Tabs.Tab>
        <Tabs.Tab isDisabled>Billings</Tabs.Tab>
        <Tabs.Tab isDisabled>Preferences</Tabs.Tab>
        <Tabs.Tab>Shut Down</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Settings</Tabs.Panel>
        <Tabs.Panel>Billings</Tabs.Panel>
        <Tabs.Panel>Preferences</Tabs.Panel>
        <Tabs.Panel>Shut Down</Tabs.Panel>
      </Tabs.Panels>
    </Tabs.Root>
  </>
)

export const manual = () => (
  <Tabs.Root isManual>
    <Tabs.List>
      <Tabs.Tab>Settings</Tabs.Tab>
      <Tabs.Tab>Billings</Tabs.Tab>
      <Tabs.Tab isDisabled>Preferences</Tabs.Tab>
      <Tabs.Tab>Shut Down</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel>Settings</Tabs.Panel>
      <Tabs.Panel>Billings</Tabs.Panel>
      <Tabs.Panel>Preferences</Tabs.Panel>
      <Tabs.Panel>Shut Down</Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
)

export const withIndicator = () => (
  <Tabs.Root variant="unstyled" isManual>
    <Tabs.List>
      <Tabs.Tab>Settings</Tabs.Tab>
      <Tabs.Tab _disabled={{ color: "gray.400" }} isDisabled>
        Billings
      </Tabs.Tab>
      <Tabs.Tab>Preferences</Tabs.Tab>
      <Tabs.Tab>Shut Down</Tabs.Tab>
      <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
    </Tabs.List>

    <Tabs.Panels>
      <Tabs.Panel>Settings</Tabs.Panel>
      <Tabs.Panel>Billings</Tabs.Panel>
      <Tabs.Panel>Preferences</Tabs.Panel>
      <Tabs.Panel>Shut Down</Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
)

export const withIndicatorAndLongTabText = () => (
  <Tabs.Root variant="unstyled" isManual>
    <Tabs.List>
      <Tabs.Tab>Tab with long text</Tabs.Tab>
      <Tabs.Tab>Billings</Tabs.Tab>
      <Tabs.Tab>Preferences</Tabs.Tab>
      <Tabs.Tab>Shut Down</Tabs.Tab>
    </Tabs.List>
    <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
    <Tabs.Panels>
      <Tabs.Panel>Tab with long text</Tabs.Panel>
      <Tabs.Panel>Billings</Tabs.Panel>
      <Tabs.Panel>Preferences</Tabs.Panel>
      <Tabs.Panel>Shut Down</Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
)

export const withVerticalTabs = () => (
  <Tabs.Root orientation="vertical">
    <Tabs.List>
      <Tabs.Tab>Settings</Tabs.Tab>
      <Tabs.Tab>Billings</Tabs.Tab>
      <Tabs.Tab isDisabled>Preferences</Tabs.Tab>
      <Tabs.Tab>Shut Down</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels bg="red.200">
      <Tabs.Panel>Settings</Tabs.Panel>
      <Tabs.Panel>Billings</Tabs.Panel>
      <Tabs.Panel>Preferences</Tabs.Panel>
      <Tabs.Panel>Shut Down</Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
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
  <Tabs.Root isLazy>
    <Tabs.List>
      <Tabs.Tab>Interval 1</Tabs.Tab>
      <Tabs.Tab>Interval 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel>
        Interval 1:
        <Interval />
      </Tabs.Panel>
      <Tabs.Panel>
        Interval 2:
        <Interval />
      </Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
)

export const withLazyTabsMounted = () => (
  <Tabs.Root isLazy lazyBehavior="keepMounted">
    <Tabs.List>
      <Tabs.Tab>Interval 1</Tabs.Tab>
      <Tabs.Tab>Interval 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel>
        Interval 1:
        <Interval />
      </Tabs.Panel>
      <Tabs.Panel>
        Interval 2:
        <Interval />
      </Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Root>
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
      <Tabs.Root
        index={tabIndex}
        onChange={onTabChange}
        orientation="vertical"
        variant="enclosed-colored"
      >
        <Tabs.List minW="100px">
          {items.map((item) => (
            <Tabs.Tab key={item.id}>
              {item.id}: {item.value}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panels>
          {items.map((item) => (
            <Tabs.Panel key={item.id}>
              {item.id}: {item.value}
            </Tabs.Panel>
          ))}
        </Tabs.Panels>
      </Tabs.Root>
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
          <Tabs.Root variant="unstyled" isManual>
            <Tabs.List>
              <Tabs.Tab>Settings</Tabs.Tab>
              <Tabs.Tab>Billings</Tabs.Tab>
              <Tabs.Tab>Preferences</Tabs.Tab>
            </Tabs.List>

            <Tabs.Indicator zIndex={-1} height="4px" bg="green.200" />

            <Tabs.Panels>
              <Tabs.Panel>Settings</Tabs.Panel>
              <Tabs.Panel>Billings</Tabs.Panel>
              <Tabs.Panel>Preferences</Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Root>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)

export const WithTabPanelWrapper = () => (
  <Tabs.Root>
    <Tabs.List>
      <Tabs.Tab>FIrst Tab</Tabs.Tab>
      <Tabs.Tab>Second Tab</Tabs.Tab>
      <Tabs.Tab>Third Tab</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <div>
        <Tabs.Panel>Tab panel 1</Tabs.Panel>
      </div>
      <div>
        <Tabs.Panel>Tab panel 2</Tabs.Panel>
      </div>
      <div>
        <Tabs.Panel>Tab panel 3</Tabs.Panel>
      </div>
    </Tabs.Panels>
  </Tabs.Root>
)
