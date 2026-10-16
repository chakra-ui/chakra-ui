"use client"

import {
  Avatar,
  Button,
  Command,
  HStack,
  Kbd,
  Stack,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const CommandWithAvatar = () => {
  const command = useCommandCollection({
    initialItems: members,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
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
          <LuSearch /> Search people...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Search by name or role..." />
        </Command.Control>
        <Command.List>
          {command.collection.items.map((item) => (
            <Command.Item item={item} key={item.id}>
              <Avatar.Root size="xs">
                <Avatar.Fallback name={item.name} />
                <Avatar.Image src={item.avatar} />
              </Avatar.Root>
              <Stack gap="0" flex="1" minW="0">
                <Command.ItemText highlight>{item.name}</Command.ItemText>
                <Text textStyle="xs" color="fg.muted" truncate>
                  {item.email}
                </Text>
              </Stack>
              <Text textStyle="xs" color="fg.muted" flexShrink="0">
                {item.role}
              </Text>
            </Command.Item>
          ))}
          <Command.Empty>No people found</Command.Empty>
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

interface Member extends Command.Item {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

const members: Member[] = [
  {
    id: "1",
    name: "Segun Adebayo",
    email: "segun@chakra-ui.com",
    role: "Design engineer",
    avatar: "https://i.pravatar.cc/150?u=sa",
    keywords: ["design engineer"],
  },
  {
    id: "2",
    name: "Esther Adebayo",
    email: "esther@chakra-ui.com",
    role: "Product designer",
    avatar: "https://i.pravatar.cc/150?u=ea",
    keywords: ["product designer"],
  },
  {
    id: "3",
    name: "Christian Schröter",
    email: "christian@chakra-ui.com",
    role: "Frontend engineer",
    avatar: "https://i.pravatar.cc/150?u=cs",
    keywords: ["frontend engineer"],
  },
  {
    id: "4",
    name: "Ivica Batinić",
    email: "ivica@chakra-ui.com",
    role: "Fullstack engineer",
    avatar: "https://i.pravatar.cc/150?u=ib",
    keywords: ["fullstack engineer"],
  },
  {
    id: "5",
    name: "Abraham Anuoluwapo",
    email: "abraham@chakra-ui.com",
    role: "Developer advocate",
    avatar: "https://i.pravatar.cc/150?u=aa",
    keywords: ["developer advocate", "devrel"],
  },
]
