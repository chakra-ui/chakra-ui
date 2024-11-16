"use client"

import { data } from "@/lib/search"
import { Combobox, createListCollection } from "@ark-ui/react"
import { useEnvironmentContext } from "@ark-ui/react/environment"
import {
  Center,
  DialogTrigger,
  Input,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import { DialogContent, DialogRoot } from "compositions/ui/dialog"
import { matchSorter } from "match-sorter"
import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"

const ComboboxRoot = chakra(Combobox.Root, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1",
  },
})
const ComboboxControl = chakra(Combobox.Control)
const ComboboxInput = chakra(Combobox.Input, {}, { forwardAsChild: true })
const ComboboxContent = chakra(Combobox.Content, {
  base: {
    borderRadius: "md",
  },
})
const ComboboxList = chakra(Combobox.List)
const ComboboxItemGroup = chakra(Combobox.ItemGroup)
const ComboboxItem = chakra(Combobox.Item, {
  base: {
    borderRadius: "md",
    _hover: {
      bg: "gray.subtle",
      cursor: "pointer",
    },
    _selected: {
      bg: "gray.subtle",
    },
  },
})

interface Item {
  label: string
  value: string
  category: string
  description: string
}

interface Props {
  trigger: ReactNode
  disableHotkey?: boolean
}

export const CommandMenu = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { matchEntries, filteredItems } = useFilteredItems(data, inputValue)
  const router = useRouter()

  const collection = useMemo(() => {
    return createListCollection({ items: filteredItems })
  }, [filteredItems])

  useHotkey(setOpen, { disable: props.disableHotkey })

  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(event) => setOpen(event.open)}
    >
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent p="2" width={{ base: "100%", sm: "lg" }}>
        <ComboboxRoot
          open
          disableLayer
          inputBehavior="autohighlight"
          placeholder="Search the docs"
          selectionBehavior="clear"
          loopFocus={false}
          collection={collection}
          onValueChange={(e) => {
            setOpen(false)
            router.push(`/${e.value}`)
          }}
          onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
        >
          <ComboboxControl>
            <ComboboxInput asChild>
              <Input />
            </ComboboxInput>
          </ComboboxControl>
          <ComboboxContent
            boxShadow="none"
            px="0"
            py="0"
            overflow="auto"
            maxH="50vh"
            overscrollBehavior="contain"
          >
            <ComboboxList>
              {matchEntries.length === 0 && (
                <Center p="3" minH="40">
                  <Text color="fg.muted" textStyle="sm">
                    No results found for <Text as="strong">{inputValue}</Text>
                  </Text>
                </Center>
              )}
              {matchEntries.map(([key, items]) => (
                <ComboboxItemGroup key={key}>
                  {items.map((item) => (
                    <ComboboxItem
                      key={item.value}
                      item={item}
                      persistFocus
                      height="auto"
                      px="4"
                      py="3"
                    >
                      <Stack gap="0">
                        <Text fontWeight="medium">{item.label}</Text>
                        <Text color="fg.muted">{item.category}</Text>
                      </Stack>
                    </ComboboxItem>
                  ))}
                </ComboboxItemGroup>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogRoot>
  )
}

const useFilteredItems = (data: Record<string, Item[]>, inputValue: string) => {
  const items = useMemo(() => Object.values(data).flat(), [data])

  const filter = useCallback(
    (value: string): Record<string, Item[]> => {
      if (!value)
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value.slice(0, 4)]),
        )

      const results = matchSorter(items, value, {
        keys: ["label", "description"],
      })
      return results.length ? { "Search Results": results.slice(0, 8) } : {}
    },
    [items, data],
  )
  const matches = useMemo(() => filter(inputValue), [inputValue, filter])
  const matchEntries = useMemo(() => Object.entries(matches), [matches])
  const filteredItems = useMemo(() => Object.values(matches).flat(), [matches])

  return { matchEntries, filteredItems }
}

const useHotkey = (
  setOpen: (open: boolean) => void,
  options: { disable?: boolean },
) => {
  const { disable } = options
  const env = useEnvironmentContext()

  useEffect(() => {
    if (disable) return

    const document = env.getDocument()
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? "metaKey" : "ctrlKey"

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === "k" && event[hotkey]) {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeydown, true)

    return () => {
      document.removeEventListener("keydown", handleKeydown, true)
    }
  }, [env, setOpen, disable])
}
