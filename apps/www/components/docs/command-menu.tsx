"use client"

import { data } from "@/lib/search"
import { useEnvironmentContext } from "@ark-ui/react/environment"
import { Center, DialogTrigger, Input, Stack, Text } from "@chakra-ui/react"
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
} from "compositions/ui/dialog"
import { matchSorter } from "match-sorter"
import { useParams, useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"

interface Item {
  label: string
  value: string
  category: string
  description: string
}

interface Props {
  trigger: ReactNode
}

export const CommandMenu = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { matchEntries, filteredItems } = useFilteredItems(data, inputValue)
  const router = useRouter()
  const params = useParams<{ framework: string }>()

  useHotkey(setOpen)

  console.log("data", data)

  return (
    <DialogRoot open={open} onOpenChange={(event) => setOpen(event.open)}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>

      <DialogBackdrop />
      <DialogContent p="2" width={{ base: "100%", sm: "md" }}>
        dialog
        {/* <Combobox.Root
          open
          disableLayer
          inputBehavior="autohighlight"
          placeholder="Search the docs"
          selectionBehavior="clear"
          loopFocus={false}
          items={filteredItems}
          onValueChange={(e) => {
            setOpen(false)
            router.push(`/${params.framework}/${e.value}`)
          }}
          onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
        >
          <Combobox.Control>
            <Combobox.Input asChild>
              <Input />
            </Combobox.Input>
          </Combobox.Control>
          <Combobox.Content
            boxShadow="none"
            px="0"
            py="0"
            overflow="auto"
            maxH="68vh"
            overscrollBehavior="contain"
          >
            <Combobox.List>
              {matchEntries.length === 0 && (
                <Center p="3" minH="40">
                  <Text color="fg.muted" textStyle="sm">
                    No results found for <Text as="strong">{inputValue}</Text>
                  </Text>
                </Center>
              )}
              {matchEntries.map(([key, items]) => (
                <Combobox.ItemGroup key={key}>
                  <Combobox.ItemGroupLabel
                    textTransform="capitalize"
                    color="fg.muted"
                    fontWeight="medium"
                  >
                    {key}
                  </Combobox.ItemGroupLabel>
                  {items.map((item) => (
                    <Combobox.Item
                      key={item.value}
                      item={item}
                      persistFocus
                      height="auto"
                      px="4"
                      py="3"
                    >
                      <Stack gap="0">
                        <Text fontWeight="medium">{item.label}</Text>
                        <Text
                          textStyle="sm"
                          fontWeight="medium"
                          color="accent.default"
                        >
                          {item.category}
                        </Text>
                        <Text
                          textStyle="sm"
                          color="fg.muted"
                          mt="0.5"
                          lineClamp={2}
                        >
                          {item.description}
                        </Text>
                      </Stack>
                    </Combobox.Item>
                  ))}
                </Combobox.ItemGroup>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root> */}
      </DialogContent>
    </DialogRoot>
  )
}

const useFilteredItems = (data: Record<string, Item[]>, inputValue: string) => {
  const items = useMemo(() => Object.values(data).flat(), [data])

  const filter = useCallback(
    (value: string): Record<string, Item[]> => {
      if (!value) return data

      const results = matchSorter(items, value, {
        keys: ["label", "description"],
      })
      return results.length ? { "Search Results:": results } : {}
    },
    [items, data],
  )
  const matches = useMemo(() => filter(inputValue), [inputValue, filter])
  const matchEntries = useMemo(() => Object.entries(matches), [matches])
  const filteredItems = useMemo(() => Object.values(matches).flat(), [matches])

  return { matchEntries, filteredItems }
}

const useHotkey = (setOpen: (open: boolean) => void) => {
  const env = useEnvironmentContext()

  useEffect(() => {
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
  }, [env, setOpen])
}
