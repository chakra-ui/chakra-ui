import { Heading, Input, Tabs, Text } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const TabsNested = () => {
  return (
    <Tabs.Root defaultValue="one" aria-label="Custom tabs" maxW="xl">
      <Tabs.List>
        <Tabs.Trigger value="one">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="two">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">
        <Text textStyle="md" mb="6" mt="4">
          This is a nested tab
        </Text>
        <Tabs.Root variant="subtle" defaultValue="one">
          <Tabs.List>
            <Tabs.Trigger value="one">Tab 1.1</Tabs.Trigger>
            <Tabs.Trigger value="two">Tab 1.2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="one" py="4">
            <Field label="Tab 1.1">
              <Input />
            </Field>
          </Tabs.Content>
          <Tabs.Content value="two" py="4">
            <Field label="Tab 1.2">
              <Input />
            </Field>
          </Tabs.Content>
        </Tabs.Root>
      </Tabs.Content>
      <Tabs.Content value="two">
        <Heading mb="6" mt="4">
          This is a normal tab
        </Heading>
        <Text>Some content to keep you busy.</Text>
      </Tabs.Content>
    </Tabs.Root>
  )
}
