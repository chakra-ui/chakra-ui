"use client"

import {
  Button,
  CommandPalette,
  Kbd,
  Portal,
  useListCollection,
} from "@chakra-ui/react"
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
      onInputValueChange={(e) => setInputValue(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline">
          Open palette <Kbd size="sm">⌘K</Kbd>
        </Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel>
            <CommandPalette.Control>
              <CommandPalette.Indicator />
              <CommandPalette.Input placeholder="Search Star Wars characters..." />
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
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}
