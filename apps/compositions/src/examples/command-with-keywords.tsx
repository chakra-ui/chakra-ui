"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  Stack,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuGitPullRequest,
  LuRocket,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

interface CommandItem extends Command.Item {
  label: string
  value: string
  group: string
  description: string
  keywords: string[]
  icon: React.ReactNode
  shortcut?: string[]
}

export const CommandWithKeywords = () => {
  const command = useCommandCollection({
    initialItems: commands,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Dialog onExitComplete={() => command.search("")}>
      <Command.DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          minW="64"
          justifyContent="flex-start"
          color="fg.muted"
        >
          <LuSearch /> Search workspace...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Label>Workspace commands</Command.Label>
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Try ‘preferences’, ‘deploy’, or ‘PR’..." />
        </Command.Control>
        <Command.List>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group}>
              <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item item={item} key={item.value}>
                  {item.icon}
                  <Stack gap="0" flex="1" minW="0">
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    <Text color="fg.muted" textStyle="xs" truncate>
                      {item.description}
                    </Text>
                  </Stack>
                  {item.shortcut?.map((key) => (
                    <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                  ))}
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
          <Command.Empty>No matching commands or aliases</Command.Empty>
        </Command.List>
        <Command.Footer>
          <HStack gap="1.5">
            <Kbd size="sm" variant="subtle">
              ↑
            </Kbd>
            <Kbd size="sm" variant="subtle">
              ↓
            </Kbd>
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
    </Command.Dialog>
  )
}

const commands: CommandItem[] = [
  {
    label: "Open settings",
    value: "settings",
    group: "Workspace",
    description: "Configure your editor and account",
    keywords: ["preferences", "config"],
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
  {
    label: "Toggle terminal",
    value: "terminal",
    group: "Workspace",
    description: "Show or hide the integrated terminal",
    keywords: ["shell", "console"],
    icon: <LuTerminal />,
    shortcut: ["⌃", "`"],
  },
  {
    label: "Create pull request",
    value: "create-pr",
    group: "Git",
    description: "Open a pull request from this branch",
    keywords: ["PR", "merge request", "review"],
    icon: <LuGitPullRequest />,
  },
  {
    label: "Deploy preview",
    value: "deploy-preview",
    group: "Git",
    description: "Publish a shareable preview build",
    keywords: ["ship", "release", "publish"],
    icon: <LuRocket />,
  },
]
