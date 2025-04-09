"use client"

import {
  Combobox,
  HStack,
  Portal,
  Span,
  Spinner,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"

interface Character {
  id: number
  name: string
  species: string
  status: string
}

export const ComboboxWithAsyncContent = () => {
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [characters, setCharacters] = useState<Character[]>([])
  const [error, setError] = useState("")

  const collection = useMemo(
    () =>
      createListCollection({
        items: characters,
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id.toString(),
      }),
    [characters],
  )

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue.trim()) {
        setCharacters([])
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${inputValue}`,
        )
        const data = await response.json()

        if (response.ok) {
          setCharacters(
            data.results.map((char: Character) => ({
              id: char.id,
              name: char.name,
              species: char.species,
              status: char.status,
            })),
          )
        } else {
          setCharacters([])
          setError(data.error || "No results found")
        }
      } catch (err) {
        setError("Failed to fetch characters")
        setCharacters([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchData, 300)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      placeholder="Example: Rick"
      onInputValueChange={(e) => setInputValue(e.inputValue)}
    >
      <Combobox.Label>Search Rick and Morty Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger />
        <Combobox.ClearTrigger />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Characters</Combobox.ItemGroupLabel>
              {isLoading ? (
                <Stack align="center" p={4}>
                  <Spinner />
                  <Text>Loading characters...</Text>
                </Stack>
              ) : error ? (
                <Text p={2} color="red.500">
                  {error}
                </Text>
              ) : (
                characters.map((character) => (
                  <Combobox.Item key={character.id} item={character}>
                    <HStack justify="space-between" textStyle="sm">
                      <Span fontWeight="medium">{character.name}</Span>
                      <Span color="gray.500">{character.species}</Span>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))
              )}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
