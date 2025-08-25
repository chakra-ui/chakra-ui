"use client"

import { Box, Listbox, createListCollection } from "@chakra-ui/react"
import { LuAtom, LuGlobe, LuPalette, LuZap } from "react-icons/lu"

export const ListboxWithIcon = () => {
  return (
    <Listbox.Root collection={frameworks} maxW="320px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Box display="flex" alignItems="center" gap="3" flex="1">
              <Box color="fg.muted" flexShrink="0">
                {framework.icon}
              </Box>
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
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
    { label: "React.js", value: "react", icon: <LuAtom size={16} /> },
    { label: "Vue.js", value: "vue", icon: <LuPalette size={16} /> },
    { label: "Angular", value: "angular", icon: <LuGlobe size={16} /> },
    { label: "Svelte", value: "svelte", icon: <LuZap size={16} /> },
  ],
})
