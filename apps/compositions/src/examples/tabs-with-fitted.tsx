import { Tabs } from "@chakra-ui/react"

export const TabsWithFitted = () => {
  return (
    <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"tab-1"}>
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
