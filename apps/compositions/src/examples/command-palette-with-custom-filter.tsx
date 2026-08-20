"use client"

import {
  Button,
  CommandPalette,
  Kbd,
  Portal,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

interface Command {
  label: string
  value: string
  group: string
  description: string
  aliases: string[]
  shortcut?: string
}

export const CommandPaletteWithCustomFilter = () => {
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection<Command>({
    initialItems: commands,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
    groupBy: (item) => item.group,
    filter: (itemText, query, item) =>
      [itemText, item.description, ...item.aliases].some((term) =>
        contains(term, query),
      ),
  })

  return (
    <CommandPalette.Root
      collection={collection}
      hotkeys={[]}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline">
          Search workspace <Kbd size="sm">⌘K</Kbd>
        </Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel>
            <CommandPalette.Label>Workspace commands</CommandPalette.Label>
            <CommandPalette.Control>
              <CommandPalette.Indicator />
              <CommandPalette.Input placeholder="Try ‘preferences’, ‘deploy’, or ‘PR’..." />
            </CommandPalette.Control>
            <CommandPalette.List>
              {collection.group().map(([group, items], index) => (
                <CommandPalette.ItemGroup key={group}>
                  {index > 0 && <CommandPalette.Separator />}
                  <CommandPalette.ItemGroupLabel>
                    {group}
                  </CommandPalette.ItemGroupLabel>
                  {items.map((item) => (
                    <CommandPalette.Item item={item} key={item.value}>
                      <CommandPalette.ItemText>
                        {item.label}
                        <Text color="fg.muted" textStyle="xs">
                          {item.description}
                        </Text>
                      </CommandPalette.ItemText>
                      {item.shortcut && (
                        <CommandPalette.ItemCommand>
                          {item.shortcut}
                        </CommandPalette.ItemCommand>
                      )}
                    </CommandPalette.Item>
                  ))}
                </CommandPalette.ItemGroup>
              ))}
              <CommandPalette.Empty>
                No matching commands or aliases
              </CommandPalette.Empty>
            </CommandPalette.List>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

const commands: Command[] = [
  {
    label: "Open settings",
    value: "settings",
    group: "Workspace",
    description: "Configure your editor and account",
    aliases: ["preferences", "config"],
    shortcut: "⌘,",
  },
  {
    label: "Toggle terminal",
    value: "terminal",
    group: "Workspace",
    description: "Show or hide the integrated terminal",
    aliases: ["shell", "console"],
    shortcut: "⌃`",
  },
  {
    label: "Create pull request",
    value: "create-pr",
    group: "Git",
    description: "Open a pull request from this branch",
    aliases: ["PR", "merge request", "review"],
  },
  {
    label: "Deploy preview",
    value: "deploy-preview",
    group: "Git",
    description: "Publish a shareable preview build",
    aliases: ["ship", "release", "publish"],
  },
]
