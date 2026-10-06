"use client"

import {
  Button,
  CommandPalette,
  Kbd,
  Portal,
  Text,
  useListCollection,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

interface Character {
  name: string
  role: string
}

type SearchStatus = "idle" | "loading" | "error"

export const CommandPaletteWithAsyncContent = () => {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [status, setStatus] = useState<SearchStatus>("idle")
  const [retryCount, setRetryCount] = useState(0)
  const requestId = useRef(0)

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300)
    return () => window.clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!debouncedQuery) {
      set([])
      setStatus("idle")
      return
    }

    const controller = new AbortController()
    const currentRequest = ++requestId.current
    setStatus("loading")

    searchCharacters(debouncedQuery, controller.signal)
      .then((results) => {
        if (currentRequest !== requestId.current) return
        set(results)
        setStatus("idle")
      })
      .catch(() => {
        if (controller.signal.aborted || currentRequest !== requestId.current) {
          return
        }
        set([])
        setStatus("error")
      })

    return () => controller.abort()
  }, [debouncedQuery, retryCount, set])

  return (
    <CommandPalette.Root
      collection={collection}
      hotkeys={[]}
      inputValue={query}
      loading={status === "loading"}
      onInputValueChange={(e) => setQuery(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline">
          Search characters <Kbd size="sm">⌘K</Kbd>
        </Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel>
            <CommandPalette.Label>Character search</CommandPalette.Label>
            <CommandPalette.Control>
              <CommandPalette.Indicator />
              <CommandPalette.Input placeholder="Try Leia, Lando, or error..." />
            </CommandPalette.Control>
            <CommandPalette.List>
              <CommandPalette.Loading>
                Searching characters…
              </CommandPalette.Loading>
              {collection.items.map((item) => (
                <CommandPalette.Item item={item} key={item.name}>
                  <CommandPalette.ItemText>{item.name}</CommandPalette.ItemText>
                  <CommandPalette.ItemCommand>
                    {item.role}
                  </CommandPalette.ItemCommand>
                </CommandPalette.Item>
              ))}
              {status === "error" ? (
                <Text
                  role="alert"
                  px="3"
                  py="6"
                  textAlign="center"
                  textStyle="sm"
                >
                  Search failed.{" "}
                  <Button
                    size="xs"
                    variant="plain"
                    onClick={() => setRetryCount((count) => count + 1)}
                  >
                    Try again
                  </Button>
                </Text>
              ) : (
                <CommandPalette.Empty>
                  {query ? "No characters found" : "Start typing to search"}
                </CommandPalette.Empty>
              )}
            </CommandPalette.List>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

const characters: Character[] = [
  { name: "Leia Organa", role: "General" },
  { name: "Luke Skywalker", role: "Jedi" },
  { name: "Han Solo", role: "Pilot" },
  { name: "Lando Calrissian", role: "Administrator" },
  { name: "Ahsoka Tano", role: "Fulcrum" },
  { name: "Din Djarin", role: "Mandalorian" },
]

const searchCharacters = (query: string, signal: AbortSignal) =>
  new Promise<Character[]>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (query.toLowerCase() === "error") {
        reject(new Error("Demo search failed"))
        return
      }
      resolve(
        characters.filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase()),
        ),
      )
    }, 650)

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer)
        reject(new DOMException("Search cancelled", "AbortError"))
      },
      { once: true },
    )
  })
