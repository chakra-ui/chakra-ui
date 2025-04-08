"use client"

import {
  For,
  Portal,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react"

export const SelectWithVariants = () => {
  return (
    <Stack gap="5" width="320px">
      <For each={["outline", "subtle"]}>
        {(variant) => (
          <Select.Root key={variant} variant={variant} collection={frameworks}>
            <Select.HiddenSelect />
            <Select.Label>Select framework - {variant}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      </For>
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
