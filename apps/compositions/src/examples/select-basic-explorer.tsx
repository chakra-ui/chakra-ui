"use client"

import { Select, createListCollection } from "@chakra-ui/react"

export const SelectBasicExplorer = () => {
  return (
    <Select.Root collection={frameworks} size="sm" width="320px" open={true}>
      <Select.HiddenSelect />
      <Select.Label>Select framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
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
    </Select.Root>
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
