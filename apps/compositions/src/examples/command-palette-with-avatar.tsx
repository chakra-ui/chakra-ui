"use client"

import {
  Avatar,
  CommandPalette,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const CommandPaletteWithAvatar = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: members,
    itemToString: (item) => `${item.name} ${item.role}`,
    itemToValue: (item) => item.id,
    filter: contains,
  })

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Search team members..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.id}>
            <Avatar.Root size="2xs">
              <Avatar.Fallback name={item.name} />
              <Avatar.Image src={item.avatar} />
            </Avatar.Root>
            <CommandPalette.ItemText>
              {item.name}
              <Span display="block" textStyle="xs" color="fg.muted">
                {item.role}
              </Span>
            </CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No members found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const members = [
  {
    id: "1",
    name: "Segun Adebayo",
    role: "Design Engineer",
    avatar: "https://i.pravatar.cc/150?u=sa",
  },
  {
    id: "2",
    name: "Esther Adebayo",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/150?u=ea",
  },
  {
    id: "3",
    name: "Christian Schröter",
    role: "Frontend Engineer",
    avatar: "https://i.pravatar.cc/150?u=cs",
  },
  {
    id: "4",
    name: "Ivica Batinić",
    role: "Fullstack Engineer",
    avatar: "https://i.pravatar.cc/150?u=ib",
  },
  {
    id: "5",
    name: "Abraham Anuoluwapo",
    role: "Developer Advocate",
    avatar: "https://i.pravatar.cc/150?u=aa",
  },
]
