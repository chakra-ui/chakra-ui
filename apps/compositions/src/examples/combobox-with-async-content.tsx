"use client"

import {
  Combobox,
  HStack,
  Portal,
  Span,
  Spinner,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { useAsync } from "react-use"

export const ComboboxWithAsyncContent = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const state = useAsync(async () => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${inputValue}`,
    )
    const data = await response.json()
    set(data.results)
  }, [inputValue, set])

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      placeholder="Example: C-3PO"
      onInputValueChange={(e) => setInputValue(e.inputValue)}
      positioning={{ sameWidth: false, placement: "bottom-start" }}
    >
      <Combobox.Label>Search Star Wars Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content minW="sm">
            {state.loading ? (
              <HStack p="2">
                <Spinner size="xs" borderWidth="1px" />
                <Span>Loading...</Span>
              </HStack>
            ) : state.error ? (
              <Span p="2" color="fg.error">
                Error fetching
              </Span>
            ) : (
              collection.items?.map((character) => (
                <Combobox.Item key={character.name} item={character}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium" truncate>
                      {character.name}
                    </Span>
                    <Span color="fg.muted" truncate>
                      {character.height}cm / {character.mass}kg
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}
