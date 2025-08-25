"use client"

import { Box, Listbox, Text, createListCollection } from "@chakra-ui/react"

export const ListboxWithDescription = () => {
  return (
    <Listbox.Root collection={frameworks} maxW="400px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Box flex="1">
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
              <Text fontSize="xs" color="fg.muted" mt="1">
                {framework.description}
              </Text>
            </Box>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    {
      label: "React.js",
      value: "react",
      description: "A JavaScript library for building user interfaces",
    },
    {
      label: "Vue.js",
      value: "vue",
      description: "The progressive JavaScript framework",
    },
    {
      label: "Angular",
      value: "angular",
      description: "Platform for building mobile and desktop web applications",
    },
    {
      label: "Svelte",
      value: "svelte",
      description: "Cybernetically enhanced web apps",
    },
    {
      label: "Next.js",
      value: "nextjs",
      description: "The React framework for production",
    },
  ],
})
