"use client"

import {
  Avatar,
  Box,
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Spinner,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { LuUsers } from "react-icons/lu"

interface User extends Command.Item {
  id: number
  firstName: string
  lastName: string
  image: string
  company: { title: string }
}

export const CommandWithLoadMore = () => {
  const command = useCommandCollection<User>({
    itemToString: (item) => `${item.firstName} ${item.lastName}`,
    itemToValue: (item) => String(item.id),
    load: async ({ query, signal, cursor }) => {
      if (!query.trim()) return []
      if (!cursor) await wait(200, signal)

      const skip = Number(cursor ?? 0)
      const params = new URLSearchParams({
        q: query,
        limit: String(PAGE_SIZE),
        skip: String(skip),
        select: "firstName,lastName,image,company",
      })
      const response = await fetch(
        `https://dummyjson.com/users/search?${params}`,
        { signal },
      )
      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()

      const next = skip + PAGE_SIZE
      return {
        items: data.users,
        cursor: next < data.total ? String(next) : undefined,
      }
    },
  })

  return (
    <Command.Provider value={command}>
      <Command.Dialog>
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="flex-start"
            color="fg.muted"
          >
            <LuUsers /> Browse people...
          </Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root>
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Search by name, e.g. Emily or James..." />
                {command.loading && <Spinner size="sm" color="fg.muted" />}
              </Command.Control>
              <Command.List>
                {command.collection.size === 0 && (
                  <Command.Loading>Searching people…</Command.Loading>
                )}
                {command.collection.items.map((item) => {
                  const name = `${item.firstName} ${item.lastName}`
                  return (
                    <Command.Item item={item} key={item.id}>
                      <Avatar.Root size="2xs">
                        <Avatar.Fallback name={name} />
                        <Avatar.Image src={item.image} />
                      </Avatar.Root>
                      <Command.ItemText highlight>{name}</Command.ItemText>
                      <Text ms="auto" textStyle="xs" color="fg.muted" truncate>
                        {item.company.title}
                      </Text>
                    </Command.Item>
                  )
                })}
                {command.hasMore && (
                  <LoadMore
                    loading={command.loading}
                    onVisible={command.loadMore}
                  />
                )}
                {command.error ? (
                  <Text
                    role="alert"
                    px="3"
                    py="6"
                    textAlign="center"
                    textStyle="sm"
                    color="fg.muted"
                  >
                    Search failed.{" "}
                    <Button size="xs" variant="plain" onClick={command.reload}>
                      Try again
                    </Button>
                  </Text>
                ) : (
                  <Command.Empty>
                    {command.query
                      ? "No people found"
                      : "Start typing to search"}
                  </Command.Empty>
                )}
              </Command.List>
              <Command.Footer>
                <HStack gap="1.5">
                  <KbdGroup size="sm" variant="subtle">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                  </KbdGroup>
                  Navigate
                </HStack>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    ↵
                  </Kbd>
                  Select
                </HStack>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    esc
                  </Kbd>
                  Close
                </HStack>
              </Command.Footer>
            </Command.Root>
          </Command.DialogContent>
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}

const PAGE_SIZE = 8

const LoadMore = (props: { loading: boolean; onVisible: VoidFunction }) => {
  const { loading, onVisible } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible()
      },
      { root: el.closest("[role=listbox]"), rootMargin: "64px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onVisible])

  return (
    <Box ref={ref} py="2" textAlign="center" textStyle="xs" color="fg.muted">
      {loading && "Loading more…"}
    </Box>
  )
}

const wait = (ms: number, signal: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal.addEventListener("abort", () => {
      clearTimeout(timer)
      reject(signal.reason)
    })
  })
