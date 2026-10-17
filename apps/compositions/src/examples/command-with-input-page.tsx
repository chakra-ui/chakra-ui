"use client"

import {
  Badge,
  Button,
  Command,
  HStack,
  Kbd,
  Portal,
  Stack,
  Text,
  useCommandPages,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import {
  LuCopy,
  LuMail,
  LuPencil,
  LuSearch,
  LuSend,
  LuTrash2,
} from "react-icons/lu"

interface Action extends Command.Item {
  label: string
  value: string
  icon?: React.ReactNode
  title?: string
  placeholder?: string
  hint?: string
}

export const CommandWithInputPage = () => {
  const [title, setTitle] = useState("Fix login redirect loop on Safari")
  const [invited, setInvited] = useState<string[]>([])
  const [query, setQuery] = useState("")

  const items = useMemo(() => {
    const text = query.trim()
    const result = [...actions]

    if (text) {
      result.push({
        label: `Rename to "${text}"`,
        value: "rename:apply",
        parent: "rename",
        icon: <LuPencil />,
        onSelect: () => setTitle(text),
      })
    }

    if (isEmail(text)) {
      result.push({
        label: `Send invite to ${text}`,
        value: "invite:send",
        parent: "invite",
        icon: <LuSend />,
        onSelect: () => setInvited((prev) => [...prev, text]),
      })
    }

    return result
  }, [query])

  const command = useCommandPages({
    initialItems: items,
    query,
    onQueryChange: setQuery,
  })
  const page = command.page

  return (
    <Stack gap="4" align="flex-start">
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
              <LuSearch /> Search actions...
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
                    onKeyDown={command.onInputKeyDown}
                  />
                </Command.Control>
                <Command.List>
                  {command.collection.items.map((item) => (
                    <Command.Item item={item} key={item.value}>
                      {item.icon}
                      <Command.ItemText highlight={!page}>
                        {item.label}
                      </Command.ItemText>
                    </Command.Item>
                  ))}
                  <Command.Empty>
                    {page?.hint ?? "No results found"}
                  </Command.Empty>
                </Command.List>
                <Command.Footer>
                  <HStack gap="1.5">
                    <Kbd size="sm" variant="subtle">
                      ↵
                    </Kbd>
                    {page ? "Confirm" : "Select"}
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

      <Stack gap="1" textStyle="sm">
        <Text fontWeight="medium">{title}</Text>
        <Text color="fg.muted">
          {invited.length ? `Invited ${invited.join(", ")}` : "No invites yet"}
        </Text>
      </Stack>
    </Stack>
  )
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const actions: Action[] = [
  {
    label: "Rename issue...",
    value: "rename",
    page: true,
    title: "Rename",
    placeholder: "Type a new title...",
    hint: "Type a new title, then press Enter",
    icon: <LuPencil />,
  },
  {
    label: "Invite by email...",
    value: "invite",
    page: true,
    title: "Invite",
    placeholder: "name@company.com",
    hint: "Type an email address to send an invite",
    icon: <LuMail />,
  },
  { label: "Copy issue link", value: "copy", icon: <LuCopy /> },
  { label: "Delete issue", value: "delete", icon: <LuTrash2 /> },
]
