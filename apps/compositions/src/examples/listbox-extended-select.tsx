"use client"

import { Kbd, Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxExtendedSelect = () => {
  return (
    <Listbox.Root collection={frameworks} selectionMode="extended">
      <Listbox.Label>
        Select frameworks (hold <Kbd>⌘</Kbd> or <Kbd>^</Kbd> to select multiple)
      </Listbox.Label>
      <Listbox.Content maxW="320px">
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
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
