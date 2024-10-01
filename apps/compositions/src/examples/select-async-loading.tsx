"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"
import { useMemo } from "react"
import { useAsync } from "react-use"

interface Item {
  name: string
  url: string
}

export const SelectAsyncLoading = () => {
  const state = useAsync(async (): Promise<Item[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    const data = await response.json()
    return data.results
  }, [])

  const pokemons = useMemo(() => {
    return createListCollection({
      items: state.value || [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.name,
    })
  }, [state.value])

  return (
    <SelectRoot collection={pokemons} size="sm" width="320px">
      <SelectLabel>Select pokemon</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Pokemon" />
      </SelectTrigger>
      <SelectContent>
        {pokemons.items.map((pokemon) => (
          <SelectItem item={pokemon} key={pokemon.name}>
            {pokemon.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
