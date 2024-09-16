"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithOptionGroup = () => {
  return (
    <SelectRoot collection={frameworks} size="sm" width="320px">
      <SelectLabel>Select framework</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItemGroup key={category.group} label={category.group}>
            {category.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectItemGroup>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "Naruto", value: "naruto", group: "Anime" },
    { label: "One Piece", value: "one-piece", group: "Anime" },
    { label: "Dragon Ball", value: "dragon-ball", group: "Anime" },
    {
      label: "The Shawshank Redemption",
      value: "the-shawshank-redemption",
      group: "Movies",
    },
    { label: "The Godfather", value: "the-godfather", group: "Movies" },
    { label: "The Dark Knight", value: "the-dark-knight", group: "Movies" },
  ],
})

const categories = frameworks.items.reduce(
  (acc, item) => {
    const group = acc.find((group) => group.group === item.group)
    if (group) {
      group.items.push(item)
    } else {
      acc.push({ group: item.group, items: [item] })
    }
    return acc
  },
  [] as { group: string; items: (typeof frameworks)["items"] }[],
)
