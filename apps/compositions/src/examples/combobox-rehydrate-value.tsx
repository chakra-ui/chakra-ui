"use client"

import {
  Combobox,
  HStack,
  Portal,
  Span,
  Spinner,
  useCombobox,
  useListCollection,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAsync } from "react-use"

export const ComboboxRehydrateValue = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const combobox = useCombobox({
    collection,
    defaultValue: ["C-3PO"],
    placeholder: "Example: Dexter",
    inputValue,
    onInputValueChange: (e) => setInputValue(e.inputValue),
  })

  const state = useAsync(async () => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${inputValue}`,
    )
    const data = await response.json()
    set(data.results)
  }, [inputValue, set])

  // Rehydrate the value
  const hydrated = useRef(false)
  if (combobox.value.length && collection.size && !hydrated.current) {
    const inputValue = collection.stringify(combobox.value[0])
    combobox.setInputValue(inputValue || "")
    hydrated.current = true
  }

  return (
    <Combobox.RootProvider value={combobox} width="320px">
      <Combobox.Label>Search Star Wars Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {state.loading ? (
              <HStack p="2">
                <Spinner size="xs" />
                <Span>Loading...</Span>
              </HStack>
            ) : state.error ? (
              <Span p="2" color="fg.error">
                {state.error.message}
              </Span>
            ) : (
              collection.items.map((item) => (
                <Combobox.Item key={item.name} item={item}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium">{item.name}</Span>
                    <Span color="fg.muted">
                      {item.height}cm / {item.mass}kg
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
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
