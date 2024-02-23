import { useInterval } from "@chakra-ui/hooks/use-interval"
import * as React from "react"
import { Tabs } from "."
import { Drawer } from "../drawer"
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
          <Tabs.Trigger>Settings</Tabs.Trigger>
          <Tabs.Trigger>Billings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content>Settings</Tabs.Content>
          <Tabs.Content>Billings</Tabs.Content>
        </Tabs.ContentGroup>
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
          <Tabs.Trigger>Settings</Tabs.Trigger>
          <Tabs.Trigger>Billings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content>Settings</Tabs.Content>
          <Tabs.Content>Billings</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </chakra.div>
  ))

export const automatic = () => (
  <>
    <p>manual</p>
    <Tabs.Root isManual>
      <Tabs.List>
        <Tabs.Trigger>Settings</Tabs.Trigger>
        <Tabs.Trigger isDisabled>Billings</Tabs.Trigger>
        <Tabs.Trigger isDisabled>Preferences</Tabs.Trigger>
        <Tabs.Trigger>Shut Down</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content>Settings</Tabs.Content>
        <Tabs.Content>Billings</Tabs.Content>
        <Tabs.Content>Preferences</Tabs.Content>
        <Tabs.Content>Shut Down</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
    <br />
    <p>auto</p>
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger>Settings</Tabs.Trigger>
        <Tabs.Trigger isDisabled>Billings</Tabs.Trigger>
        <Tabs.Trigger isDisabled>Preferences</Tabs.Trigger>
        <Tabs.Trigger>Shut Down</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content>Settings</Tabs.Content>
        <Tabs.Content>Billings</Tabs.Content>
        <Tabs.Content>Preferences</Tabs.Content>
        <Tabs.Content>Shut Down</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </>
)

export const manual = () => (
  <Tabs.Root isManual>
    <Tabs.List>
      <Tabs.Trigger>Settings</Tabs.Trigger>
      <Tabs.Trigger>Billings</Tabs.Trigger>
      <Tabs.Trigger isDisabled>Preferences</Tabs.Trigger>
      <Tabs.Trigger>Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content>Settings</Tabs.Content>
      <Tabs.Content>Billings</Tabs.Content>
      <Tabs.Content>Preferences</Tabs.Content>
      <Tabs.Content>Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withIndicator = () => (
  <Tabs.Root variant="unstyled" isManual>
    <Tabs.List>
      <Tabs.Trigger>Settings</Tabs.Trigger>
      <Tabs.Trigger _disabled={{ color: "gray.400" }} isDisabled>
        Billings
      </Tabs.Trigger>
      <Tabs.Trigger>Preferences</Tabs.Trigger>
      <Tabs.Trigger>Shut Down</Tabs.Trigger>
      <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
    </Tabs.List>

    <Tabs.ContentGroup>
      <Tabs.Content>Settings</Tabs.Content>
      <Tabs.Content>Billings</Tabs.Content>
      <Tabs.Content>Preferences</Tabs.Content>
      <Tabs.Content>Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withIndicatorAndLongTabText = () => (
  <Tabs.Root variant="unstyled" isManual>
    <Tabs.List>
      <Tabs.Trigger>Tab with long text</Tabs.Trigger>
      <Tabs.Trigger>Billings</Tabs.Trigger>
      <Tabs.Trigger>Preferences</Tabs.Trigger>
      <Tabs.Trigger>Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
    <Tabs.ContentGroup>
      <Tabs.Content>Tab with long text</Tabs.Content>
      <Tabs.Content>Billings</Tabs.Content>
      <Tabs.Content>Preferences</Tabs.Content>
      <Tabs.Content>Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withVerticalTabs = () => (
  <Tabs.Root orientation="vertical">
    <Tabs.List>
      <Tabs.Trigger>Settings</Tabs.Trigger>
      <Tabs.Trigger>Billings</Tabs.Trigger>
      <Tabs.Trigger isDisabled>Preferences</Tabs.Trigger>
      <Tabs.Trigger>Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup bg="red.200">
      <Tabs.Content>Settings</Tabs.Content>
      <Tabs.Content>Billings</Tabs.Content>
      <Tabs.Content>Preferences</Tabs.Content>
      <Tabs.Content>Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
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
      <Tabs.Trigger>Interval 1</Tabs.Trigger>
      <Tabs.Trigger>Interval 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content>
        Interval 1:
        <Interval />
      </Tabs.Content>
      <Tabs.Content>
        Interval 2:
        <Interval />
      </Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withLazyTabsMounted = () => (
  <Tabs.Root isLazy lazyBehavior="keepMounted">
    <Tabs.List>
      <Tabs.Trigger>Interval 1</Tabs.Trigger>
      <Tabs.Trigger>Interval 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content>
        Interval 1:
        <Interval />
      </Tabs.Content>
      <Tabs.Content>
        Interval 2:
        <Interval />
      </Tabs.Content>
    </Tabs.ContentGroup>
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
            <Tabs.Trigger key={item.id}>
              {item.id}: {item.value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.ContentGroup>
          {items.map((item) => (
            <Tabs.Content key={item.id}>
              {item.id}: {item.value}
            </Tabs.Content>
          ))}
        </Tabs.ContentGroup>
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

export const WithinDrawer = () => (
  <Drawer.Root isOpen onClose={console.log}>
    <Drawer.Overlay />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Body>
          <Tabs.Root variant="unstyled" isManual>
            <Tabs.List>
              <Tabs.Trigger>Settings</Tabs.Trigger>
              <Tabs.Trigger>Billings</Tabs.Trigger>
              <Tabs.Trigger>Preferences</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Indicator zIndex={-1} height="4px" bg="green.200" />

            <Tabs.ContentGroup>
              <Tabs.Content>Settings</Tabs.Content>
              <Tabs.Content>Billings</Tabs.Content>
              <Tabs.Content>Preferences</Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)

export const WithTabPanelWrapper = () => (
  <Tabs.Root>
    <Tabs.List>
      <Tabs.Trigger>FIrst Tab</Tabs.Trigger>
      <Tabs.Trigger>Second Tab</Tabs.Trigger>
      <Tabs.Trigger>Third Tab</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <div>
        <Tabs.Content>Tab panel 1</Tabs.Content>
      </div>
      <div>
        <Tabs.Content>Tab panel 2</Tabs.Content>
      </div>
      <div>
        <Tabs.Content>Tab panel 3</Tabs.Content>
      </div>
    </Tabs.ContentGroup>
  </Tabs.Root>
)
