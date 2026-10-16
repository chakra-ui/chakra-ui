"use client"

import {
  Button,
  Command,
  HStack,
  Icon,
  Kbd,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuArrowUpRight,
  LuBlocks,
  LuBookOpen,
  LuGithub,
  LuLayoutTemplate,
  LuPalette,
  LuSearch,
  LuSparkles,
} from "react-icons/lu"

export const CommandWithLinks = () => {
  const command = useCommandCollection({
    initialItems: links,
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
          <LuSearch /> Search documentation...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Search documentation..." />
        </Command.Control>
        <Command.List>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group}>
              <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item item={item} key={item.value} asChild>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.icon}
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    <Icon color="fg.subtle" ms="auto">
                      <LuArrowUpRight />
                    </Icon>
                  </a>
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
          <Command.Empty>No results found</Command.Empty>
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
            Open
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

interface LinkItem extends Command.Item {
  label: string
  value: string
  group: string
  href: string
  icon: React.ReactNode
}

const links: LinkItem[] = [
  {
    label: "Getting started",
    value: "getting-started",
    group: "Documentation",
    href: "https://chakra-ui.com/docs/get-started/installation",
    icon: <LuBookOpen />,
    keywords: ["install", "setup"],
  },
  {
    label: "Components",
    value: "components",
    group: "Documentation",
    href: "https://chakra-ui.com/docs/components/concepts/overview",
    icon: <LuBlocks />,
  },
  {
    label: "Theming",
    value: "theming",
    group: "Documentation",
    href: "https://chakra-ui.com/docs/theming/overview",
    icon: <LuPalette />,
    keywords: ["tokens", "colors"],
  },
  {
    label: "Showcase",
    value: "showcase",
    group: "Resources",
    href: "https://chakra-ui.com/showcase",
    icon: <LuSparkles />,
  },
  {
    label: "Templates",
    value: "templates",
    group: "Resources",
    href: "https://pro.chakra-ui.com",
    icon: <LuLayoutTemplate />,
    keywords: ["pro", "blocks"],
  },
  {
    label: "GitHub repository",
    value: "github",
    group: "Resources",
    href: "https://github.com/chakra-ui/chakra-ui",
    icon: <LuGithub />,
    keywords: ["source", "code"],
  },
]
