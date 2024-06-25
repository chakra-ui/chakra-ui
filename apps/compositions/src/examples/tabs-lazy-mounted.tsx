import { Tabs } from "@chakra-ui/react"

export const TabsLazyMounted = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab-1">Content 1</Tabs.Content>
      <Tabs.Content value="tab-2">Content 2</Tabs.Content>
      <Tabs.Content value="tab-3">Content 3</Tabs.Content>
    </Tabs.Root>
  )
}
