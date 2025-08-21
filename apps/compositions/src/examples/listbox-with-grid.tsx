"use client"

import {
  Input,
  Listbox,
  createGridCollection,
  useFilter,
} from "@chakra-ui/react"
import emojibase from "emojibase-data/en/compact.json"
import { useCallback, useMemo, useState } from "react"

type Emoji = (typeof emojibase)[number]
const emojis = emojibase
  .filter((e) => !e.label.startsWith("regional indicator"))
  .slice(0, 200) as Emoji[]

export const ListboxWithGrid = () => {
  let { contains } = useFilter({ sensitivity: "base" })

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
    <Listbox.Root collection={collection} maxW="380px">
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
