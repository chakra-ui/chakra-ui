"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Span,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuFolderPlus,
  LuRefreshCw,
  LuSearch,
  LuSettings,
  LuSunMoon,
  LuTrash2,
  LuUserPlus,
} from "react-icons/lu"

export const CommandControlledSearch = () => {
  const [query, setQuery] = useState("")

  const command = useCommandCollection({
    initialItems: commands,
    groupBy: (item) => item.group,
    query,
    onQueryChange: setQuery,
  })

  return (
    <>
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
              <LuSearch /> {query || "Search commands..."}
            </Button>
          </Command.DialogTrigger>
          <Portal>
            <Command.DialogBackdrop />
            <Command.DialogContent>
              <Command.Root>
                <Command.Control>
                  <Command.Indicator />
                  <Command.Input placeholder="Type a command or search..." />
                </Command.Control>
                <Command.List>
                  {command.collection.group().map(([group, items]) => (
                    <Command.ItemGroup key={group}>
                      <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
                      {items.map((item) => (
                        <Command.Item item={item} key={item.value}>
                          {item.icon}
                          <Command.ItemText highlight>
                            {item.label}
                          </Command.ItemText>
                        </Command.Item>
                      ))}
                    </Command.ItemGroup>
                  ))}
                  <Command.Empty>No results found</Command.Empty>
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

      <HStack mt="4" gap="2" wrap="wrap">
        <Text textStyle="sm" color="fg.muted">
          Try
        </Text>
        {["theme", "project", "settings"].map((term) => (
          <Button
            key={term}
            size="xs"
            variant="subtle"
            onClick={() => setQuery(term)}
          >
            {term}
          </Button>
        ))}
      </HStack>
      <Text mt="2" textStyle="sm" color="fg.muted">
        Query: <Span color="fg">{query || "empty"}</Span>
      </Text>
    </>
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
}

const commands: CommandItem[] = [
  {
    label: "Create new project",
    value: "new-project",
    group: "Projects",
    icon: <LuFolderPlus />,
  },
  {
    label: "Delete project",
    value: "delete-project",
    group: "Projects",
    icon: <LuTrash2 />,
  },
  {
    label: "Invite teammate",
    value: "invite",
    group: "Projects",
    icon: <LuUserPlus />,
  },
  {
    label: "Switch theme",
    value: "theme",
    group: "Preferences",
    icon: <LuSunMoon />,
  },
  {
    label: "Open settings",
    value: "settings",
    group: "Preferences",
    icon: <LuSettings />,
  },
  {
    label: "Sync settings",
    value: "sync-settings",
    group: "Preferences",
    icon: <LuRefreshCw />,
  },
]
