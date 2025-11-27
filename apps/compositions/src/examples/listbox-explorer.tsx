"use client"

import {
  Box,
  Input,
  Listbox,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuAtom, LuGlobe, LuPalette, LuZap } from "react-icons/lu"

export const ListboxExplorer = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const initialItems = [
    {
      label: "React.js",
      value: "react",
      icon: <LuAtom size={16} />,
      category: "JavaScript",
    },
    {
      label: "Vue.js",
      value: "vue",
      icon: <LuPalette size={16} />,
      category: "JavaScript",
    },
    {
      label: "Angular",
      value: "angular",
      icon: <LuGlobe size={16} />,
      category: "JavaScript",
    },
    {
      label: "Svelte",
      value: "svelte",
      icon: <LuZap size={16} />,
      category: "JavaScript",
    },
    { label: "Naruto", value: "naruto", category: "Anime" },
    { label: "One Piece", value: "one-piece", category: "Anime" },
    { label: "The Godfather", value: "godfather", category: "Movies" },
    { label: "The Dark Knight", value: "dark-knight", category: "Movies" },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
    groupBy: (item) => item.category,
  })

  return (
    <Listbox.Root
      maxW="320px"
      collection={collection}
      defaultValue={[collection.items[0].value]}
    >
      <Listbox.Label>Select item</Listbox.Label>

      <Listbox.Input
        as={Input}
        placeholder="Type to filter..."
        onChange={(e) => filter(e.target.value)}
      />

      <Listbox.Content maxH="240px" divideY="1px">
        {collection.group().map(([category, items]) => (
          <Listbox.ItemGroup key={category}>
            <Listbox.ItemGroupLabel>{category}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item item={item} key={item.value}>
                <Box display="flex" alignItems="center" gap="3" flex="1">
                  {item.icon && (
                    <Box color="fg.muted" flexShrink="0">
                      {item.icon}
                    </Box>
                  )}
                  <Listbox.ItemText>{item.label}</Listbox.ItemText>
                </Box>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
        <Listbox.Empty>No results found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  )
}
