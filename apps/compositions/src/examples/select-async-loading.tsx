"use client"

import { Portal, Select, Spinner, createListCollection } from "@chakra-ui/react"
import { useMemo } from "react"
import { useAsync } from "react-use"

interface Pokemon {
  name: string
  url: string
}

export const SelectAsyncLoading = () => {
  const state = useAsync(async (): Promise<Pokemon[]> => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const data = await response.json()
    return data.results
  }, [])

  const collection = useMemo(() => {
    return createListCollection({
      items: state.value ?? [],
      itemToString: (pokemon) => pokemon.name,
      itemToValue: (pokemon) => pokemon.name,
    })
  }, [state.value])

  return (
    <Select.Root collection={collection} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select pokemon</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select pokemon" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {state.loading && (
            <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
          )}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((pokemon) => (
              <Select.Item item={pokemon} key={pokemon.name}>
                {pokemon.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
