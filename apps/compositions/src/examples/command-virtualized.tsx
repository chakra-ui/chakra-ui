"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  Span,
  useCommandCollection,
} from "@chakra-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState } from "react"
import {
  LuCopy,
  LuFileText,
  LuPencil,
  LuSearch,
  LuShare2,
  LuTrash2,
  LuX,
} from "react-icons/lu"

export const CommandVirtualized = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const command = useCommandCollection({ initialItems: commands })
  const { collection } = command

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 36,
    overscan: 10,
  })

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      onExitComplete={() => command.search("")}
    >
      <Command.DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          minW="64"
          justifyContent="flex-start"
          color="fg.muted"
        >
          <LuSearch /> Search documents...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={collection}
        scrollToIndexFn={(details) => {
          virtualizer.scrollToIndex(details.index, { align: "auto" })
        }}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input
            placeholder={`Search ${commands.length.toLocaleString()} commands...`}
          />
        </Command.Control>
        <Command.List ref={scrollRef}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const item = collection.items[virtualItem.index]
              return (
                <Command.Item
                  key={item.value}
                  item={item}
                  aria-posinset={virtualItem.index + 1}
                  aria-setsize={collection.size}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {item.icon}
                  <Command.ItemText highlight>{item.label}</Command.ItemText>
                  <Span textStyle="xs" color="fg.subtle">
                    {item.folder}
                  </Span>
                </Command.Item>
              )
            })}
          </div>
          <Command.Empty>No commands found</Command.Empty>
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
          <Span ms="auto">{collection.size.toLocaleString()} results</Span>
        </Command.Footer>
      </Command.Root>
    </Command.Dialog>
  )
}

interface DocumentCommand extends Command.Item {
  label: string
  value: string
  folder: string
  icon: React.ReactNode
}

const actions = [
  { label: "Open", icon: <LuFileText /> },
  { label: "Rename", icon: <LuPencil /> },
  { label: "Duplicate", icon: <LuCopy /> },
  { label: "Share", icon: <LuShare2 /> },
  { label: "Close", icon: <LuX /> },
  { label: "Delete", icon: <LuTrash2 /> },
]

const folders = ["Design", "Engineering", "Marketing", "Finance", "Legal"]

const commands: DocumentCommand[] = Array.from({ length: 5000 }, (_, index) => {
  const action = actions[index % actions.length]
  const docIndex = Math.floor(index / actions.length)
  const file = `document-${String(docIndex + 1).padStart(3, "0")}`
  return {
    label: `${action.label} ${file}`,
    value: `${action.label.toLowerCase()}-${file}`,
    folder: folders[docIndex % folders.length],
    icon: action.icon,
  }
})
