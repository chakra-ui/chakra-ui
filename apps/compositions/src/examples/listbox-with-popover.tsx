"use client"

import {
  Button,
  Listbox,
  Popover,
  Portal,
  useFilter,
  useListCollection,
  useListbox,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { LuChevronDown } from "react-icons/lu"

export const ListboxWithPopover = () => {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs" },
      { label: "Nuxt.js", value: "nuxtjs" },
    ],
    filter: contains,
  })

  const listbox = useListbox({
    collection,
    onValueChange() {
      setOpen(false)
      setInputValueFn("")
      triggerRef.current?.focus()
    },
  })

  const setInputValueFn = (value: string) => {
    setInputValue(value)
    filter(value)
  }

  const selectedItem = listbox.selectedItems[0]

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="sm" ref={triggerRef} variant="outline">
          {selectedItem ? selectedItem.label : "Select"} <LuChevronDown />
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content _closed={{ animation: "none" }}>
            <Popover.Body p="0">
              <Listbox.RootProvider value={listbox} gap="0" overflow="hidden">
                <Listbox.Input
                  minH="10"
                  px="3"
                  roundedTop="l2"
                  bg="transparent"
                  outline="0"
                  value={inputValue}
                  onChange={(e) => setInputValueFn(e.currentTarget.value)}
                />
                <Listbox.Content
                  borderWidth="0"
                  borderTopWidth="1px"
                  roundedTop="0"
                  gap="0"
                >
                  {collection.items.map((framework) => (
                    <Listbox.Item item={framework} key={framework.value}>
                      <Listbox.ItemText>{framework.label}</Listbox.ItemText>
                      <Listbox.ItemIndicator />
                    </Listbox.Item>
                  ))}
                </Listbox.Content>
              </Listbox.RootProvider>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
