"use client"

import {
  Avatar,
  Badge,
  Button,
  Command,
  HStack,
  Image,
  Kbd,
  Portal,
  Spinner,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuChevronRight,
  LuPackage,
  LuPlus,
  LuSearch,
  LuSettings,
  LuUsers,
} from "react-icons/lu"

interface Result extends Command.Item {
  label: string
  value: string
  icon?: React.ReactNode
  description?: string
  title?: string
  placeholder?: string
}

export const CommandWithAsyncPages = () => {
  const command = useCommandCollection<Result>({
    initialItems: items,
    load: async ({ page, query, signal }) => {
      if (query) await wait(200, signal)
      if (page?.value === "people") return searchPeople(query, signal)
      if (page?.value === "products") return searchProducts(query, signal)
      return []
    },
  })

  const page = command.page

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
            <LuSearch /> Search...
          </Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root>
              <Command.Control>
                <Command.Indicator />
                {page && (
                  <Badge size="sm" variant="subtle" flexShrink="0">
                    {page.title}
                  </Badge>
                )}
                <Command.Input
                  placeholder={
                    page?.placeholder ?? "Type a command or search..."
                  }
                />
                {command.loading && <Spinner size="sm" color="fg.muted" />}
              </Command.Control>
              <Command.List>
                {command.collection.size === 0 && (
                  <Command.Loading>
                    Loading {page?.title?.toLowerCase()}...
                  </Command.Loading>
                )}
                {command.collection.items.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    {item.icon}
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    {item.description && (
                      <Text ms="auto" textStyle="xs" color="fg.muted" truncate>
                        {item.description}
                      </Text>
                    )}
                    {command.isPage(item) && <LuChevronRight />}
                  </Command.Item>
                ))}
                {command.error ? (
                  <Command.Empty>
                    Couldn't load results.{" "}
                    <Button size="xs" variant="plain" onClick={command.reload}>
                      Retry
                    </Button>
                  </Command.Empty>
                ) : (
                  <Command.Empty>No results found</Command.Empty>
                )}
              </Command.List>
              <Command.Footer>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    ↵
                  </Kbd>
                  Select
                </HStack>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    {page ? "⌫" : "esc"}
                  </Kbd>
                  {page ? "Back" : "Close"}
                </HStack>
              </Command.Footer>
            </Command.Root>
          </Command.DialogContent>
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}

const items: Result[] = [
  {
    label: "Search people...",
    value: "people",
    page: true,
    title: "People",
    placeholder: "Search people by name...",
    icon: <LuUsers />,
  },
  {
    label: "Search products...",
    value: "products",
    page: true,
    title: "Products",
    placeholder: "Search products...",
    icon: <LuPackage />,
  },
  { label: "Create project", value: "create-project", icon: <LuPlus /> },
  { label: "Open settings", value: "settings", icon: <LuSettings /> },
]

async function searchPeople(query: string, signal: AbortSignal) {
  const params = new URLSearchParams({
    q: query,
    limit: "8",
    select: "firstName,lastName,image,company",
  })
  const response = await fetch(`https://dummyjson.com/users/search?${params}`, {
    signal,
  })
  if (!response.ok) throw new Error("Search failed")
  const data = await response.json()

  return data.users.map((user: any): Result => {
    const name = `${user.firstName} ${user.lastName}`
    return {
      label: name,
      value: `person:${user.id}`,
      description: user.company.title,
      icon: (
        <Avatar.Root size="2xs">
          <Avatar.Fallback name={name} />
          <Avatar.Image src={user.image} />
        </Avatar.Root>
      ),
    }
  })
}

async function searchProducts(query: string, signal: AbortSignal) {
  const params = new URLSearchParams({
    q: query,
    limit: "8",
    select: "title,price,thumbnail",
  })
  const response = await fetch(
    `https://dummyjson.com/products/search?${params}`,
    { signal },
  )
  if (!response.ok) throw new Error("Search failed")
  const data = await response.json()

  return data.products.map(
    (product: any): Result => ({
      label: product.title,
      value: `product:${product.id}`,
      description: `$${product.price}`,
      icon: (
        <Image
          src={product.thumbnail}
          alt=""
          boxSize="5"
          rounded="sm"
          objectFit="cover"
        />
      ),
    }),
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
