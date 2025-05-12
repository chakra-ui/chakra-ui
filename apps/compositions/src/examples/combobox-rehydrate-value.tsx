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

interface Character {
  id: number
  name: string
  species: string
  status: string
}

export const ComboboxWithRehydrateValue = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  })

  const combobox = useCombobox({
    collection: collection,
    // ["1"] stands of Rick Sanchez
    defaultValue: ["1"],
    placeholder: "Example: Rick",
    inputValue,
    onInputValueChange: (e) => setInputValue(e.inputValue),
  })

  const fetchCharacters = async (inputValue = "") => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${inputValue}`,
    )
    const data = (await response.json()) as { results: Character[] }
    // ensure we have unique characters
    const result = data.results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name),
    )
    set(result)
  }

  const state = useAsync(async () => {
    await fetchCharacters(inputValue)
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
      <Combobox.Label>Search Rick and Morty Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger onClick={() => fetchCharacters()} />
        </Combobox.IndicatorGroup>
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
              collection.items.map((character) => (
                <Combobox.Item key={character.id} item={character}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium">{character.name}</Span>
                    <Span color="fg.muted">{character.species}</Span>
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
