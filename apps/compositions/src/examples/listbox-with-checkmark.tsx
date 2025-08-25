"use client"

import {
  Checkmark,
  Listbox,
  createListCollection,
  useListboxItemContext,
} from "@chakra-ui/react"

const ListboxItemCheckmark = () => {
  const itemState = useListboxItemContext()
  return (
    <Checkmark
      filled
      size="sm"
      checked={itemState.selected}
      disabled={itemState.disabled}
    />
  )
}

export const ListboxWithCheckmark = () => {
  return (
    <Listbox.Root collection={frameworks} selectionMode="multiple" maxW="320px">
      <Listbox.Label>Select frameworks (with checkmarks)</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <ListboxItemCheckmark />
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
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
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
  ],
})
