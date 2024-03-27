import { useInterval } from "@chakra-ui/hooks/use-interval"
import { useState } from "react"
import { Tabs } from "."
import { Drawer } from "../drawer"
import { chakra } from "../system"

export default {
  title: "Disclosure / Tabs",
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
      <Tabs.Root defaultValue="settings" variant={variant} mt="3">
        <Tabs.List>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="settings">Settings</Tabs.Content>
          <Tabs.Content value="billing">Billings</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </chakra.div>
  ))

const sizes = ["sm", "md", "lg"] as const

export const Sizes = () =>
  sizes.map((size) => (
    <chakra.div key={size} my="10">
      <pre>size = {size}</pre>
      <Tabs.Root defaultValue="settings" size={size} mt="3">
        <Tabs.List>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="settings">Settings</Tabs.Content>
          <Tabs.Content value="billing">Billing</Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </chakra.div>
  ))

export const automatic = () => (
  <>
    <p>manual</p>
    <Tabs.Root defaultValue="settings" isManual>
      <Tabs.List>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Trigger value="billing" isDisabled>
          Billing
        </Tabs.Trigger>
        <Tabs.Trigger value="preferences" isDisabled>
          Preferences
        </Tabs.Trigger>
        <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="settings">Settings</Tabs.Content>
        <Tabs.Content value="billing">Billing</Tabs.Content>
        <Tabs.Content value="preferences">Preferences</Tabs.Content>
        <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
    <br />
    <p>auto</p>
    <Tabs.Root defaultValue="settings">
      <Tabs.List>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Trigger value="billing" isDisabled>
          Billing
        </Tabs.Trigger>
        <Tabs.Trigger value="preferences" isDisabled>
          Preferences
        </Tabs.Trigger>
        <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="settings">Settings</Tabs.Content>
        <Tabs.Content value="billing">Billing</Tabs.Content>
        <Tabs.Content value="preferences">Preferences</Tabs.Content>
        <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </>
)

export const manual = () => (
  <Tabs.Root defaultValue="settings" isManual>
    <Tabs.List>
      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      <Tabs.Trigger value="preferences" isDisabled>
        Preferences
      </Tabs.Trigger>
      <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content value="settings">Settings</Tabs.Content>
      <Tabs.Content value="billing">Billing</Tabs.Content>
      <Tabs.Content value="prefereces">Preferences</Tabs.Content>
      <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withIndicator = () => (
  <Tabs.Root defaultValue="settings" variant="unstyled" isManual>
    <Tabs.List>
      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      <Tabs.Trigger
        value="billing"
        _disabled={{ color: "gray.400" }}
        isDisabled
      >
        Billing
      </Tabs.Trigger>
      <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
      <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />

    <Tabs.ContentGroup>
      <Tabs.Content value="settings">Settings</Tabs.Content>
      <Tabs.Content value="billing">Billing</Tabs.Content>
      <Tabs.Content value="preferences">Preferences</Tabs.Content>
      <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withIndicatorAndLongTabText = () => (
  <>
    <Tabs.Root defaultValue="long" variant="unstyled" isManual>
      <Tabs.List>
        <Tabs.Trigger value="long">Tab with long text</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
        <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Indicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
      <Tabs.ContentGroup>
        <Tabs.Content value="long">Tab with long text</Tabs.Content>
        <Tabs.Content value="billing">Billing</Tabs.Content>
        <Tabs.Content value="preferences">Preferences</Tabs.Content>
        <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </>
)

export const withVerticalTabs = () => (
  <Tabs.Root defaultValue="settings" orientation="vertical">
    <Tabs.List>
      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      <Tabs.Trigger value="preferences" isDisabled>
        Preferences
      </Tabs.Trigger>
      <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup bg="red.200">
      <Tabs.Content value="settings">Settings</Tabs.Content>
      <Tabs.Content value="billing">Billing</Tabs.Content>
      <Tabs.Content value="preferences">Preferences</Tabs.Content>
      <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
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
  <Tabs.Root defaultValue="1" isLazy>
    <Tabs.List>
      <Tabs.Trigger value="1">Interval 1</Tabs.Trigger>
      <Tabs.Trigger value="2">Interval 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content value="1">
        Interval 1:
        <Interval />
      </Tabs.Content>
      <Tabs.Content value="2">
        Interval 2:
        <Interval />
      </Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withLazyTabsMounted = () => (
  <Tabs.Root defaultValue="1" isLazy lazyBehavior="keepMounted">
    <Tabs.List>
      <Tabs.Trigger value="1">Interval 1</Tabs.Trigger>
      <Tabs.Trigger value="2">Interval 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <Tabs.Content value="1">
        Interval 1:
        <Interval />
      </Tabs.Content>
      <Tabs.Content value="2">
        Interval 2:
        <Interval />
      </Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
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
      <Tabs.Root
        value={selectedItemId}
        onChange={onTabChange}
        orientation="vertical"
        variant="enclosed-colored"
      >
        <Tabs.List minW="100px">
          {items.map(({ id, value }) => (
            <Tabs.Trigger value={id} key={id}>
              {id}: {value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.ContentGroup>
          {items.map(({ id, value }) => (
            <Tabs.Content value={id} key={id}>
              {id}: {value}
            </Tabs.Content>
          ))}
        </Tabs.ContentGroup>
      </Tabs.Root>
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
  <Drawer.Root isOpen onClose={console.log}>
    <Drawer.Overlay>
      <Drawer.Positioner>
        <Drawer.Content>
          <Tabs.Root defaultValue="settings" variant="unstyled" isManual>
            <Tabs.List>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
              <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Indicator zIndex={-1} height="4px" bg="green.200" />

            <Tabs.ContentGroup>
              <Tabs.Content value="settings">Settings</Tabs.Content>
              <Tabs.Content value="billing">Billing</Tabs.Content>
              <Tabs.Content value="preferences">Preferences</Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Overlay>
  </Drawer.Root>
)

export const WithTabPanelWrapper = () => (
  <Tabs.Root defaultValue="first">
    <Tabs.List>
      <Tabs.Trigger value="first">First Tab</Tabs.Trigger>
      <Tabs.Trigger value="second">Second Tab</Tabs.Trigger>
      <Tabs.Trigger value="third">Third Tab</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup>
      <div>
        <Tabs.Content value="first">Tab panel 1</Tabs.Content>
      </div>
      <div>
        <Tabs.Content value="second">Tab panel 2</Tabs.Content>
      </div>
      <div>
        <Tabs.Content value="third">Tab panel 3</Tabs.Content>
      </div>
    </Tabs.ContentGroup>
  </Tabs.Root>
)
