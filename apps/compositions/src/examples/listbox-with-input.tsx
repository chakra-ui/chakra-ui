"use client"

import { Input, Listbox, useFilter, useListCollection } from "@chakra-ui/react"

export const ListboxWithInput = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs" },
      { label: "Nuxt.js", value: "nuxtjs" },
      { label: "Remix", value: "remix" },
      { label: "Gatsby", value: "gatsby" },
      { label: "Ember.js", value: "ember" },
      { label: "Preact", value: "preact" },
    ],
    filter: contains,
  })

  return (
    <Listbox.Root maxW="320px" collection={collection}>
      <Listbox.Label>Select Framework</Listbox.Label>
      <Listbox.Input
        as={Input}
        placeholder="Type to filter frameworks..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.Content maxH="200px">
        {collection.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}

        <Listbox.Empty>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  )
}
