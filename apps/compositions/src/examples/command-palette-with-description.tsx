"use client"

import {
  CommandPalette,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuFileText, LuGitBranch, LuRocket, LuUsers } from "react-icons/lu"

export const CommandPaletteWithDescription = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Type a command or search..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            {item.icon}
            <CommandPalette.ItemText>
              {item.label}
              <Span display="block" textStyle="xs" color="fg.muted">
                {item.description}
              </Span>
            </CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const commands = [
  {
    label: "Deploy to Production",
    value: "deploy",
    description: "Ship the current branch to production",
    icon: <LuRocket />,
  },
  {
    label: "Create Branch",
    value: "branch",
    description: "Start a new branch from main",
    icon: <LuGitBranch />,
  },
  {
    label: "Invite Members",
    value: "invite",
    description: "Add teammates to this workspace",
    icon: <LuUsers />,
  },
  {
    label: "View Changelog",
    value: "changelog",
    description: "See what shipped in the latest release",
    icon: <LuFileText />,
  },
]
