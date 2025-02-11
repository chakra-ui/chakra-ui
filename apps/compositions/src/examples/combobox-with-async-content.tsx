import { Spinner, Stack, Text, createListCollection } from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"
import { useEffect, useState } from "react"

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

  const collection = createListCollection({
    items: characters,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  })

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
    <ComboboxRoot
      width="320px"
      collection={collection}
      placeholder="Example: Rick"
      onInputValueChange={(details) => setInputValue(details.inputValue)}
    >
      <ComboboxLabel>Search Rick and Morty Characters</ComboboxLabel>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxItemGroup label="Characters">
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
              <ComboboxItem key={character.id} item={character}>
                <Stack direction="row" justify="space-between" textStyle="sm">
                  <Text fontWeight="medium">{character.name}</Text>
                  <Text color="gray.500">{character.species}</Text>
                </Stack>
              </ComboboxItem>
            ))
          )}
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxRoot>
  )
}
