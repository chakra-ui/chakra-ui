"use client"

import { CommandPalette, useListCollection } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAsync } from "react-use"

interface Character {
  name: string
  height: string
}

export const CommandPaletteWithAsyncContent = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const state = useAsync(async (): Promise<Character[]> => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${inputValue}`,
    )
    const data = await response.json()
    return data.results
  }, [inputValue])

  useEffect(() => {
    if (state.value) set(state.value)
  }, [state.value, set])

  return (
    <CommandPalette.Root
      collection={collection}
      loading={state.loading}
      maxW="md"
    >
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Search Star Wars characters..."
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.name}>
            <CommandPalette.ItemText>{item.name}</CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        {!state.loading && (
          <CommandPalette.Empty>No results found</CommandPalette.Empty>
        )}
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}
