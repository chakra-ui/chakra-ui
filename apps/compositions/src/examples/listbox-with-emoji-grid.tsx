"use client"

import {
  Input,
  Listbox,
  Square,
  createGridCollection,
  useFilter,
  useListboxContext,
} from "@chakra-ui/react"
import emojibase from "emojibase-data/en/compact.json"
import { useCallback, useMemo, useState } from "react"
import { LuSmile } from "react-icons/lu"

type Emoji = (typeof emojibase)[number]
const emojis = emojibase
  .filter((e) => !e.label.startsWith("regional indicator"))
  .slice(0, 200) as Emoji[]

export const ListboxWithEmojiGrid = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const [items, setItems] = useState(emojis)

  const collection = useMemo(
    () =>
      createGridCollection({
        columnCount: 8,
        items: items,
        itemToString(item) {
          return `${item.label} (${item.shortcodes})`
        },
        itemToValue(item) {
          return item.hexcode
        },
      }),
    [items],
  )

  const filter = useCallback(
    (value: string) => {
      setItems(emojis.filter((e) => contains(e.label, value)))
    },
    [contains],
  )

  return (
    <Listbox.Root collection={collection} maxW="min-content">
      <SelectedEmoji />
      <Listbox.Input
        as={Input}
        placeholder="Type to filter frameworks..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.Content
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gap="1"
      >
        {collection.items.map((item, index) => (
          <Listbox.Item
            item={item}
            key={index}
            css={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "md",
              fontSize: "22px",
            }}
          >
            {item.unicode}
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const SelectedEmoji = () => {
  const listbox = useListboxContext()
  const [item] = listbox.selectedItems as Emoji[]
  return (
    <Square size="40px" bg="bg.muted" rounded="sm" textStyle="lg">
      {item ? item.unicode : <LuSmile />}
    </Square>
  )
}
