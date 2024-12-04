"use client"

import { Guides, guides } from "@/.velite"
import { Combobox, Portal, createListCollection } from "@ark-ui/react"
import { Box, For, Icon, Input, Text, chakra } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"
import { InputGroup } from "compositions/ui/input-group"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { LuSearch } from "react-icons/lu"

const ComboboxRoot = chakra(
  Combobox.Root,
  {
    base: { width: "full" },
  },
  { forwardAsChild: true },
)

const ComboboxContent = chakra(
  Combobox.Content,
  {
    base: {
      padding: "2",
      overflowY: "auto",
      maxHeight: "20rem",
      boxShadow: "lg",
      bg: "bg.panel",
      borderRadius: "l2",
      zIndex: "popover",
    },
  },
  { forwardAsChild: true },
)

const ComboboxItem = chakra(
  Combobox.Item,
  {
    base: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "l1",
      gap: "1",
      px: "4",
      py: "2",
      _highlighted: { bg: "bg.muted" },
    },
  },
  { forwardAsChild: true },
)

const createCollection = (items: Guides[]) =>
  createListCollection({
    items,
    itemToString: (item) => item.title,
    itemToValue: (item) => item.slug,
  })

export const GuideSearchInput = () => {
  const params = useSearchParams()
  const query = params.get("query")

  const collection = useMemo(() => {
    if (!query) return createCollection([])
    const items = guides
      .filter((guide) => {
        const title = `${guide.title} ${guide.description}`
        return title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      })
      .slice(0, 20)

    return createCollection(items)
  }, [query])

  return (
    <ComboboxRoot
      collection={collection}
      inputBehavior="autohighlight"
      openOnClick={!!query}
      openOnChange={(e) => e.inputValue.length > 3}
      selectionBehavior="clear"
      onInputValueChange={(e) => {
        const url = new URL(window.location.href)
        if (e.inputValue) {
          url.searchParams.set("query", e.inputValue)
        } else {
          url.searchParams.delete("query")
        }
        window.history.pushState({}, "", url)
      }}
    >
      <Combobox.Control asChild>
        <InputGroup
          width="full"
          startElement={
            <Icon size="lg">
              <LuSearch />
            </Icon>
          }
          endElement={
            <Combobox.ClearTrigger hidden={!query} asChild>
              <CloseButton me="-2" variant="plain" colorPalette="gray" />
            </Combobox.ClearTrigger>
          }
        >
          <Combobox.Input defaultValue={query ?? ""} asChild>
            <Input bg="bg" ps="12" placeholder="Search guides..." size="xl" />
          </Combobox.Input>
        </InputGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <ComboboxContent>
            <For each={collection.items} fallback={<Text>No results</Text>}>
              {(item) => (
                <ComboboxItem asChild key={item.slug} item={item}>
                  <Link href={`/${item.slug}`}>
                    <Box>{item.title}</Box>
                    <Text color="fg.muted" textStyle="sm">
                      {item.description}
                    </Text>
                  </Link>
                </ComboboxItem>
              )}
            </For>
          </ComboboxContent>
        </Combobox.Positioner>
      </Portal>
    </ComboboxRoot>
  )
}
